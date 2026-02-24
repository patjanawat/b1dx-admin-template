# MSW Mocks (Phase 1)

## What is mocked
- `/gateway/proxy/core/*`
- `/gateway/proxy/crm/*`

## Enable in development
1. Add the dependency in `apps/saas-starter/package.json` (already added).
2. Generate the service worker once:

```
pnpm dlx msw init public --save
```

2. Start mocking near the app root (client-side):

```ts
if (process.env.NEXT_PUBLIC_MSW === "1") {
  void import("@/mocks/msw").then((mod) => mod.startMocking());
}
```

3. Run the app with `NEXT_PUBLIC_MSW=1`.

## Enable in tests
```ts
import { server } from "@/mocks/msw/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Disable
- Remove `NEXT_PUBLIC_MSW` or set it to `0`.
- In tests, do not call `server.listen()`.
