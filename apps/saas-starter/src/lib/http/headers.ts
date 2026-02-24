import type { HeadersInit } from "undici";

type HeaderRecord = Record<string, unknown>;

const isTuple = (value: unknown): value is [string, string] =>
  Array.isArray(value) &&
  value.length >= 2 &&
  typeof value[0] === "string" &&
  typeof value[1] === "string";

export function toHeaders(init?: HeadersInit | HeaderRecord): Headers {
  if (!init) return new Headers();

  if (init instanceof Headers) {
    return new Headers(init);
  }

  if (Array.isArray(init)) {
    const tuples: Array<[string, string]> = [];
    for (const entry of init) {
      if (isTuple(entry)) {
        tuples.push([entry[0], entry[1]]);
      }
    }
    return new Headers(tuples);
  }

  if (typeof init === "object") {
    const headers = new Headers();
    Object.entries(init).forEach(([key, value]) => {
      if (typeof value !== "undefined" && value !== null) {
        headers.set(key, String(value));
      }
    });
    return headers;
  }

  return new Headers();
}
