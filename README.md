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

- `trackSignUpClick(location)` fires a `sign_up_click` event (`{ location }`) when a visitor
  clicks a "Start Free" / "Create an account" CTA. `location` identifies which CTA
  (e.g. `"hero"`, `"nav"`, `"content"`) so conversion can be broken down per button.
- Sign-up itself completes on `alpha.infinidream.ai`, a different app the landing page can't observe, so there's no `sign_up` (completion) event here, only `sign_up_click`.

`location` is registered in GA4 as an **event-scoped custom dimension** (Admin → Custom
definitions) so it can be used as a report dimension/filter.

### Running an A/B test again

An A/B test that was ran comparing this design (`main`) against the
previous one (`old-design` branch) and has since been turned off, `infinidream.ai` now just serves `main` directly, no cookie, no router, no variant tagging. To run another one:

1. **Deploy the challenger as its own branch.** Push it to this repo; Cloudflare Pages
   auto-builds every branch and gives it a stable alias:
   `https://<branch-name>.landing-page-d44.pages.dev`. Confirm that URL loads correctly (and
   isn't gated behind Cloudflare Access, check the Pages project's branch-deployment
   settings) before wiring anything up.
2. **Restore the router.** The A/B logic lived at `functions/_middleware.js` and was removed
   in the commit that turned the experiment off. Recover it with:
    ```bash
    git log --all --oneline -- functions/_middleware.js   # find the last commit that had it
    git show <that-commit>:functions/_middleware.js > functions/_middleware.js
    ```
    Update `VARIANT_B_ORIGIN` at the top of the file to point at the new branch's alias from step 1.
3. **Re-add variant tagging to analytics**, on _both_ branches: a `getVariant()` cookie
   reader in `src/lib/analytics.ts`, `variant` set on `gtag('config', ...)` in
   `Analytics.tsx`, and `variant` included in the `sign_up_click` event payload. (`git show`
   the same pre-removal commit for the exact code)
4. **Register `variant` as an event-scoped custom dimension** in GA4 (Admin → Custom
   definitions), parameter name `variant`, scope Event.
