import { GatewayError } from "../errors/GatewayError";
import { buildUpstreamHeaders, BuildUpstreamHeadersOptions } from "./headers";

export type ForwardToUpstreamConfig = BuildUpstreamHeadersOptions & {
  allowedMethods?: string[];
  maxBodyBytes?: number;
  timeoutMs?: number;
};

const normalizeMethod = (method: string): string => method.toUpperCase();

const enforceAllowedMethods = (
  method: string,
  allowedMethods?: string[]
): void => {
  if (!allowedMethods || allowedMethods.length === 0) return;
  const normalized = normalizeMethod(method);
  const allowed = allowedMethods.map(normalizeMethod);
  if (!allowed.includes(normalized)) {
    throw new GatewayError(
      "METHOD_NOT_ALLOWED",
      `Method ${normalized} is not allowed.`,
      { method: normalized }
    );
  }
};

const enforceMaxBodyBytes = (
  req: Request,
  maxBodyBytes?: number
): void => {
  if (!maxBodyBytes) return;
  const method = normalizeMethod(req.method);
  if (method === "GET" || method === "HEAD") return;
  const contentLength = req.headers.get("content-length");
  if (!contentLength) return;
  const length = Number(contentLength);
  if (!Number.isFinite(length)) return;
  if (length > maxBodyBytes) {
    throw new GatewayError(
      "PAYLOAD_TOO_LARGE",
      "Request body exceeds the maximum allowed size.",
      { maxBodyBytes, contentLength: length }
    );
  }
};

export const forwardToUpstream = async (
  req: Request,
  upstreamUrl: URL,
  cfg: ForwardToUpstreamConfig
): Promise<Response> => {
  enforceAllowedMethods(req.method, cfg.allowedMethods);
  enforceMaxBodyBytes(req, cfg.maxBodyBytes);

  const headers = buildUpstreamHeaders(req, cfg);
  const method = normalizeMethod(req.method);
  const body = method === "GET" || method === "HEAD" ? undefined : req.body;

  const controller = new AbortController();
  const timeoutMs = cfg.timeoutMs ?? 0;
  const timeoutId =
    timeoutMs > 0
      ? setTimeout(() => controller.abort(), timeoutMs)
      : undefined;

  try {
    const init: RequestInit & { duplex?: "half" } = {
      method,
      headers,
      body,
      redirect: "manual",
      signal: controller.signal,
    };
    if (body) {
      init.duplex = "half";
    }
    return await fetch(upstreamUrl, init);
  } catch (err) {
    if (controller.signal.aborted) {
      throw new GatewayError(
        "UPSTREAM_TIMEOUT",
        "Upstream request timed out."
      );
    }
    throw err;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
};
