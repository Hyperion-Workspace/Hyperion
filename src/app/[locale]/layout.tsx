import { messages, NextIntlClientProvider } from "@/i18n";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    console.log("INVALID LOCALE", locale);
    notFound();
  }

  // Get messages for the current locale (client-side loading for Tauri)
  const validatedLocale = locale as keyof typeof messages;
  const localeMessages = messages[validatedLocale];

  return (
    <NextIntlClientProvider
      locale={validatedLocale}
      messages={localeMessages}
      timeZone="UTC"
    >
      {children}
    </NextIntlClientProvider>
  );
}
