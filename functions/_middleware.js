const COOKIE_NAME = "variant";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const BYPASS_PREFIXES = ["/alpha/", "/stage/"];

export async function onRequest({ request, next, env }) {
    const url = new URL(request.url);
    const variantBOrigin = env.VARIANT_B_ORIGIN;

    // Switch is off: no VARIANT_B_ORIGIN configured, act as if this file doesnt exist
    if (!variantBOrigin) return next();

    if (BYPASS_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
        return next();
    }

    const variantBHost = new URL(variantBOrigin).hostname;
    const override = url.searchParams.get(COOKIE_NAME)?.toUpperCase();
    const forced = override === "A" || override === "B";
    const cookie = request.headers
        .get("Cookie")
        ?.match(/(?:^|;\s*)variant=([^;]+)/)?.[1];

    let variant = forced ? override : cookie;
    const assign = variant !== "A" && variant !== "B";
    if (assign) variant = Math.random() < 0.5 ? "A" : "B";

    const serveB = variant === "B" && url.hostname !== variantBHost;
    const response = serveB
        ? await fetch(
              new Request(
                  new URL(url.pathname + url.search, variantBOrigin),
                  request,
              ),
          )
        : await next();

    if (!assign && !forced) return response;

    const withCookie = new Response(response.body, response);
    withCookie.headers.append(
        "Set-Cookie",
        `${COOKIE_NAME}=${variant}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax; Secure`,
    );
    return withCookie;
}
