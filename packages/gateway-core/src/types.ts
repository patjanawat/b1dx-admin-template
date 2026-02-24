export type UpstreamKey = string;

export type UpstreamConfig = {
  baseUrl: string;
  allowedPathPrefixes: string[];
  forwardCookies?: boolean;
  forwardAuthHeader?: boolean;
  timeoutMs?: number;
};

export type GatewayConfig = {
  upstreams: Record<UpstreamKey, UpstreamConfig>;
  runtime?: "nodejs" | "edge";
  maxBodyBytes?: number;
  allowedMethods?: string[];
};

export class UnknownUpstreamError extends Error {
  public readonly upstreamKey: UpstreamKey;

  constructor(upstreamKey: UpstreamKey) {
    super(`Unknown upstream key: ${upstreamKey}`);
    this.name = "UnknownUpstreamError";
    this.upstreamKey = upstreamKey;
  }
}

export const getUpstream = (
  config: GatewayConfig,
  upstreamKey: UpstreamKey
): UpstreamConfig => {
  const upstream = config.upstreams[upstreamKey];
  if (!upstream) {
    throw new UnknownUpstreamError(upstreamKey);
  }
  return upstream;
};
