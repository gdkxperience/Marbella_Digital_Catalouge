export interface Stone {
  slug: string;
  name: string;
  origin: string;
  image: string; // filename in Supabase "images" bucket (root level)
}

export const stones: Stone[] = [
  // Section 1 (cover + 3)
  { slug: "arabescato", name: "Arabescato", origin: "Italy", image: "stone_type_arabescato.webp" },
  { slug: "calacatta-viola", name: "Calacatta Viola", origin: "Italy", image: "stone_type_viola.webp" },
  { slug: "carrara", name: "White Carrara", origin: "Italy", image: "stone_type_carrara.webp" },
  // Section 2 (6)
  { slug: "crema-marfil", name: "Crema Marfil", origin: "Spain", image: "stone_type_carrara.webp" },
  { slug: "brown-emperador", name: "Brown Emperador", origin: "Spain", image: "stone_type_emperador.webp" },
  { slug: "marquina", name: "Nero Marquina", origin: "Spain", image: "stone_type_nero-marquina-slab-2x.webp" },
  { slug: "verde-guatemala", name: "Verde Guatemala", origin: "India", image: "stone_type_Verde-Guatemala-F3125-Full-Slab-scaled.jpg" },
  { slug: "volakas", name: "Volakas", origin: "Greece", image: "stone_type_Volakas.jpg" },
  { slug: "palissandro", name: "Palissandro", origin: "Italy", image: "stone_type_palisandro.webp" },
  // Section 3 (6)
  { slug: "sea-wave", name: "Sea Wave", origin: "India", image: "stone_type_sea_wave.webp" },
  { slug: "panda-white", name: "Panda White", origin: "China", image: "stone_type_panda-white-marble-india-322.webp" },
  { slug: "rainforest-brown", name: "Rainforest Brown", origin: "India", image: "stone_type_rainforest-green-marble_1.jpg" },
  { slug: "tiffany", name: "Tiffany (Cristallo Tiffany)", origin: "India", image: "stone_type_tiffany_ocean.jpg" },
  { slug: "red-jasper", name: "Red Jasper", origin: "India", image: "stone_type_red_jasper.webp" },
  { slug: "statuario", name: "Statuario", origin: "Italy", image: "stone_type_saturieto.webp" },
  // Section 4 (6)
  { slug: "marmo-blue", name: "Marmo Blue", origin: "Brazil", image: "stone_type_marmo_blue.webp" },
  { slug: "calacatta-gold", name: "Calacatta Gold", origin: "Italy", image: "stone_type_arabescato.webp" },
  { slug: "bottocino", name: "Bottocino", origin: "Italy", image: "stone_type_bottocino.webp" },
  { slug: "katrin", name: "Katrin", origin: "Turkey", image: "stone_type_katrin.webp" },
  { slug: "galaxy-granite", name: "Galaxy Granite", origin: "India", image: "stone_type_galaxy_granite.webp" },
  { slug: "galala", name: "Galala", origin: "Egypt", image: "stone_type_galala.webp" },
];

export function getStoneBySlug(slug: string): Stone | undefined {
  return stones.find((s) => s.slug === slug);
}
