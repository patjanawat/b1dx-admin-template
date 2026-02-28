"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Form, RHFTextInput } from "@b1dx/ui";
import { useForgotPassword } from "@/features/auth/useForgotPassword";
import {
  createForgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/features/auth/schema/forgot-password.schema";
import { ApiRequestError } from "@/lib/api/apiRequest";

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const { mutate, isPending, isSuccess, error } = useForgotPassword();

  const schema = useMemo(
    () =>
      createForgotPasswordSchema({
        email: {
          required: t("validation.email_required"),
          tooLong: t("validation.email_too_long"),
          invalid: t("validation.email_invalid"),
        },
      }),
    [t]
  );

  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const serverError =
    error instanceof ApiRequestError
      ? (error.problem?.detail ?? error.message)
      : null;

  const onSubmit = (data: ForgotPasswordFormValues) => {
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

      <Form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {serverError ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </p>
        ) : null}

        <RHFTextInput
          control={control}
          name="email"
          type="text"
          inputMode="email"
          label={t("forgot_password.email_label")}
          placeholder="admin@company.com"
          autoComplete="email"
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("forgot_password.submitting")}
            </>
          ) : (
            t("forgot_password.submit")
          )}
        </Button>
      </Form>

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
