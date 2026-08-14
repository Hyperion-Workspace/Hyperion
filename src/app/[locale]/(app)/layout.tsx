"use client";

import { AuthProvider } from "@/components/auth/auth-provider";
import { AppLayout } from "../components/app-layout";

interface AppGroupLayoutProps {
  children: React.ReactNode;
}

export default function AppGroupLayout({ children }: AppGroupLayoutProps) {
  return (
    <AuthProvider>
      <AppLayout>{children}</AppLayout>
    </AuthProvider>
  );
}
