"use client";

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

export default function InspirationSection() {
  const t = useTranslations("inspiration");

  // Split images into two columns for masonry-like layout
  const col1 = inspirationImages.filter((_, i) => i % 2 === 0);
  const col2 = inspirationImages.filter((_, i) => i % 2 === 1);

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

      {/* Two-column gallery (no rows — images stack independently per column) */}
      <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Column 1 */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6">
            {col1.map((image, index) => (
              <div key={index} className="relative overflow-hidden img-zoom">
                <SupabaseImage
                  src={getImageUrl(image.src)}
                  alt="Marbella inspiration"
                  width={800}
                  height={index === 0 ? 600 : index === 1 ? 700 : 500}
                  className="object-cover w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6">
            {col2.map((image, index) => (
              <div key={index} className="relative overflow-hidden img-zoom">
                <SupabaseImage
                  src={getImageUrl(image.src)}
                  alt="Marbella inspiration"
                  width={800}
                  height={index === 0 ? 700 : index === 1 ? 500 : 600}
                  className="object-cover w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
