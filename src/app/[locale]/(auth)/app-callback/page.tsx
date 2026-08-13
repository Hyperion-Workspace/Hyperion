import { AppCallbackPage } from "@/pages/app-callback-page";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AppCallback() {
  return <AppCallbackPage />;
}
