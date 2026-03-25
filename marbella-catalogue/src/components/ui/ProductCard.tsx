"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Product } from "@/data/products";
import { getImageUrl, getStoneImageUrl } from "@/lib/supabase";
import { getStoneBySlug } from "@/data/stones";
import SupabaseImage from "./SupabaseImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("products");

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-warm-gray mb-4">
        <SupabaseImage
          src={getImageUrl(product.image)}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-medium tracking-wide">
          {product.name}
        </h3>

        {/* Stone dots */}
        {product.stones.length > 0 && (
          <div className="flex items-center gap-1.5">
            {product.stones.slice(0, 4).map((stoneSlug) => {
              const stone = getStoneBySlug(stoneSlug);
              return (
                <div
                  key={stoneSlug}
                  className="w-5 h-5 rounded-full overflow-hidden border border-border bg-warm-gray"
                  title={stone?.name || stoneSlug}
                >
                  <SupabaseImage
                    src={getStoneImageUrl(
                      stone?.image || `stones/${stoneSlug}`,
                      40
                    )}
                    alt={stone?.name || stoneSlug}
                    width={20}
                    height={20}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
            {product.stones.length > 4 && (
              <span className="text-xs text-muted ml-1">
                +{product.stones.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Sizes preview */}
        {product.sizes.length > 0 && (
          <p className="text-xs text-muted">
            {product.sizes.map((s) => s.label).join(" | ")}
          </p>
        )}
      </div>
    </Link>
  );
}
