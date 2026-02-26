"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Rocket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useLogin } from "@/features/auth/useLogin";
import { ApiRequestError } from "@/lib/api/apiRequest";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
  version: string;
};

export function LoginForm({ version }: LoginFormProps) {
  const { t } = useTranslation();
  const { mutate, isPending, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const [timestamp] = useState(() => {
    const now = new Date();
    return {
      date: now.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const serverError =
    error instanceof ApiRequestError
      ? (error.problem?.detail ?? error.message)
      : null;

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <div className="w-full space-y-6">
      {/* Brand */}
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
          <Rocket className="h-7 w-7" />
        </div>
        <h1 className="text-xl font-bold text-foreground">
          {t("login.app_name")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("login.app_tagline")}</p>
      </div>

      {/* Card */}
      <main className="w-full rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">
            {t("login.heading")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("login.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {serverError ? (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {serverError}
            </p>
          ) : null}

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-foreground">
              {t("login.email_label")}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="admin@company.com"
                autoComplete="email"
                className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </div>
            {errors.email ? (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            ) : null}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-foreground">
              {t("login.password_label")}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-10 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={
                  showPassword
                    ? t("login.hide_password")
                    : t("login.show_password")
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password ? (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border accent-primary"
                {...register("rememberMe")}
              />
              {t("login.remember_me")}
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("login.forgot_password")}
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? t("login.submitting") : t("login.submit")}
            {!isPending && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </main>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        {t("login.no_account")}{" "}
        <span className="font-medium text-primary">
          {t("login.contact_admin")}
        </span>
      </p>

      {/* Status bar */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {t("login.server_online")}
        </span>
        <span>·</span>
        <span>v{version}</span>
        <span>·</span>
        <span>
          {timestamp.date} {timestamp.time}
        </span>
      </div>
    </div>
  );
}
