"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { getImageUrl } from "@/lib/supabase";
import SupabaseImage from "@/components/ui/SupabaseImage";

const inspirationImages = [
  { src: "zazu_cover_calacatta_viola.jpeg" },
  { src: "inspiration_2.jpg" },
  { src: "toscana_cover_steel_gray_granite.jpg" },
  { src: "inspiration_4.jpg" },
  { src: "inspiration_5.webp" },
  { src: "inspiration_6.jpg" },
];

const ITEMS_PER_PAGE = 3;

export default function InspirationSection() {
  const t = useTranslations("inspiration");
  const tCommon = useTranslations("common");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleImages = inspirationImages.slice(0, visibleCount);
  const hasMore = visibleCount < inspirationImages.length;

  return (
    <section id="inspiration" className="overflow-hidden bg-white py-16 md:py-24">
      {/* Title */}
      <div className="text-center px-4 mb-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] uppercase text-foreground">
          {t("title")}
        </h2>
      </div>

      {/* Description */}
      <div className="text-center px-4 mb-16 md:mb-20 max-w-2xl mx-auto">
        <p className="text-xs text-foreground/85 leading-[2] tracking-wide">
          {t("description")}
        </p>
      </div>

      {/* Images in 2 columns */}
      <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-16">
          {visibleImages.map((image, index) => (
            <div key={index} className="relative aspect-[4/3] overflow-hidden img-zoom">
              <SupabaseImage
                src={getImageUrl(image.src)}
                alt="Marbella inspiration"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* See More button */}
      {hasMore && (
        <div className="text-center mt-12 md:mt-16">
          <button
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            className="px-8 py-3 border border-foreground/20 text-xs tracking-[0.15em] uppercase text-foreground/80 hover:bg-foreground hover:text-white transition-colors duration-300"
          >
            {tCommon("seeMore")}
          </button>
        </div>
      )}
    </section>
  );
}
