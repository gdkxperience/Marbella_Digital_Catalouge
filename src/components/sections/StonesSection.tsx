"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { stones, Stone } from "@/data/stones";
import { getImageUrl } from "@/lib/supabase";
import SupabaseImage from "@/components/ui/SupabaseImage";

const STONES_PER_PAGE = 3;

/* ── Single stone card (mobile only): full-width image, text below ── */
function MobileStoneCard({ stone, t }: { stone: Stone; t: ReturnType<typeof useTranslations> }) {
  const description = t.has(stone.slug) ? t(stone.slug) : "";

  return (
    <div>
      <div className="relative w-full aspect-square overflow-hidden bg-warm-gray">
        <SupabaseImage
          src={getImageUrl(stone.image)}
          alt={stone.name}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="mt-3">
        <h4 className="text-xs tracking-[0.1em] uppercase font-semibold leading-tight">
          {stone.name}
        </h4>
        <p className="text-[11px] text-muted-light tracking-wide mt-1">
          {stone.origin}
        </p>
        {description && (
          <p className="text-[11px] text-foreground/75 leading-[1.8] tracking-wide mt-2 line-clamp-5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Single stone card (desktop only): image left, info right ── */
function DesktopStoneCard({ stone, t }: { stone: Stone; t: ReturnType<typeof useTranslations> }) {
  const description = t.has(stone.slug) ? t(stone.slug) : "";

  return (
    <div className="flex gap-5">
      <div className="relative w-40 h-40 flex-shrink-0 overflow-hidden bg-warm-gray">
        <SupabaseImage
          src={getImageUrl(stone.image)}
          alt={stone.name}
          fill
          className="object-cover object-center scale-[2]"
          sizes="160px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm tracking-[0.1em] uppercase font-semibold leading-tight">
          {stone.name}
        </h4>
        <p className="text-[11px] text-muted-light tracking-wide mt-1">
          {stone.origin}
        </p>
        {description && (
          <p className="text-[11px] text-foreground/75 leading-[1.8] tracking-wide mt-2 line-clamp-5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function StonesSection() {
  const t = useTranslations("stones");
  const tCommon = useTranslations("common");
  const [visibleCount, setVisibleCount] = useState(STONES_PER_PAGE);

  const visibleStones = stones.slice(0, visibleCount);
  const hasMore = visibleCount < stones.length;

  // Desktop groupings (original layout)
  const firstThree = stones.slice(0, 3);
  const remaining = stones.slice(3);
  const gridSections: Stone[][] = [];
  for (let i = 0; i < remaining.length; i += 6) {
    gridSections.push(remaining.slice(i, i + 6));
  }

  return (
    <section id="stones" className="bg-white overflow-hidden">
      {/* ══════════════════════════════════════════════════════════
          MOBILE LAYOUT: no cover, title + subtitle, 3 at a time + See More
         ══════════════════════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* Title + subtitle */}
        <div className="px-4 pt-16 pb-8">
          <div className="flex justify-center mb-6">
            <h2 className="text-3xl font-extralight tracking-[0.15em] uppercase text-foreground leading-none select-none">
              {t("title")}
            </h2>
          </div>
          <p className="text-xs text-foreground/75 leading-[1.9] tracking-wide">
            {t("subtitle")}
          </p>
        </div>

        {/* Stone cards with generous spacing */}
        <div className="px-4 pb-8">
          <div className="flex flex-col gap-12">
            {visibleStones.map((stone) => (
              <MobileStoneCard key={stone.slug} stone={stone} t={t} />
            ))}
          </div>
        </div>

        {/* See More button */}
        {hasMore && (
          <div className="text-center py-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + STONES_PER_PAGE)}
              className="px-8 py-3 border border-foreground/20 text-xs tracking-[0.15em] uppercase text-foreground/80 hover:bg-foreground hover:text-white transition-colors duration-300"
            >
              {tCommon("seeMore")}
            </button>
          </div>
        )}

        {!hasMore && <div className="h-16" />}
      </div>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP LAYOUT: original cover + grid sections (unchanged)
         ══════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        {/* Section 1: Cover left + title & 3 stones right */}
        <div className="grid grid-cols-2 min-h-[70vh]">
          {/* Cover image */}
          <div className="relative min-h-full overflow-hidden bg-white">
            <SupabaseImage
              src={getImageUrl("stone_types_cover.PNG")}
              alt="Natural Stone"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>

          {/* Title + 3 stones in a column */}
          <div className="bg-white p-6 lg:p-8 xl:p-10 flex items-center">
            <div className="w-full">
              <div className="flex justify-end mb-10">
                <h2 className="text-4xl lg:text-5xl font-extralight tracking-[0.15em] uppercase text-foreground leading-none select-none">
                  {t("title")}
                </h2>
              </div>

              <div className="flex flex-col gap-8">
                {firstThree.map((stone) => (
                  <DesktopStoneCard key={stone.slug} stone={stone} t={t} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sections 2-4: 2 cols x 3 rows = 6 per section */}
        {gridSections.map((group, idx) => (
          <div
            key={idx}
            className="px-10 lg:px-14 xl:px-20 py-24 border-t border-foreground/5"
          >
            <div className="max-w-6xl mx-auto grid grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12">
              {group.map((stone) => (
                <DesktopStoneCard key={stone.slug} stone={stone} t={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
