import path from "path";
import fs from "fs";
import { Data } from "@/types/data";
import { BlogMetadata } from "@/types/blog";

function isBlogHeaderData(data: any): data is BlogMetadata {
  return (
    typeof data.title === "string" &&
    typeof data.description === "string" &&
    typeof data.isPublished === "boolean" &&
    typeof data.slug === "string" &&
    typeof data.publishDate === "string" // or Date if you use Date
  );
}

export async function getJSONData(): Promise<Data> {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const file = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(file);
}

export async function getBlogPosts(): Promise<BlogMetadata[]> {
  // Skip MDX blog loading for now (sample posts are unpublished).
  // Dynamic MDX imports were also contributing to slow/hung compiles under
  // macOS EMFILE file-watcher limits during `next dev`.
  return [];
}
