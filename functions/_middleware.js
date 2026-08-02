const VARIANT_B_ORIGIN = "https://old-design.landing-page-d44.pages.dev";
const VARIANT_B_HOST = new URL(VARIANT_B_ORIGIN).hostname;
const COOKIE_NAME = "variant";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const BYPASS_PREFIXES = ["/alpha/", "/stage/"];

export async function onRequest({ request, next }) {
    const url = new URL(request.url);

    if (BYPASS_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
        return next();
    }

    const override = url.searchParams.get(COOKIE_NAME)?.toUpperCase();
    const forced = override === "A" || override === "B";
    const cookie = request.headers
        .get("Cookie")
        ?.match(/(?:^|;\s*)variant=([^;]+)/)?.[1];

    let variant = forced ? override : cookie;
    const assign = variant !== "A" && variant !== "B";
    if (assign) variant = Math.random() < 0.5 ? "A" : "B";

    const serveB = variant === "B" && url.hostname !== VARIANT_B_HOST;
    const response = serveB
        ? await fetch(
              new Request(
                  new URL(url.pathname + url.search, VARIANT_B_ORIGIN),
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
