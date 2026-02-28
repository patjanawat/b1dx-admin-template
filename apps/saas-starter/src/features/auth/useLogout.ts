import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth/AuthProvider";

export function useLogout() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: () => logout(),
  });
}
