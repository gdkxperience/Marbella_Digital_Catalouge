import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import StonesSection from "@/components/sections/StonesSection";
import InspirationSection from "@/components/sections/InspirationSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <StonesSection />
      <InspirationSection />
    </>
  );
}
