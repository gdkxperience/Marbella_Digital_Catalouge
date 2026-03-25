"use client";

import { useTranslations } from "next-intl";
import { Stone } from "@/data/stones";
import { getStoneImageUrl } from "@/lib/supabase";
import SupabaseImage from "./SupabaseImage";

interface StoneCardProps {
  stone: Stone;
}

export default function StoneCard({ stone }: StoneCardProps) {
  const t = useTranslations("stones");

  const description = t.has(stone.slug) ? t(stone.slug) : "";

  return (
    <div className="group">
      {/* Square image - center crop */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-warm-gray mb-3">
        <SupabaseImage
          src={getStoneImageUrl(stone.image, 600)}
          alt={stone.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Name and origin */}
      <h3 className="text-sm font-semibold tracking-wide uppercase">
        {stone.name}
      </h3>
      <p className="text-xs text-muted mt-0.5">{stone.origin}</p>

      {/* Description on hover / visible on mobile */}
      {description && (
        <p className="text-xs text-muted/80 mt-2 leading-relaxed line-clamp-3 md:line-clamp-none md:max-h-0 md:overflow-hidden md:group-hover:max-h-40 transition-all duration-500">
          {description}
        </p>
      )}
    </div>
  );
}
