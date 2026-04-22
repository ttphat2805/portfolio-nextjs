import { createClient } from "next-sanity";
// ✅ Named export — default export deprecated in @sanity/image-url v2
import { createImageUrlBuilder } from "@sanity/image-url";


export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2022-11-15",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

/**
 * urlFor — builds a Sanity image URL from a source reference.
 * Uses named export (default was deprecated in @sanity/image-url v2).
 */
export const urlFor = (source: Image | undefined) => {
  return createImageUrlBuilder(config).image(source as Image);
};
