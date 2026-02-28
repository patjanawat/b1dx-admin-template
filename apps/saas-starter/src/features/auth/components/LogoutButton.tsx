"use client";

import { Loader2, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@b1dx/ui";
import { useLogout } from "@/features/auth/useLogout";

export function LogoutButton() {
  const { t } = useTranslation();
  const { mutate, isPending } = useLogout();

  return (
    <Button
      type="button"
      variant="ghost"
      disabled={isPending}
      onClick={() => mutate()}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-destructive/10 py-2.5 text-xs font-bold uppercase tracking-widest text-destructive hover:bg-destructive hover:text-destructive-foreground active:scale-95 disabled:pointer-events-none"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {t("profile.logout")}
          <LogOut size={14} />
        </>
      )}
    </Button>
  );
}
