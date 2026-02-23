import { GatewayError } from "../errors/GatewayError";

const IPV4_REGEX = /^(?:\d{1,3}\.){3}\d{1,3}$/;

const isIpv4 = (host: string): boolean => IPV4_REGEX.test(host);

const isIpv4Private = (host: string): boolean => {
  const parts = host.split(".").map((p) => Number(p));
  if (parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
    return true;
  }
  const [a, b] = parts;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
};

const isIpv6 = (host: string): boolean => host.includes(":");

const isIpv6Private = (host: string): boolean => {
  const normalized = host.toLowerCase();
  if (normalized === "::1") return true;
  if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true;
  if (normalized.startsWith("fe80")) return true;
  return false;
};

export const assertSafeUpstreamBaseUrl = (baseUrl: string): void => {
  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    throw new GatewayError("INVALID_BASE_URL", "Base URL is not a valid URL.", {
      baseUrl,
    });
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new GatewayError(
      "INVALID_BASE_URL",
      "Base URL must use http or https.",
      { baseUrl }
    );
  }

  if (url.username || url.password) {
    throw new GatewayError(
      "INVALID_BASE_URL",
      "Base URL must not include username or password.",
      { baseUrl }
    );
  }

  const host = url.hostname;
  if (host === "localhost") {
    throw new GatewayError(
      "INVALID_BASE_URL",
      "Base URL must not target localhost.",
      { baseUrl }
    );
  }

  if (isIpv4(host)) {
    if (host === "127.0.0.1" || host === "0.0.0.0") {
      throw new GatewayError(
        "INVALID_BASE_URL",
        "Base URL must not target loopback or wildcard addresses.",
        { baseUrl }
      );
    }
    if (isIpv4Private(host)) {
      throw new GatewayError(
        "INVALID_BASE_URL",
        "Base URL must not target private IP ranges.",
        { baseUrl }
      );
    }
  } else if (isIpv6(host)) {
    if (host === "::1") {
      throw new GatewayError(
        "INVALID_BASE_URL",
        "Base URL must not target loopback addresses.",
        { baseUrl }
      );
    }
    if (isIpv6Private(host)) {
      throw new GatewayError(
        "INVALID_BASE_URL",
        "Base URL must not target private IPv6 ranges.",
        { baseUrl }
      );
    }
  }
};
