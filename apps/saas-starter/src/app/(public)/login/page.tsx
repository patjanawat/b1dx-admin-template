import { LoginForm } from "@/features/auth";
import { version } from "@/lib/version";

export default function LoginPage() {
  return <LoginForm version={version} />;
}
