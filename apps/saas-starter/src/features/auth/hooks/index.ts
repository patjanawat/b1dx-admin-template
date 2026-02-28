"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/auth/authApi";
import { useAuth } from "@/lib/auth/AuthProvider";

export function useLogin() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: { username: string; password: string }) =>
      login(credentials),
    onSuccess: () => {
      router.replace("/");
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: { email: string }) => authApi.forgotPassword(payload),
  });
}

export function useLogout() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: () => logout(),
  });
}
