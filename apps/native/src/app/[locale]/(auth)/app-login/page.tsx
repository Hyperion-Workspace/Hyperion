import { AppLoginPage } from "@workspace/core/pages/app-login-page";
import { routing } from "@workspace/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AppLogin() {
  return <AppLoginPage />;
}
