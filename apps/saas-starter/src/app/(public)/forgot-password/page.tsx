"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail, MailCheck } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useForgotPassword } from "@/features/auth/useForgotPassword";
import { ApiRequestError } from "@/lib/api/apiRequest";

const forgotSchema = z.object({
  email: z.string().email(),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const { mutate, isPending, isSuccess, error } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const serverError =
    error instanceof ApiRequestError
      ? (error.problem?.detail ?? error.message)
      : null;

  const onSubmit = (data: ForgotFormValues) => {
    mutate(data);
  };

  if (isSuccess) {
    return (
      <main className="w-full rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <MailCheck className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              {t("forgot_password.success_title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("forgot_password.success_subtitle")}
            </p>
          </div>
          <Link
            href="/login"
            className="mt-2 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("forgot_password.back_to_login")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground">
          {t("forgot_password.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("forgot_password.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {serverError ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </p>
        ) : null}

        <div className="space-y-1">
          <label className="block text-sm font-medium text-foreground">
            {t("forgot_password.email_label")}
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

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? t("forgot_password.submitting") : t("forgot_password.submit")}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("forgot_password.back_to_login")}
        </Link>
      </div>
    </main>
  );
}
