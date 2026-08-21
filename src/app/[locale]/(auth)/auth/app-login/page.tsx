import { routing } from "@/i18n/routing";
import { AppLoginPage } from "@/views/app-login-page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AuthAppLogin() {
  return <AppLoginPage />;
}
