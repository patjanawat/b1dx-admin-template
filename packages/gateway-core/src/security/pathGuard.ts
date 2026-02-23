import { GatewayError } from "../errors/GatewayError";

const hasEncodedTraversal = (value: string): boolean => {
  const lower = value.toLowerCase();
  return lower.includes("%2e") || lower.includes("%2f") || lower.includes("%5c");
};

export const normalizeAndValidatePath = (pathname: string): string => {
  if (!pathname) {
    throw new GatewayError("INVALID_PATH", "Pathname must be non-empty.");
  }

  if (pathname.includes("\\")) {
    throw new GatewayError("INVALID_PATH", "Backslashes are not allowed.", {
      pathname,
    });
  }

  if (pathname.includes("//")) {
    throw new GatewayError("INVALID_PATH", "Double slashes are not allowed.", {
      pathname,
    });
  }

  if (hasEncodedTraversal(pathname)) {
    throw new GatewayError("INVALID_PATH", "Encoded traversal is not allowed.", {
      pathname,
    });
  }

  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    throw new GatewayError("INVALID_PATH", "Pathname is not valid encoding.", {
      pathname,
    });
  }

  if (decoded.includes("..")) {
    throw new GatewayError("INVALID_PATH", "Path traversal is not allowed.", {
      pathname,
    });
  }

  return decoded;
};

export const assertAllowedPath = (
  pathname: string,
  allowedPrefixes: string[]
): void => {
  const normalized = normalizeAndValidatePath(pathname);
  const match = allowedPrefixes.some((prefix) =>
    normalized.startsWith(prefix)
  );
  if (!match) {
    throw new GatewayError(
      "PATH_NOT_ALLOWED",
      "Pathname is not allowed for this upstream.",
      { pathname }
    );
  }
};
