import { AuthProvider } from "@workspace/core/components/auth/auth-provider";

interface AuthGroupLayoutProps {
  children: React.ReactNode;
}

export default function AuthGroupLayout({ children }: AuthGroupLayoutProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
