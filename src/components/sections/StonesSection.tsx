"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { stones, Stone } from "@/data/stones";
import { getImageUrl } from "@/lib/supabase";
import SupabaseImage from "@/components/ui/SupabaseImage";

const STONES_PER_PAGE = 3;

/* ── Single stone card: image left, name + description right ── */
function StoneCard({ stone, t }: { stone: Stone; t: ReturnType<typeof useTranslations> }) {
  const description = t.has(stone.slug) ? t(stone.slug) : "";

  return (
    <>
      {/* Mobile: full width image, text below */}
      <div className="md:hidden">
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

      {/* Desktop: image left, info right */}
      <div className="hidden md:flex gap-5">
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
    </>
  );
}

export default function StonesSection() {
  const t = useTranslations("stones");
  const tCommon = useTranslations("common");
  const [visibleCount, setVisibleCount] = useState(STONES_PER_PAGE);

  const visibleStones = stones.slice(0, visibleCount);
  const hasMore = visibleCount < stones.length;

  return (
    <section id="stones" className="bg-white overflow-hidden">
      {/* Title + subtitle */}
      <div className="px-4 md:px-10 lg:px-14 xl:px-20 pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center md:justify-start mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.15em] uppercase text-foreground leading-none select-none">
              {t("title")}
            </h2>
          </div>
          <p className="text-xs text-foreground/75 leading-[1.9] tracking-wide max-w-2xl">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Stone cards in 2-column grid with generous spacing */}
      <div className="px-4 md:px-10 lg:px-14 xl:px-20 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 md:gap-y-16">
          {visibleStones.map((stone) => (
            <StoneCard key={stone.slug} stone={stone} t={t} />
          ))}
        </div>
      </div>

      {/* See More button */}
      {hasMore && (
        <div className="text-center py-12 md:py-16">
          <button
            onClick={() => setVisibleCount((prev) => prev + STONES_PER_PAGE)}
            className="px-8 py-3 border border-foreground/20 text-xs tracking-[0.15em] uppercase text-foreground/80 hover:bg-foreground hover:text-white transition-colors duration-300"
          >
            {tCommon("seeMore")}
          </button>
        </div>
      )}

      {/* Bottom spacing */}
      {!hasMore && <div className="h-16 md:h-24" />}
    </section>
  );
}
