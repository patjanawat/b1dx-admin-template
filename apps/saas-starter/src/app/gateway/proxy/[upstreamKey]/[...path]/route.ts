import { createGatewayHandler } from "@b1dx/gateway-core";

export const runtime = "nodejs";

const CORE_API_BASE_URL = process.env.CORE_API_BASE_URL ?? "";
const CRM_BASE_URL = process.env.CRM_BASE_URL ?? "";
const ALLOW_PRIVATE_HOSTS = process.env.GATEWAY_ALLOW_PRIVATE_HOSTS === "1";

const gateway = createGatewayHandler({
  allowedMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  maxBodyBytes: 5_000_000,
  allowPrivateHosts: ALLOW_PRIVATE_HOSTS,
  upstreams: {
    core: {
      baseUrl: CORE_API_BASE_URL,
      allowedPathPrefixes: ["/api/auth", "/auth", "/users", "/roles", "/audit-logs"],
      forwardCookies: true,
    },
    ...(CRM_BASE_URL
      ? {
          crm: {
            baseUrl: CRM_BASE_URL,
            allowedPathPrefixes: ["/"],
            forwardCookies: true,
          },
        }
      : {}),
  },
});

type RouteParams = {
  upstreamKey: string;
  path: string[];
};

async function getParams(ctx: any): Promise<RouteParams> {
  const p = await Promise.resolve(ctx?.params);
  return p as RouteParams;
}

async function handle(req: Request, ctx: any) {
  const { upstreamKey, path } = await getParams(ctx);
  return gateway(req, { upstreamKey, path });
}

export async function GET(req: Request, ctx: any) {
  return handle(req, ctx);
}

export async function POST(req: Request, ctx: any) {
  return handle(req, ctx);
}

export async function PUT(req: Request, ctx: any) {
  return handle(req, ctx);
}

export async function PATCH(req: Request, ctx: any) {
  return handle(req, ctx);
}

export async function DELETE(req: Request, ctx: any) {
  return handle(req, ctx);
}
