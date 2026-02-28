export async function register() {
  // Only runs in Node.js runtime — guards against webpack bundling for browser/edge
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.GATEWAY_ALLOW_PRIVATE_HOSTS === "1"
  ) {
    // Bypass TLS verification for self-signed certs (e.g. .NET Kestrel dev cert)
    // GATEWAY_ALLOW_PRIVATE_HOSTS is never set in production
    const { Agent, setGlobalDispatcher } = await import("undici");
    setGlobalDispatcher(new Agent({ connect: { rejectUnauthorized: false } }));
  }
}
