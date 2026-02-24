import { GatewayError } from "./errors/GatewayError";
import {
  ProblemDetails,
  toProblemDetailsResponse,
  tryParseUpstreamProblemDetails,
} from "./errors/problemDetails";
import { applySetCookieToResponse } from "./http/cookies";
import { forwardToUpstream } from "./http/forward";
import { assertAllowedPath, normalizeAndValidatePath } from "./security/pathGuard";
import { assertSafeUpstreamBaseUrl } from "./security/ssrfGuard";
import { GatewayConfig, UpstreamConfig, UpstreamKey } from "./types";

type HandlerParams = { upstreamKey: string; path: string[] };

const buildPathname = (pathParts: string[]): string => {
  const joined = pathParts.join("/");
  return `/${joined}`;
};

const buildUpstreamUrl = (baseUrl: string, pathname: string, req: Request): URL => {
  const upstreamUrl = new URL(baseUrl);
  upstreamUrl.pathname = pathname;
  upstreamUrl.search = new URL(req.url).search;
  return upstreamUrl;
};

const buildUpstreamErrorProblem = (res: Response): ProblemDetails => {
  const title = res.statusText || "Upstream Error";
  return createProblem(
    res.status,
    title,
    `Upstream request failed with status ${res.status}.`
  );
};

const createProblem = (
  status: number,
  title: string,
  detail: string,
  type = "about:blank"
): ProblemDetails => ({
  type,
  title,
  status,
  detail,
});

const mapErrorToProblem = (err: unknown): ProblemDetails => {
  if (err instanceof GatewayError) {
    switch (err.code) {
      case "METHOD_NOT_ALLOWED":
        return createProblem(405, "Method Not Allowed", err.message);
      case "PAYLOAD_TOO_LARGE":
        return createProblem(413, "Payload Too Large", err.message);
      case "UPSTREAM_TIMEOUT":
        return createProblem(504, "Gateway Timeout", err.message);
      case "PATH_NOT_ALLOWED":
        return createProblem(403, "Forbidden", err.message);
      case "INVALID_PATH":
      case "INVALID_BASE_URL":
        return createProblem(400, "Bad Request", err.message);
      default:
        return createProblem(500, "Internal Server Error", err.message);
    }
  }
  return createProblem(500, "Internal Server Error", "Unexpected gateway error.");
};

const resolveUpstream = (
  config: GatewayConfig,
  upstreamKey: UpstreamKey
): UpstreamConfig | null => config.upstreams[upstreamKey] ?? null;

const buildResponseHeaders = (
  upstreamRes: Response,
  requestId: string,
  forwardCookies: boolean
): Headers => {
  const headers = new Headers(upstreamRes.headers);
  headers.set("x-request-id", requestId);
  if (forwardCookies) {
    applySetCookieToResponse(upstreamRes, headers);
  }
  return headers;
};

export const createGatewayHandler = (config: GatewayConfig) => {
  return async function handle(
    req: Request,
    params: HandlerParams
  ): Promise<Response> {
    const upstream = resolveUpstream(config, params.upstreamKey);
    if (!upstream) {
      return toProblemDetailsResponse({
        problem: createProblem(
          404,
          "Not Found",
          `Unknown upstream key: ${params.upstreamKey}`
        ),
      });
    }

    try {
      assertSafeUpstreamBaseUrl(upstream.baseUrl);
      const rawPath = buildPathname(params.path ?? []);
      const normalizedPath = normalizeAndValidatePath(rawPath);
      assertAllowedPath(normalizedPath, upstream.allowedPathPrefixes);

      const upstreamUrl = buildUpstreamUrl(upstream.baseUrl, normalizedPath, req);
      const requestId =
        req.headers.get("x-request-id") ?? crypto.randomUUID();
      const upstreamRes = await forwardToUpstream(req, upstreamUrl, {
        allowedMethods: config.allowedMethods,
        maxBodyBytes: config.maxBodyBytes,
        timeoutMs: upstream.timeoutMs,
        forwardAuthorization: upstream.forwardAuthHeader,
        forwardCookies: upstream.forwardCookies,
        requestId,
      });
      const responseRequestId =
        requestId ?? upstreamRes.headers.get("x-request-id") ?? "";

      const problem = await tryParseUpstreamProblemDetails(upstreamRes.clone());
      if (problem) {
        return toProblemDetailsResponse({
          problem,
          headers: buildResponseHeaders(
            upstreamRes,
            responseRequestId,
            upstream.forwardCookies ?? false
          ),
        });
      }

      if (!upstreamRes.ok) {
        return toProblemDetailsResponse({
          problem: buildUpstreamErrorProblem(upstreamRes),
          headers: buildResponseHeaders(
            upstreamRes,
            responseRequestId,
            upstream.forwardCookies ?? false
          ),
        });
      }

      const headers = buildResponseHeaders(
        upstreamRes,
        responseRequestId,
        upstream.forwardCookies ?? false
      );
      return new Response(upstreamRes.body, {
        status: upstreamRes.status,
        statusText: upstreamRes.statusText,
        headers,
      });
    } catch (err) {
      const problem = mapErrorToProblem(err);
      return toProblemDetailsResponse({ problem });
    }
  };
};
