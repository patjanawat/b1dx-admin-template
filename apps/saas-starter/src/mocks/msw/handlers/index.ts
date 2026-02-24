import { coreHandlers } from "./core";
import { crmHandlers } from "./crm";

export const handlers = [...coreHandlers, ...crmHandlers];
