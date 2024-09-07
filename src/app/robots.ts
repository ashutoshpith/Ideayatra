import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ideayatra.com/sitemap.xml",
    host: "https://ideayatra.com/",
  };
}
