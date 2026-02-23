const generateRequestId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `req_${Math.random().toString(36).slice(2)}`;
};

export type BuildUpstreamHeadersOptions = {
  forwardAuthorization?: boolean;
  clientApp?: string;
  xForwardedFor?: string;
  forwardUserAgent?: boolean;
};

const copyIfPresent = (
  target: Headers,
  source: Headers,
  headerName: string
): void => {
  const value = source.get(headerName);
  if (value) {
    target.set(headerName, value);
  }
};

export const buildUpstreamHeaders = (
  req: Request,
  opts: BuildUpstreamHeadersOptions
): Headers => {
  const headers = new Headers();
  const source = req.headers;

  copyIfPresent(headers, source, "accept");
  copyIfPresent(headers, source, "content-type");
  if (opts.forwardUserAgent !== false) {
    copyIfPresent(headers, source, "user-agent");
  }

  if (opts.forwardAuthorization) {
    copyIfPresent(headers, source, "authorization");
  }

  const requestId = source.get("x-request-id") ?? generateRequestId();
  headers.set("x-request-id", requestId);

  if (opts.clientApp) {
    headers.set("x-client-app", opts.clientApp);
  }

  const xForwardedFor =
    opts.xForwardedFor ?? source.get("x-forwarded-for") ?? null;
  if (xForwardedFor) {
    headers.set("x-forwarded-for", xForwardedFor);
  }

  return headers;
};
