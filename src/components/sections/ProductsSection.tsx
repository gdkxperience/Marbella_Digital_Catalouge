"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  products,
  getProductsByCategory,
  Product,
  ProductCategory,
  SizeOption,
} from "@/data/products";
import { getImageUrl } from "@/lib/supabase";
import SupabaseImage from "@/components/ui/SupabaseImage";

const categories: ProductCategory[] = [
  "coffee-tables",
  "dining-tables",
  "auxiliary-tables",
];

const accessories = [
  {
    image: "accessory_podnos_oval.webp",
    name: "Мраморен поднос OVAL",
    description: "Мраморният поднос OVAL e деликатен елемент, който съчетава елегантност с ежедневна функция. В банята, на тоалетката, в дневната или антрето, той е перфектен за организиране на дребни вещи и аксесоари, или просто за добавяне на нотка изисканост към помещението.",
  },
  {
    image: "accessory_cutlery_holder_stix.webp",
    name: "Поставка за прибори STIX",
    description: "Ръчно изработени мраморни поставки за прибори от естествен мрамор. Всяка е уникална благодарение на естествените шарки на камъка. Идеални за ежедневна употреба, празнични вечери или стилен подарък.",
  },
  {
    image: "accessory_podnos_mramotray.webp",
    name: "Мраморен поднос MARMOTRAY",
    description: "Кръглият поднос MARMOTRAY е универсален аксесоар, който внася изтънченост на вашата маса за хранене, масичка за кафе или кухненски плот. Издръжлив и проектиран да впечатлява, той е еднакво подходяща както за стилни събирания, така и за тихи моменти у дома - на закрито или открито.",
  },
];

/* ── Extract variation label from filename ── */
function getVariationLabel(filename: string, productSlug: string): string {
  let name = filename.replace(/\.(webp|jpg|jpeg|png)$/i, "");
  const prefix = productSlug.replace(/-/g, "_") + "_";
  if (name.startsWith(prefix)) {
    name = name.substring(prefix.length);
  }
  name = name.replace(/^cover_/, "");
  name = name.replace(/_(\d+)$/, " $1");
  return name
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ── Get non-cover variation images ── */
function getVariations(
  product: Product
): { filename: string; label: string }[] {
  if (!product.galleryImages) return [];
  return product.galleryImages
    .filter(
      (img) =>
        !img.toLowerCase().includes("cover") && img !== product.image
    )
    .map((img) => ({
      filename: img,
      label: getVariationLabel(img, product.slug),
    }));
}

/* ── Parse sizes into table-top and height dimensions ── */
function parseDimensions(sizes: SizeOption[]): {
  tableTops: string[];
  heights: string[];
} {
  const tableTops: string[] = [];
  const heightSet = new Set<string>();

  for (const size of sizes) {
    const dim = size.dimensions;

    // "d 100 x h 74 cm" → table top: "d 100 cm", height: "h 74 cm"
    if (/x\s*h\s/.test(dim)) {
      const parts = dim.split(/\s*x\s*h\s*/);
      tableTops.push(parts[0].trim() + " cm");
      heightSet.add("h " + parts[1].trim());
      continue;
    }

    // "100 x 20 x h 77 cm" → already has explicit h
    if (/x h\s/.test(dim)) {
      const match = dim.match(/^(.+?)\s*x\s*h\s*(.+)$/);
      if (match) {
        tableTops.push(match[1].trim() + " cm");
        heightSet.add("h " + match[2].trim());
      }
      continue;
    }

    // Count 'x' separators (ignoring diameter d)
    const cleaned = dim.replace(" cm", "");
    const parts = cleaned.split(/\s*x\s*/);

    if (parts.length >= 3 && !dim.includes("+")) {
      // "95 x 75 x 33 cm" → top: "95 x 75 cm", height: "h 33 cm"
      const lastPart = parts[parts.length - 1].trim();
      // For 4-part dims like "80 x 80 x 113 x 40" keep last as height
      tableTops.push(
        parts.slice(0, parts.length - 1).join(" x ") + " cm"
      );
      heightSet.add("h " + lastPart + " cm");
    } else {
      // "100 x 60 cm", "d 70 cm", "d 60 + d 40 cm" → just table top
      tableTops.push(dim);
    }
  }

  // Deduplicate table tops
  const uniqueTops = [...new Set(tableTops)];
  const heights = [...heightSet];

  return { tableTops: uniqueTops, heights };
}

/* ── Mobile product layout: name → cover → info → variants (expandable) ── */
function MobileProductLayout({
  product,
  showSectionTitle,
  isFirstInCategory,
  detailsBlock,
  allVariations,
  t,
  tc,
}: {
  product: Product;
  showSectionTitle?: boolean;
  isFirstInCategory?: boolean;
  detailsBlock: React.ReactNode;
  allVariations: { filename: string; label: string }[];
  t: ReturnType<typeof useTranslations>;
  tc: ReturnType<typeof useTranslations>;
}) {
  const [showAllVariants, setShowAllVariants] = useState(false);
  const firstVariation = allVariations[0] || null;
  const restVariations = allVariations.slice(1);
  const hasMore = restVariations.length > 0;

  return (
    <div className="md:hidden">
      {/* Header: section title + category + product name */}
      <div className="bg-white px-4 pt-10 pb-4">
        {showSectionTitle && (
          <div className="flex justify-center mb-10">
            <h2 className="text-3xl font-extralight tracking-[0.15em] uppercase text-foreground leading-none select-none">
              {t("title")}
            </h2>
          </div>
        )}

        {/* Category label — only first in category on mobile */}
        {isFirstInCategory && (
          <div className="inline-block mb-4">
            <p className="text-[11px] tracking-[0.2em] uppercase text-foreground font-medium mb-1.5">
              {tc(product.category)}
            </p>
            <div className="w-full h-[1px] bg-foreground/70" />
          </div>
        )}

        {/* Product Name */}
        <h3 className="text-sm tracking-[0.08em] uppercase leading-relaxed">
          <span className="font-extralight">{t(`productPrefix.${product.category}`)} </span>
          <span className="font-semibold">{product.name}</span>
        </h3>
      </div>

      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <SupabaseImage
          src={getImageUrl(product.image)}
          alt={product.name}
          fill
          className={`${product.coverContain ? "object-contain" : "object-cover"}`}
          sizes="100vw"
        />
      </div>

      {/* Info: sizes, description, store button */}
      <div className="bg-white px-4 py-5">
        {detailsBlock}
      </div>

      {/* Variants section */}
      {(firstVariation || allVariations.length === 0) && (
        <div className="bg-white px-4 pb-6">
          {/* Variants label */}
          {allVariations.length > 0 && (
            <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-3">
              {t("availableStones")}
            </p>
          )}

          {/* First variant always visible */}
          {firstVariation && (
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <SupabaseImage
                  src={getImageUrl(firstVariation.filename)}
                  alt={`${product.name} – ${firstVariation.label}`}
                  fill
                  className="object-contain object-center"
                  sizes="100vw"
                />
              </div>
              <p className="text-xs tracking-[0.08em] text-foreground/75 mt-1.5">
                {firstVariation.label}
              </p>
            </div>
          )}

          {/* Expanded variants */}
          {showAllVariants && restVariations.map((v) => (
            <div key={v.filename} className="mt-4">
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <SupabaseImage
                  src={getImageUrl(v.filename)}
                  alt={`${product.name} – ${v.label}`}
                  fill
                  className="object-contain object-center"
                  sizes="100vw"
                />
              </div>
              <p className="text-xs tracking-[0.08em] text-foreground/75 mt-1.5">
                {v.label}
              </p>
            </div>
          ))}

          {/* See all variants button */}
          {hasMore && !showAllVariants && (
            <button
              onClick={() => setShowAllVariants(true)}
              className="mt-4 text-[10px] tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground transition-colors border-b border-foreground/30 pb-0.5"
            >
              Виж всички варианти ({allVariations.length})
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Single product spread — two-page print catalogue style ── */
function ProductSpread({ product, showSectionTitle, isFirstInCategory }: { product: Product; showSectionTitle?: boolean; isFirstInCategory?: boolean }) {
  const t = useTranslations("products");
  const tc = useTranslations("categories");

  const variations = getVariations(product);
  const firstThree = variations.slice(0, 3);
  const fourthVariation = variations[3] || null;

  const getDesc = (key: string): string => {
    try {
      const fullKey = `${product.slug}.${key}`;
      return t.has(fullKey) ? t(fullKey) : "";
    } catch {
      return "";
    }
  };

  const description = getDesc("description");
  const description2 = getDesc("description2");
  const description3 = getDesc("description3");
  const fullDescription = [description, description2, description3]
    .filter(Boolean)
    .join(" ");

  const { tableTops, heights } = parseDimensions(product.sizes);
  const productPrefix = t(`productPrefix.${product.category}`);

  /* Product name block */
  const nameBlock = (
    <h3 className="text-sm lg:text-base tracking-[0.08em] uppercase mb-8 leading-relaxed">
      <span className="font-extralight">{productPrefix} </span>
      <span className="font-semibold">{product.name}</span>
    </h3>
  );

  /* Details block (sizes, description, store link) — no name */
  const detailsBlock = (
    <>
      {/* Table top sizes */}
      {tableTops.length > 0 && (
        <div className="mb-2">
          <p className="text-xs text-foreground/80 tracking-wide">
            <span className="font-semibold">{t("tableTop")}:</span>{" "}
            {tableTops.join(" | ")}
          </p>
        </div>
      )}

      {/* Heights */}
      {heights.length > 0 && (
        <div className="mb-2">
          <p className="text-xs text-foreground/80 tracking-wide">
            <span className="font-semibold">{t("height")}:</span>{" "}
            {heights.join(" | ")}
          </p>
        </div>
      )}

      {/* Base colors */}
      {product.baseColors && product.baseColors.length > 0 && (
        <div className="mb-2">
          <p className="text-xs text-foreground/80 tracking-wide">
            <span className="font-semibold">{t("baseColor")}:</span>{" "}
            {product.baseColors.join(" | ")}
          </p>
        </div>
      )}

      <div className="mb-4" />

      {/* Description */}
      {fullDescription && (
        <p className="text-xs text-foreground/75 leading-[1.9] tracking-wide mb-4">
          {fullDescription.length > 350
            ? fullDescription.substring(0, 350) + "…"
            : fullDescription}
        </p>
      )}

      {/* View in store link */}
      {product.storeUrl && (
        <div className="mb-6">
          <a
            href={product.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline text-[10px] tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition-all duration-300"
          >
            <span className="border-b border-foreground/50 hover:border-foreground pb-0.5">
              {t("viewInStore")} →
            </span>
          </a>
        </div>
      )}
    </>
  );

  /* Combined info block for desktop (name + details) */
  const infoBlock = (
    <>
      {nameBlock}
      {detailsBlock}
    </>
  );

  /* Shared variants block */
  const variantsBlock = (
    <div className="flex flex-col gap-2">
      {firstThree.length > 0 ? (
        firstThree.map((v) => (
          <div key={v.filename}>
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              <SupabaseImage
                src={getImageUrl(v.filename)}
                alt={`${product.name} – ${v.label}`}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <p className="text-xs tracking-[0.08em] text-foreground/75 mt-1.5">
              {v.label}
            </p>
          </div>
        ))
      ) : (
        <div>
          <div className="relative aspect-[4/3] overflow-hidden bg-white">
            <SupabaseImage
              src={getImageUrl(product.image)}
              alt={product.name}
              fill
              className="object-contain object-center"
              sizes="25vw"
            />
          </div>
          <p className="text-xs tracking-[0.08em] text-foreground/75 mt-1.5">
            {product.name}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="block group">
      {/* ── MOBILE LAYOUT: name → cover → info/button → variants ── */}
      <MobileProductLayout
        product={product}
        showSectionTitle={showSectionTitle}
        isFirstInCategory={isFirstInCategory}
        detailsBlock={detailsBlock}
        allVariations={variations}
        t={t}
        tc={tc}
      />

      {/* ── DESKTOP LAYOUT: cover left, details right (unchanged) ── */}
      <div className="hidden md:grid grid-cols-2 min-h-[50vh] md:min-h-[70vh]">
        {/* ── LEFT HALF: Cover image — full bleed ── */}
        <div className="relative min-h-full overflow-hidden bg-white">
          <SupabaseImage
            src={getImageUrl(product.image)}
            alt={product.name}
            fill
            className={`${product.coverContain ? "object-contain" : "object-cover"} transition-transform duration-1000 group-hover:scale-[1.02]`}
            sizes="50vw"
          />
        </div>

        {/* ── RIGHT HALF: Two-column details ── */}
        <div className="bg-white p-6 lg:p-8 xl:p-10 flex items-center">
          <div className="w-full">
            {/* Section title — only on first product */}
            {showSectionTitle && (
              <div className="flex justify-end mb-10">
                <h2 className="text-4xl lg:text-5xl font-extralight tracking-[0.15em] uppercase text-foreground leading-none select-none">
                  {t("title")}
                </h2>
              </div>
            )}

            {/* Category label */}
            <div className="inline-block mb-10">
              <p className="text-base tracking-[0.3em] uppercase text-foreground font-medium mb-2">
                {tc(product.category)}
              </p>
              <div className="w-full h-[1.5px] bg-foreground/80" />
            </div>

            <div className="grid grid-cols-2 gap-6 lg:gap-10">
              {/* ── Sub-column 1: Variation images ── */}
              {variantsBlock}

              {/* ── Sub-column 2: Name, sizes, description, 4th variation ── */}
              <div className="flex flex-col">
                {infoBlock}

                {/* 4th variation — under description */}
                {fourthVariation && (
                  <div className="mt-auto pt-4">
                    <div className="relative aspect-[4/3] overflow-hidden bg-white">
                      <SupabaseImage
                        src={getImageUrl(fourthVariation.filename)}
                        alt={`${product.name} – ${fourthVariation.label}`}
                        fill
                        className="object-contain object-center"
                        sizes="25vw"
                      />
                    </div>
                    <p className="text-xs tracking-[0.08em] text-foreground/75 mt-1.5">
                      {fourthVariation.label}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Accessories spread — mobile: no cover + spacing; desktop: original cover layout ── */
function AccessoriesSpread() {
  const tc = useTranslations("categories");
  const t = useTranslations("products");

  return (
    <div className="block">
      {/* ── MOBILE LAYOUT: no cover, items stacked with spacing ── */}
      <div className="md:hidden px-4 py-16">
        {/* Category label with underline */}
        <div className="inline-block mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-foreground font-medium mb-2">
            {tc("accessories")}
          </p>
          <div className="w-full h-[1.5px] bg-foreground/80" />
        </div>

        <div className="flex flex-col gap-14">
          {accessories.map((item) => (
            <div key={item.name} className="flex flex-col gap-4">
              <div className="relative w-full aspect-square overflow-hidden bg-white">
                <SupabaseImage
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div>
                <h4 className="text-xs tracking-[0.08em] font-semibold mb-2">
                  {item.name}
                </h4>
                <p className="text-xs text-foreground/75 leading-[1.9] tracking-wide">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* View accessories in store */}
          <div className="mt-4">
            <a
              href="https://marbelladd.com/collections/accessories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline text-[10px] tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition-all duration-300"
            >
              <span className="border-b border-foreground/50 hover:border-foreground pb-0.5">
                {t("viewInStore")} →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT: original cover left + items right ── */}
      <div className="hidden md:grid grid-cols-2 min-h-[70vh]">
        {/* Cover image */}
        <div className="relative min-h-full overflow-hidden bg-white">
          <SupabaseImage
            src={getImageUrl("accessories_cover_podnos_oval.webp")}
            alt="Marbella Accessories"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>

        {/* Category label + variants */}
        <div className="bg-white p-6 lg:p-8 xl:p-10 flex items-center">
          <div className="w-full">
            <div className="inline-block mb-10">
              <p className="text-base tracking-[0.3em] uppercase text-foreground font-medium mb-2">
                {tc("accessories")}
              </p>
              <div className="w-full h-[1.5px] bg-foreground/80" />
            </div>

            <div className="flex flex-col gap-8">
              {accessories.map((item) => (
                <div key={item.name} className="flex flex-row gap-4">
                  <div className="relative w-44 h-44 flex-shrink-0 overflow-hidden bg-white">
                    <SupabaseImage
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      fill
                      className="object-contain object-center"
                      sizes="150px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="text-xs tracking-[0.08em] font-semibold mb-2">
                      {item.name}
                    </h4>
                    <p className="text-xs text-foreground/75 leading-[1.9] tracking-wide">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <a
                  href="https://marbelladd.com/collections/accessories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline text-[10px] tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition-all duration-300"
                >
                  <span className="border-b border-foreground/50 hover:border-foreground pb-0.5">
                    {t("viewInStore")} →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Products Section ── */
export default function ProductsSection() {
  const t = useTranslations("products");

  return (
    <section id="products" className="bg-white">
      {categories.map((cat, catIdx) => {
        const catProducts = getProductsByCategory(cat);
        if (catProducts.length === 0) return null;

        return (
          <div key={cat} className="mt-16 md:mt-24 first:mt-0">
            <div className="space-y-16 md:space-y-24">
              {catProducts.map((product, prodIdx) => (
                <ProductSpread
                  key={product.slug}
                  product={product}
                  showSectionTitle={catIdx === 0 && prodIdx === 0}
                  isFirstInCategory={prodIdx === 0}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* ── Accessories — single spread ── */}
      <div className="mt-16 md:mt-24">
        <AccessoriesSpread />
      </div>

      {/* Bottom spacing before next section */}
      <div className="h-20 md:h-32" />
    </section>
  );
}
