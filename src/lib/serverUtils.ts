import { Data } from "@/types/data";
import { BlogMetadata } from "@/types/blog";
import portfolioData from "../../public/data.json";

export async function getJSONData(): Promise<Data> {
  // Import JSON at build time so it works on Cloudflare Workers
  // (no Node.js filesystem at runtime).
  return portfolioData as Data;
}

export async function getBlogPosts(): Promise<BlogMetadata[]> {
  // Sample template blogs are unpublished; skip MDX loading on Workers.
  return [];
}
