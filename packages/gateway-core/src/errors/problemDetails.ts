export type ProblemDetails = {
  type: string;
  title: string;
  status: number;
  detail: string;
  errors?: Record<string, string[]>;
  traceId?: string;
};

export type ProblemDetailsResponseParams = {
  problem: ProblemDetails;
  headers?: HeadersInit;
};

export const toProblemDetailsResponse = (
  params: ProblemDetailsResponseParams
): Response => {
  const { problem, headers } = params;
  const mergedHeaders = new Headers(headers);
  mergedHeaders.set("content-type", "application/problem+json; charset=utf-8");
  return new Response(JSON.stringify(problem), {
    status: problem.status,
    headers: mergedHeaders,
  });
};

const isProblemDetails = (value: unknown): value is ProblemDetails => {
  if (!value || typeof value !== "object") return false;
  const maybe = value as ProblemDetails;
  return (
    typeof maybe.type === "string" &&
    typeof maybe.title === "string" &&
    typeof maybe.status === "number" &&
    typeof maybe.detail === "string"
  );
};

export const tryParseUpstreamProblemDetails = async (
  res: Response
): Promise<ProblemDetails | null> => {
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/problem+json")) {
    return null;
  }
  try {
    const data = await res.json();
    return isProblemDetails(data) ? data : null;
  } catch {
    return null;
  }
};
