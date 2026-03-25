export type ProductCategory = "coffee-tables" | "dining-tables" | "auxiliary-tables" | "accessories";

export interface SizeOption {
  label: string;
  dimensions: string;
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  sizes: SizeOption[];
  stones: string[];
  baseColors?: string[];
  storeUrl?: string;
  image: string; // filename in Supabase "images" bucket (root level)
  galleryImages?: string[];
  coverContain?: boolean; // use object-contain instead of object-cover for cover
}

export const products: Product[] = [
  // ── Coffee Tables ──
  {
    slug: "zazu",
    name: "ZAZU",
    category: "coffee-tables",
    sizes: [
      { label: "100 × 60", dimensions: "100 x 60 cm" },
      { label: "120 × 60", dimensions: "120 x 60 cm" },
    ],
    stones: ["red-jasper", "calacatta-viola", "marquina", "carrara"],
    image: "zazu_cover_calacatta_viola.jpeg",
    galleryImages: [
      "zazu_cover_calacatta_viola.jpeg",
      "zazu_red_jasper.webp",
      "zazu_calacatta_viola.webp",
      "zazu_marquina.webp",
      "zazu_carrara.webp",
    ],
  },
  {
    slug: "bettula",
    name: "BETTULA",
    category: "coffee-tables",
    sizes: [
      { label: "95 × 75 × 33", dimensions: "95 x 75 x 33 cm" },
      { label: "75 × 60 × 33", dimensions: "75 x 60 x 33 cm" },
      { label: "95 × 75 × 38", dimensions: "95 x 75 x 38 cm" },
      { label: "75 × 60 × 38", dimensions: "75 x 60 x 38 cm" },
    ],
    stones: ["red-jasper", "calacatta-viola", "marquina", "carrara"],
    baseColors: ["Black", "Bronze", "Gold"],
    image: "bettula_cover_red_jasper.jpg",
    galleryImages: [
      "bettula_cover_red_jasper.jpg",
      "bettula_calacatta_viola.webp",
      "bettula_carrara.webp",
      "bettula_red_jasper.webp",
    ],
  },
  {
    slug: "nayra",
    name: "NAYRA",
    category: "coffee-tables",
    sizes: [
      { label: "100 × 60", dimensions: "100 x 60 cm" },
      { label: "120 × 60", dimensions: "120 x 60 cm" },
    ],
    stones: ["red-jasper", "calacatta-viola", "marquina", "carrara"],
    image: "nayra_cover_marquina.webp",
    galleryImages: [
      "nayra_cover_marquina.webp",
      "nayra_calacatta_viola.webp",
      "nayra_carrara.webp",
      "nayra_marquina.webp",
    ],
  },
  {
    slug: "oslo",
    name: "OSLO",
    category: "coffee-tables",
    sizes: [
      { label: "d 70", dimensions: "d 70 cm" },
      { label: "d 80", dimensions: "d 80 cm" },
      { label: "d 90", dimensions: "d 90 cm" },
      { label: "d 100", dimensions: "d 100 cm" },
    ],
    stones: ["galala", "mugla"],
    image: "oslo_cover_galala.webp",
    galleryImages: [
      "oslo_cover_galala.webp",
      "oslo_galala.webp",
      "oslo_mugla.webp",
    ],
  },
  {
    slug: "noguchi",
    name: "NOGUCHI",
    category: "coffee-tables",
    sizes: [
      { label: "120 × 90 × 38", dimensions: "120 x 90 x 38 cm" },
    ],
    stones: ["marquina"],
    image: "noguchi_cover.jpeg",
    galleryImages: ["noguchi_cover.jpeg", "noguchi_marquina.webp"],
  },
  {
    slug: "toscana",
    name: "TOSCANA",
    category: "coffee-tables",
    sizes: [
      { label: "d 60 + d 40", dimensions: "d 60 + d 40 cm" },
      { label: "d 70 + d 50", dimensions: "d 70 + d 50 cm" },
      { label: "d 80 + d 60", dimensions: "d 80 + d 60 cm" },
      { label: "d 90 + d 70", dimensions: "d 90 + d 70 cm" },
    ],
    stones: ["steel-gray-granite", "mugla"],
    image: "toscana_cover_steel_gray_granite.jpg",
    galleryImages: [
      "toscana_cover_steel_gray_granite.jpg",
      "toscana_steel_gray_granite_1.webp",
      "toscana_steel_gray_granite_2.webp",
      "toscana_mugla_1.webp",
      "toscana_mugla_2.webp",
    ],
  },
  {
    slug: "milan-triangle",
    name: "MILAN TRIANGLE",
    category: "coffee-tables",
    sizes: [
      { label: "80 × 80 × 113 × 40 / 75 × 75 × 106 × 35", dimensions: "80 x 80 x 113 x 40 cm / 75 x 75 x 106 x 35 cm" },
      { label: "90 × 90 × 127 × 40 / 85 × 85 × 120 × 35", dimensions: "90 x 90 x 127 x 40 cm / 85 x 85 x 120 x 35 cm" },
    ],
    stones: ["white-marble", "galaxy"],
    image: "square_cover_calacatta_viola.webp",
    galleryImages: ["square_cover_calacatta_viola.webp"],
  },
  {
    slug: "square",
    name: "SQUARE",
    category: "coffee-tables",
    sizes: [
      { label: "65 × 65", dimensions: "65 x 65 cm" },
      { label: "80 × 80", dimensions: "80 x 80 cm" },
      { label: "90 × 90", dimensions: "90 x 90 cm" },
    ],
    stones: ["mayra", "calacatta-viola"],
    image: "square_cover_calacatta_viola.webp",
    galleryImages: [
      "square_cover_calacatta_viola.webp",
      "square_calacatta_viola.webp",
      "square_mayra.webp",
    ],
  },

  // ── Dining Tables ──
  {
    slug: "bellissimo",
    name: "BELLISSIMO",
    category: "dining-tables",
    sizes: [
      { label: "185 × 90 × 74", dimensions: "185 x 90 x 74 cm" },
    ],
    stones: ["mugla", "calacatta-viola"],
    image: "belissimo_cover_calacatta_viola.webp",
    galleryImages: ["belissimo_cover_calacatta_viola.webp", "belissimo_calacatta_viola.webp", "belissimo_mugla.webp"],
    coverContain: true,
  },
  {
    slug: "capri",
    name: "CAPRI",
    category: "dining-tables",
    sizes: [
      { label: "160 × 90 × 74", dimensions: "160 x 90 x 74 cm" },
      { label: "180 × 90 × 74", dimensions: "180 x 90 x 74 cm" },
      { label: "200 × 90 × 74", dimensions: "200 x 90 x 74 cm" },
    ],
    stones: ["magma-gold", "mugla"],
    image: "capri_cover_mugla.webp",
    galleryImages: ["capri_cover_mugla.webp", "capri_magma_gold.webp", "capri_mugla.webp"],
  },
  {
    slug: "barcelona",
    name: "BARCELONA",
    category: "dining-tables",
    sizes: [
      { label: "d 100 × h 74", dimensions: "d 100 x h 74 cm" },
      { label: "d 120 × h 74", dimensions: "d 120 x h 74 cm" },
      { label: "d 130 × h 74", dimensions: "d 130 x h 74 cm" },
      { label: "d 140 × h 74", dimensions: "d 140 x h 74 cm" },
    ],
    stones: ["mugla", "galala"],
    image: "barcelona_cover_galala.webp",
    galleryImages: [
      "barcelona_cover_galala.webp",
      "barcelona_mugla.webp",
      "barcelona_galala.webp",
    ],
  },

  // ── Auxiliary Tables ──
  {
    slug: "oval-console",
    name: "OVAL",
    category: "auxiliary-tables",
    sizes: [
      { label: "100 × 20", dimensions: "100 x 20 x h 77 cm" },
      { label: "110 × 25", dimensions: "110 x 25 x h 77 cm" },
      { label: "120 × 35", dimensions: "120 x 35 x h 77 cm" },
    ],
    stones: ["calacatta-viola", "marquina", "red-jasper", "carrara"],
    image: "oval_cover_red_jasper.webp",
    galleryImages: ["oval_cover_red_jasper.webp", "oval_calacatta_viola.webp", "oval_marquina.webp", "oval_red_jasper.webp", "oval_carrara.webp"],
  },
  {
    slug: "line",
    name: "LINE",
    category: "auxiliary-tables",
    sizes: [
      { label: "100 × 100 × 100", dimensions: "100 x 100 x 100 cm" },
    ],
    stones: ["mugla", "galaxy-granite"],
    image: "line_cover_mugla.webp",
    galleryImages: ["line_cover_mugla.webp", "line_galaxy_granite.webp", "line_mugla.webp"],
  },
  {
    slug: "mramor",
    name: "MRAMOR",
    category: "auxiliary-tables",
    sizes: [
      { label: "40 × 30 × 40", dimensions: "40 x 30 x 40 cm" },
    ],
    stones: ["red-jasper", "carrara", "marquina", "calacatta-viola"],
    image: "mramor_cover_calacatta_viola.jpg",
    galleryImages: [
      "mramor_cover_calacatta_viola.jpg",
      "mramor_calacatta_viola.webp",
      "mramor_carrara.webp",
      "mramor_red_jasper.webp",
      "mramor_marquina.webp",
    ],
  },
  {
    slug: "column",
    name: "COLUMN",
    category: "auxiliary-tables",
    sizes: [
      { label: "25 × 25 × 40", dimensions: "25 x 25 x 40 cm" },
      { label: "25 × 25 × 80", dimensions: "25 x 25 x 80 cm" },
      { label: "25 × 25 × 100", dimensions: "25 x 25 x 100 cm" },
      { label: "25 × 25 × 110", dimensions: "25 x 25 x 110 cm" },
    ],
    stones: ["magma-gold", "mugla", "galaxy-granite"],
    image: "column_galaxy_granite.webp",
    galleryImages: ["column_galaxy_granite.webp", "column_mugla.webp", "column_magma_gold.webp", "column_galaxy.webp"],
  },

];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
