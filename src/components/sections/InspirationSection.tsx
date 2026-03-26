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

  // Split images into two columns for mobile masonry
  const col1 = inspirationImages.filter((_, i) => i % 2 === 0);
  const col2 = inspirationImages.filter((_, i) => i % 2 === 1);

  return (
    <section id="inspiration" className="overflow-hidden bg-white">
      {/* ══════════════════════════════════════════════════════════
          MOBILE LAYOUT: title → text → two-column gallery
         ══════════════════════════════════════════════════════════ */}
      <div className="md:hidden py-16">
        {/* Title */}
        <div className="text-center px-4 mb-6">
          <h2 className="text-3xl font-extralight tracking-[0.2em] uppercase text-foreground">
            {t("title")}
          </h2>
        </div>

        {/* Description */}
        <div className="text-center px-4 mb-12 max-w-2xl mx-auto">
          <p className="text-xs text-foreground/85 leading-[2] tracking-wide">
            {t("description")}
          </p>
        </div>

        {/* Two-column gallery (images stack independently per column) */}
        <div className="px-4">
          <div className="flex gap-3">
            {/* Column 1 */}
            <div className="flex-1 flex flex-col gap-3">
              {col1.map((image, index) => (
                <div key={index} className="relative overflow-hidden img-zoom">
                  <SupabaseImage
                    src={getImageUrl(image.src)}
                    alt="Marbella inspiration"
                    width={800}
                    height={index === 0 ? 600 : index === 1 ? 700 : 500}
                    className="object-cover w-full h-auto"
                    sizes="50vw"
                  />
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex-1 flex flex-col gap-3">
              {col2.map((image, index) => (
                <div key={index} className="relative overflow-hidden img-zoom">
                  <SupabaseImage
                    src={getImageUrl(image.src)}
                    alt="Marbella inspiration"
                    width={800}
                    height={index === 0 ? 700 : index === 1 ? 500 : 600}
                    className="object-cover w-full h-auto"
                    sizes="50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP LAYOUT: original editorial grid (unchanged)
         ══════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        {/* Section 1: Image grid with vertical title on right edge */}
        <div className="relative">
          <div className="grid grid-cols-12 min-h-[70vh]">
            {/* Left: stacked images with text overlay */}
            <div className="col-span-11 grid grid-cols-2 gap-3 p-3">
              {/* Top-left: large hero image */}
              <div className="relative aspect-[4/3] overflow-hidden img-zoom">
                <SupabaseImage
                  src={getImageUrl(inspirationImages[0].src)}
                  alt="Marbella inspiration"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>

              {/* Top-right: description text block */}
              <div className="flex items-center justify-center bg-white p-10">
                <p className="text-xs text-foreground/85 leading-[2] tracking-wide max-w-sm">
                  {t("description")}
                </p>
              </div>

              {/* Bottom-left: image */}
              <div className="relative aspect-[4/3] overflow-hidden img-zoom">
                <SupabaseImage
                  src={getImageUrl(inspirationImages[1].src)}
                  alt="Marbella inspiration"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>

              {/* Bottom-right: image */}
              <div className="relative aspect-[4/3] overflow-hidden img-zoom">
                <SupabaseImage
                  src={getImageUrl(inspirationImages[2].src)}
                  alt="Marbella inspiration"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>

            {/* Right edge: vertical title */}
            <div className="flex col-span-1 items-start justify-center relative pt-6">
              <h2
                className="text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-[0.3em] uppercase text-foreground leading-none select-none whitespace-nowrap"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
              >
                {t("title")}
              </h2>
            </div>
          </div>
        </div>

        {/* Section 2: More images — asymmetric editorial grid */}
        <div className="p-3">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-4 relative aspect-[3/4] overflow-hidden img-zoom">
              <SupabaseImage
                src={getImageUrl(inspirationImages[3].src)}
                alt="Marbella inspiration"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
            <div className="col-span-4 relative aspect-[3/4] overflow-hidden img-zoom">
              <SupabaseImage
                src={getImageUrl(inspirationImages[4].src)}
                alt="Marbella inspiration"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
            <div className="col-span-4 relative aspect-[3/4] overflow-hidden img-zoom">
              <SupabaseImage
                src={getImageUrl(inspirationImages[5].src)}
                alt="Marbella inspiration"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
