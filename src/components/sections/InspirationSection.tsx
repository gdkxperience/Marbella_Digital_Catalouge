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

  return (
    <section id="inspiration" className="overflow-hidden bg-white">
      {/* ── Section 1: Image grid with vertical title on right edge ── */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[50vh] md:min-h-[70vh]">
          {/* Left: stacked images with text overlay */}
          <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 p-2 md:p-3">
            {/* Top-left: large hero image */}
            <div className="relative aspect-[4/3] overflow-hidden img-zoom">
              <SupabaseImage
                src={getImageUrl(inspirationImages[0].src)}
                alt="Marbella inspiration"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Top-right: description text block */}
            <div className="flex items-center justify-center bg-white p-6 md:p-10">
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
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Bottom-right: image */}
            <div className="relative aspect-[4/3] overflow-hidden img-zoom">
              <SupabaseImage
                src={getImageUrl(inspirationImages[2].src)}
                alt="Marbella inspiration"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right edge: vertical title */}
          <div className="hidden md:flex md:col-span-1 items-start justify-center relative pt-6">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-[0.3em] uppercase text-foreground leading-none select-none whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}
            >
              {t("title")}
            </h2>
          </div>

          {/* Mobile title — shown only on small screens */}
          <div className="md:hidden py-8 px-4 text-right">
            <h2 className="text-3xl font-extralight tracking-[0.15em] uppercase text-foreground leading-none select-none">
              {t("title")}
            </h2>
          </div>
        </div>
      </div>

      {/* ── Section 2: More images — asymmetric editorial grid ── */}
      <div className="p-2 md:p-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3">
          {/* Left: tall portrait */}
          <div className="md:col-span-4 relative aspect-[3/4] overflow-hidden img-zoom">
            <SupabaseImage
              src={getImageUrl(inspirationImages[3].src)}
              alt="Marbella inspiration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Middle: tall portrait */}
          <div className="md:col-span-4 relative aspect-[3/4] overflow-hidden img-zoom">
            <SupabaseImage
              src={getImageUrl(inspirationImages[4].src)}
              alt="Marbella inspiration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Right: tall portrait */}
          <div className="md:col-span-4 relative aspect-[3/4] overflow-hidden img-zoom">
            <SupabaseImage
              src={getImageUrl(inspirationImages[5].src)}
              alt="Marbella inspiration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
