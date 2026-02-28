"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Button,
  Form,
  RHFCheckbox,
  RHFPasswordInput,
  RHFTextInput,
} from "@b1dx/ui";
import { useLogin } from "@/features/auth/hooks";
import { createLoginSchema, type LoginFormValues } from "@/features/auth/schema/login.schema";
import { ApiRequestError } from "@/lib/api/apiRequest";

interface LoginFormProps {
  version: string;
}

export function LoginForm({ version }: LoginFormProps) {
  const { t } = useTranslation();
  const { mutate, isPending, error } = useLogin();

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

  const schema = useMemo(
    () =>
      createLoginSchema({
        email: {
          required: t("validation.email_required"),
          tooLong: t("validation.email_too_long"),
          invalid: t("validation.email_invalid"),
        },
        passwordRequired: t("validation.password_required"),
      }),
    [t]
  );

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
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
            label={t("login.email_label")}
            placeholder="admin@company.com"
            autoComplete="email"
          />

          <RHFPasswordInput
            control={control}
            name="password"
            label={t("login.password_label")}
            placeholder="••••••••"
            autoComplete="current-password"
            showPasswordLabel={t("login.show_password")}
            hidePasswordLabel={t("login.hide_password")}
          />

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <RHFCheckbox
              control={control}
              name="rememberMe"
              label={t("login.remember_me")}
            />
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("login.forgot_password")}
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full"
          >
            {isPending ? t("login.submitting") : t("login.submit")}
            {!isPending && <ArrowRight className="h-4 w-4" />}
          </Button>
        </Form>
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
