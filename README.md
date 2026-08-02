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

### A/B test (GA4 + Cloudflare Pages)

`infinidream.ai` currently runs a 50/50 A/B test between two designs, both served from the
same domain via a Cloudflare Pages Function.

- **Variant A** = this repo's `main` branch (new design). This is the production deployment
  that owns `infinidream.ai`.
- **Variant B** = the `old-design` branch (previous design), deployed separately and served
  from its stable Cloudflare Pages branch alias:
  `https://old-design.landing-page-d44.pages.dev`

#### How routing works

[`functions/_middleware.js`](functions/_middleware.js) is a Cloudflare Pages Function that
runs on every request to production, before anything else:

1. Reads the `variant` cookie from the request.
2. **No cookie (first visit):** rolls 50/50 -> assigns `A` or `B`, then sets
   `Set-Cookie: variant=A|B` (`Path=/`, 1-year `Max-Age`, `SameSite=Lax`, `Secure`, **not**
   `HttpOnly` the client needs to read it).
3. **`variant=A`** -> request is served normally by this deployment (`await next()`).
4. **`variant=B`** -> the Function transparently `fetch()`es the same path from the
   `old-design` branch alias and returns that response. The browser URL stays
   `infinidream.ai` throughout, the proxy is invisible to the visitor.
5. **QA override:** visiting with `?variant=A` or `?variant=B` forces that variant and
   (re)pins the cookie, for manually testing each side.

#### Analytics (GA4)

Both branches (`main` and `old-design`) ship the same tracking, defined in
[`src/lib/analytics.ts`](src/lib/analytics.ts) and loaded via
[`src/components/Analytics/Analytics.tsx`](src/components/Analytics/Analytics.tsx):

- `getVariant()` reads the `variant` cookie client-side (SSR-safe; returns `"unknown"` if
  there's no `document`, e.g. if the router/cookie isn't present).
- The gtag init script sets `variant` on `gtag('config', ...)`, so **every** event, including
  the automatic first `page_view` carries the variant.
- `trackSignUpClick(location)` fires a `sign_up_click` event (`{ variant, location }`) when a
  visitor clicks a "Start Free" / "Create an account" CTA. `location` identifies which CTA
  (e.g. `"hero"`, `"nav"`, `"content"`) so conversion can be broken down per button.
- Sign-up itself completes on `alpha.infinidream.ai`, a different app the landing page can't
  observe, so there's no `sign_up` (completion) event here, only `sign_up_click`.

In GA4, both `variant` and `location` are registered as **event-scoped custom dimensions**
so they can be used as report dimensions. Results are read via
an Explore report: rows = `variant`, columns = `Event name`, values = event count
and/or total users, filtered to `variant` matching `^(A|B)$` to exclude pre-rollout/unassigned
hits. Conversion rate = `sign_up_click ÷ page_view` per variant. Explore data lags Realtime by
roughly an hour.
