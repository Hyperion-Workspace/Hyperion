import { AppLoginPage } from "@/pages/app-login-page";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AuthAppLogin() {
  return <AppLoginPage />;
}
