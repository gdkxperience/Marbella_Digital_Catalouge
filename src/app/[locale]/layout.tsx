import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const montserrat = localFont({
  src: [
    { path: "../../../public/fonts/Montserrat-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../../public/fonts/Montserrat-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../../public/fonts/Montserrat-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../../public/fonts/Montserrat-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages as Record<string, Record<string, string>>).meta;

  return {
    title: meta?.title || "Marbella Design & Decor",
    description: meta?.description || "",
    openGraph: {
      title: meta?.title || "Marbella Design & Decor",
      description: meta?.description || "",
      siteName: "Marbella Design & Decor",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={montserrat.variable}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
