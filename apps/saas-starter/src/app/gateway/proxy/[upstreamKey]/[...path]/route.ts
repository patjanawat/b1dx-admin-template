import { createGatewayHandler } from "@b1dx/gateway-core";

export const runtime = "nodejs";

const CORE_API_BASE_URL = process.env.CORE_API_BASE_URL ?? "";
const CRM_BASE_URL = process.env.CRM_BASE_URL ?? "";

const handler = createGatewayHandler({
  allowedMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  maxBodyBytes: 5_000_000,
  upstreams: {
    core: {
      baseUrl: CORE_API_BASE_URL,
      allowedPathPrefixes: ["/auth", "/users", "/roles", "/audit-logs"],
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

type RouteContext = {
  params: RouteParams;
};

export async function GET(req: Request, context: RouteContext) {
  return handler(req, context.params);
}

export async function POST(req: Request, context: RouteContext) {
  return handler(req, context.params);
}

export async function PUT(req: Request, context: RouteContext) {
  return handler(req, context.params);
}

export async function PATCH(req: Request, context: RouteContext) {
  return handler(req, context.params);
}

export async function DELETE(req: Request, context: RouteContext) {
  return handler(req, context.params);
}
