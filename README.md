## infinidream — Landing Page

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Production build

```bash
pnpm build
pnpm start
```

### Linting and formatting (Biome)

```bash
pnpm biome:lint     # lint and auto-fix
pnpm biome:format   # format
pnpm biome:check    # run all checks
```

### Analytics (GA4)

`infinidream.ai` loads GA4 on every page via
[`src/components/Analytics/Analytics.tsx`](src/components/Analytics/Analytics.tsx) /
[`src/lib/analytics.ts`](src/lib/analytics.ts)

- `getVariant()` reads the `variant` cookie (see A/B test below) and is always sent as an
  event parameter, including on the automatic `page_view`. With the A/B test off this is just
  `"unknown"` for everyone.
- `trackSignUpClick(location)` fires a `sign_up_click` event (`{ variant, location }`) when a
  visitor clicks a "Start Free" / "Create an account" CTA. `location` identifies which CTA
  (e.g. `"hero"`, `"nav"`, `"content"`) so conversion can be broken down per button.
- Sign-up itself completes on `alpha.infinidream.ai`, a different app the landing page can't
  observe, so there's no `sign_up` (completion) event here, only `sign_up_click`.

`variant` and `location` are already registered in GA4 as **event-scoped custom
dimensions** (Admin → Custom definitions), this is a one-time setup and is done. Nothing in
GA needs to change to start or stop an A/B test.

### A/B testing

`infinidream.ai` can run a 50/50 A/B test between `main` (production) and any other deployed
branch, controlled entirely by **one Cloudflare Pages environment variable**,
`VARIANT_B_ORIGIN`.

- **Set** (Cloudflare dashboard → Workers & Pages → `landing-page` → Settings → Environment
  variables → Production → add `VARIANT_B_ORIGIN` = the challenger branch alias, e.g.
  `https://old-design.landing-page-d44.pages.dev`) → **the test is live.**
- **Delete that variable** (or clear its value) → the test is off, `main` is served directly
  to everyone, no cookie gets set. This is the current/default state.

[`functions/_middleware.js`](functions/_middleware.js) is the Cloudflare Pages Function that
implements this, and it is always present in the repo (on or off is just whether the env var
is set):

1. If `VARIANT_B_ORIGIN` isnt set, the Function immediately gets out of the way
   (`return next()`), production behaves exactly as if this file didnt exist.
2. Otherwise, it reads the `variant` cookie from the request.
3. **No cookie (first visit):** rolls 50/50 → assigns `A` or `B`, then sets
   `Set-Cookie: variant=A|B` (`Path=/`, 1-year `Max-Age`, `SameSite=Lax`, `Secure`, **not**
   `HttpOnly`, the client needs to read it).
4. **`variant=A`** → served normally by this deployment.
5. **`variant=B`** → transparently `fetch()`es the same path from `VARIANT_B_ORIGIN` and
   returns that response. The browser URL stays `infinidream.ai` throughout.
6. **QA override:** visiting with `?variant=A` or `?variant=B` forces that variant and
   (re)pins the cookie, for manually testing each side.
