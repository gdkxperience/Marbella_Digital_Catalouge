import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import StonesSection from "@/components/sections/StonesSection";
import InspirationSection from "@/components/sections/InspirationSection";
import DiscountPopup from "@/components/ui/DiscountPopup";

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
      <div className="h-16 md:h-24" />
      <ProductsSection />
      <StonesSection />
      <InspirationSection />
      <DiscountPopup />
    </>
  );
}
