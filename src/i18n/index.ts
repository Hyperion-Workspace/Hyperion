import type { routing } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];

// biome-ignore lint/performance/noBarrelFile: Wrapper package re-exports
export { localeConfig } from "@/i18n/routing";
export * from "next-intl";

import enMessages from "./messages/en.json" with { type: "json" };

export const messages = {
  en: enMessages,
} as const;
