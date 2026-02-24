import { isProblemDetails } from "@/lib/errors/problemDetails";
import type { ProblemDetails } from "@/lib/errors/problemDetails";
import type { HeadersInit, RequestInfo, RequestInit } from "undici";

type ApiRequestOptions = RequestInit & {
  parseJson?: boolean;
};

export class ApiRequestError extends Error {
  status: number;
  problem?: ProblemDetails;
  data?: unknown;

  constructor(message: string, status: number, problem?: ProblemDetails, data?: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.problem = problem;
    this.data = data;
  }
}

const mergeHeaders = (headers?: HeadersInit): Headers => {
  const merged = new Headers();
  if (headers) {
    if (headers instanceof Headers) {
      headers.forEach((value, key) => merged.append(key, value));
    } else if (Array.isArray(headers)) {
      for (const tuple of headers) {
        const [key, value] = tuple;
        if (typeof key === "string" && typeof value === "string") {
          merged.append(key, value);
        }
      }
    } else {
      Object.entries(headers).forEach(([key, value]) => {
        if (typeof value !== "undefined") {
          merged.set(key, String(value));
        }
      });
    }
  }
  if (!merged.has("accept")) {
    merged.set("accept", "application/json");
  }
  if (!merged.has("content-type")) {
    merged.set("content-type", "application/json; charset=utf-8");
  }
  return merged;
};

const tryParseJson = async (res: Response): Promise<unknown | null> => {
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;

  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
};

export async function apiRequest<T>(
  input: RequestInfo | URL,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { headers, parseJson = true, ...rest } = options;
  const res = await fetch(input as globalThis.RequestInfo | URL, {
    ...(rest as globalThis.RequestInit),
    headers: mergeHeaders(headers),
  });

  const data = parseJson ? await tryParseJson(res) : null;

  if (!res.ok) {
    const problem = isProblemDetails(data) ? data : undefined;
    const message = problem?.detail ?? `Request failed with ${res.status}`;
    throw new ApiRequestError(message, res.status, problem, data ?? undefined);
  }

  return data as T;
}
