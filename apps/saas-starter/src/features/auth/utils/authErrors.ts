import type { TFunction } from "i18next";
import { AuthError } from "@/lib/auth/authApi";

/**
 * Maps an AuthError to a user-friendly i18n message for the login form.
 *
 * Priority:
 * 1. error.code — works correctly once the pipeline bug is fixed
 * 2. error.httpStatus — current fallback (code is always AUTH_INTERNAL_ERROR)
 */
export function mapLoginError(err: AuthError, t: TFunction): string {
  switch (err.code) {
    case "AUTH_INVALID_CREDENTIALS":
    case "AUTH_ACCOUNT_INACTIVE":
      return t("login.errors.invalid_credentials");
    case "AUTH_ACCOUNT_LOCKED":
      return t("login.errors.account_locked");
    case "AUTH_ACCOUNT_SUSPENDED":
      return t("login.errors.account_suspended");
  }

  switch (err.httpStatus) {
    case 401:
      return t("login.errors.invalid_credentials");
    case 403:
      return t("login.errors.account_suspended");
    case 423:
      return t("login.errors.account_locked");
    case 500:
      return t("login.errors.server_error");
    default:
      return t("login.errors.unknown");
  }
}
