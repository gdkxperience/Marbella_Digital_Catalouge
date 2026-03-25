"use client";

import { useTranslations } from "next-intl";
import { getImageUrl } from "@/lib/supabase";
import SupabaseImage from "@/components/ui/SupabaseImage";

const inspirationImages = [
  { src: "zazu_cover_calacatta_viola.jpeg", aspect: "aspect-[3/4]" },
  { src: "inspiration_2.jpg", aspect: "aspect-[4/5]" },
  { src: "toscana_cover_steel_gray_granite.jpg", aspect: "aspect-[3/4]" },
  { src: "inspiration_4.jpg", aspect: "aspect-[4/3]" },
  { src: "inspiration_5.webp", aspect: "aspect-[3/4]" },
  { src: "inspiration_6.jpg", aspect: "aspect-[4/5]" },
];

export default function InspirationSection() {
  const t = useTranslations("inspiration");

  return (
    <section id="inspiration" className="overflow-hidden">
      {/* Section opener */}
      <div className="py-24 md:py-36 px-4 md:px-10 bg-cream text-center">
        <p className="text-[10px] tracking-[0.5em] uppercase text-muted-light mb-6">
          Lookbook
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-[7rem] font-extralight tracking-[0.2em]">
          {t("title")}
        </h2>
        <div className="w-20 h-px bg-foreground/15 mx-auto mt-8" />
        <p className="text-xs text-muted max-w-lg mx-auto mt-8 leading-[2] tracking-wide">
          {t("description")}
        </p>
      </div>

      {/* Editorial masonry grid */}
      <div className="bg-white px-2 md:px-4 py-4">
        {/* Row 1: large + small */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 mb-2 md:mb-4">
          <div className="md:col-span-8 relative aspect-[16/10] overflow-hidden img-zoom">
            <SupabaseImage
              src={getImageUrl(inspirationImages[0].src)}
              alt="Marbella inspiration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
          <div className="md:col-span-4 relative aspect-[3/4] md:aspect-auto overflow-hidden img-zoom">
            <SupabaseImage
              src={getImageUrl(inspirationImages[1].src)}
              alt="Marbella inspiration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Row 2: three equal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 mb-2 md:mb-4">
          {[2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="relative aspect-[4/5] overflow-hidden img-zoom"
            >
              <SupabaseImage
                src={getImageUrl(inspirationImages[idx].src)}
                alt="Marbella inspiration"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Row 3: full-width cinematic */}
        <div className="relative aspect-[21/9] overflow-hidden img-zoom">
          <SupabaseImage
            src={getImageUrl(inspirationImages[5].src)}
            alt="Marbella inspiration"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
