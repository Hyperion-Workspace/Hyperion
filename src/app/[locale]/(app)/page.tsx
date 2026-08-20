"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/workspace");
  }, [router]);

  return null;
}
