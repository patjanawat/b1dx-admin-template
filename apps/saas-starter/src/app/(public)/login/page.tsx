"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useLogin } from "@/features/auth/useLogin";
import { ApiRequestError } from "@/lib/api/apiRequest";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { t } = useTranslation();
  const { mutate, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const serverError =
    error instanceof ApiRequestError
      ? (error.problem?.detail ?? error.message)
      : null;

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <main className="w-full rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          {t("login.title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("login.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {serverError ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </p>
        ) : null}

        <div className="space-y-1">
          <label className="block text-sm font-medium text-foreground">
            {t("login.email_label")}
            <input
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive"
              {...register("email")}
            />
          </label>
          {errors.email ? (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-foreground">
            {t("login.password_label")}
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive"
              {...register("password")}
            />
          </label>
          {errors.password ? (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? t("login.submitting") : t("login.submit")}
        </button>
      </form>
    </main>
  );
}
