export type ProblemDetails = {
  type: string;
  title: string;
  status: number;
  detail: string;
  errors?: Record<string, string[]>;
  traceId?: string;
};

export const isProblemDetails = (value: unknown): value is ProblemDetails => {
  if (!value || typeof value !== "object") return false;
  const maybe = value as ProblemDetails;
  return (
    typeof maybe.type === "string" &&
    typeof maybe.title === "string" &&
    typeof maybe.status === "number" &&
    typeof maybe.detail === "string"
  );
};
