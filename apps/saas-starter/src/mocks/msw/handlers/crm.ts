import { http, HttpResponse } from "msw";

const CRM_BASE = "/gateway/proxy/crm";

export const crmHandlers = [
  http.all(`${CRM_BASE}/*`, () =>
    HttpResponse.json(
      { message: "CRM mock not implemented" },
      { status: 501 }
    )
  ),
];
