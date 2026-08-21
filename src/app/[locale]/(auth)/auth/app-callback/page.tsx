import { routing } from "@/i18n/routing";
import { AppCallbackPage } from "@/views/app-callback-page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AuthAppCallback() {
  return <AppCallbackPage />;
}
