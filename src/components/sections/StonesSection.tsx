"use client";

import { useTranslations } from "next-intl";
import { stones, Stone } from "@/data/stones";
import { getImageUrl } from "@/lib/supabase";
import SupabaseImage from "@/components/ui/SupabaseImage";

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

  // Section 1: cover + first 3 stones
  const firstThree = stones.slice(0, 3);
  // Sections 2-4: groups of 6 (2 cols × 3 rows)
  const remaining = stones.slice(3);
  const gridSections: Stone[][] = [];
  for (let i = 0; i < remaining.length; i += 6) {
    gridSections.push(remaining.slice(i, i + 6));
  }

  return (
    <section id="stones" className="bg-white overflow-hidden">
      {/* ── Section 1: Cover left + title & 3 stones right ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[50vh] md:min-h-[70vh]">
        {/* Cover image */}
        <div className="relative min-h-[40vh] md:min-h-full overflow-hidden bg-white">
          <SupabaseImage
            src={getImageUrl("stone_types_cover.PNG")}
            alt="Natural Stone"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Title + 3 stones in a column */}
        <div className="bg-white p-4 md:p-6 lg:p-8 xl:p-10 flex items-center">
          <div className="w-full">
            {/* Section title — right-aligned, slightly smaller */}
            <div className="flex justify-center md:justify-end mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.15em] uppercase text-foreground leading-none select-none">
                {t("title")}
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              {firstThree.map((stone) => (
                <StoneCard key={stone.slug} stone={stone} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sections 2–4: 2 cols × 3 rows = 6 per section ── */}
      {gridSections.map((group, idx) => (
        <div
          key={idx}
          className="px-4 md:px-10 lg:px-14 xl:px-20 py-16 md:py-24 border-t border-foreground/5"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10 md:gap-y-12">
            {group.map((stone) => (
              <StoneCard key={stone.slug} stone={stone} t={t} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
