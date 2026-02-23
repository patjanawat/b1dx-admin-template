export async function GET() {
  return new Response(
    JSON.stringify({ status: "not-implemented" }),
    {
      status: 501,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    }
  );
}

export async function POST() {
  return new Response(
    JSON.stringify({ status: "not-implemented" }),
    {
      status: 501,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    }
  );
}
