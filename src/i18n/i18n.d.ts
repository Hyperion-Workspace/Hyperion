import type { Locale } from "@/i18n";
import messages from "@/i18n/messages/en.json" with { type: "json" };

type Messages = typeof messages;

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: Messages;
  }
}
