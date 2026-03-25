import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

const isConfigured =
  supabaseUrl.length > 0 &&
  !supabaseUrl.includes("YOUR_PROJECT_REF") &&
  supabaseKey.length > 0;

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "images";

// Placeholder SVG data URI for when Supabase isn't configured yet
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%23f5f3f0'%3E%3Crect width='800' height='600'/%3E%3Ctext x='400' y='300' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif' font-size='14' fill='%23a3a3a3'%3EImage%3C/text%3E%3C/svg%3E";

/**
 * Get a public URL for an image stored in the Supabase bucket.
 * All paths should include the file extension (e.g. "zazu_cover.jpeg").
 * Files are at root level in the bucket.
 */
export function getImageUrl(path: string): string {
  if (!isConfigured || !supabase || !path) return PLACEHOLDER;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Get image URL for stone swatches — same as getImageUrl.
 * Square cropping is handled via CSS object-cover on the component.
 */
export function getStoneImageUrl(path: string, _size = 400): string {
  return getImageUrl(path);
}
