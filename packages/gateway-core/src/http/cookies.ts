// Caveat: Edge runtimes often merge multiple Set-Cookie headers into one string.
// In Node (undici), Headers.getSetCookie() preserves multiple cookies.
// When getSetCookie is unavailable, we can only forward the combined string.
export const extractClientCookieHeader = (req: Request): string | null =>
  req.headers.get("cookie");

export const applySetCookieToResponse = (
  upstreamRes: Response,
  resHeaders: Headers
): void => {
  const headers = upstreamRes.headers;
  const getSetCookie = (
    headers as unknown as { getSetCookie?: () => string[] }
  ).getSetCookie;

  if (typeof getSetCookie === "function") {
    for (const cookie of getSetCookie.call(headers)) {
      resHeaders.append("set-cookie", cookie);
    }
    return;
  }

  const single = headers.get("set-cookie");
  if (single) {
    resHeaders.append("set-cookie", single);
  }
};
