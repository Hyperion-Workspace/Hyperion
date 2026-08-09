import { AppCallbackPage } from "@workspace/core/pages/app-callback-page";
import { routing } from "@workspace/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AppCallback() {
  return <AppCallbackPage />;
}
