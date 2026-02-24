import { handlers } from "./handlers";

export async function startMocking() {
  if (typeof window === "undefined") return;
  const { setupWorker } = await import("msw/browser");
  const worker = setupWorker(...handlers);
  await worker.start({ onUnhandledRequest: "bypass" });
  return worker;
}
