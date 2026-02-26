import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/auth/authApi";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: { email: string }) => authApi.forgotPassword(payload),
  });
}
