import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

// Required root page — immediately redirects to the default locale.
// The [locale]/layout.tsx handles the actual <html>/<body> shell.
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
