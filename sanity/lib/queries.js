import { sanityClient } from "./client";
import { cache } from "react";

export const getLandingPage = cache(async () => {
  let result = [];
  try {
    const data = await sanityClient.fetch(
      `*[_type == "landingPage"] {
        bannerTitle,
        bannerDescription,
        poster
    } | order(priority desc)`
    );
    result = data;
  } finally {
    return result;
  }
});

export const getHeaderPage = cache(async () => {
  let result = [];
  try {
    const data = await sanityClient.fetch(
      `*[_type == "headerComponent"] {
        headerCompanyName,
        headerIcon,
        headerNavLineOne,
        headerNavLineSecond
    } | order(priority desc)`
    );
    result = data;
  } finally {
    return result;
  }
});

export const getBlogPage = cache(async (limit) => {
  let result = [];
  try {
    const data = await sanityClient.fetch(
      `*[_type == "blogPage"][0...${limit}] {
        blogId,
        blogTitle,
        blogDescription,
        "blogImage": blogImage.asset->url,
    } | order(priority desc)`
    );
    result = data;
  } finally {
    return result;
  }
});

export const getBlogById = cache(async (blogId) => {
  let result = null;
  try {
    const data = await sanityClient.fetch(
      `*[_type == "blogPage" && blogId == $blogId][0] {
        blogId,
        blogTitle,
        blogDescription,
        "blogImage": blogImage.asset->url,
      }`,
      { blogId }
    );
    result = data;
  } catch (error) {
    console.error("Failed to fetch blog data:", error);
  } finally {
    return result;
  }
});

export const fetchBlogs = async (limit = 10) => {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "blogPost"][0...${limit}] {
        _id,
        title,
        slug {
          current
        },
        publishedAt,
        author-> {
          _id,
          name,
          bio,
          image
        },
        mainImage {
          asset-> {
            url
          },
          alt
        },
        categories[]-> {
          _id,
          title
        },
        tags,
        body,
        excerpt,
        seo {
          metaTitle,
          metaDescription,
          metaKeywords
        }
      } | order(publishedAt desc)`
    );
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const getBlogPostBySlug = async (slug) => {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        title,
        slug {
          current
        },
        publishedAt,
        author-> {
          _id,
          name,
          bio,
          image
        },
        mainImage {
          asset-> {
            url
          },
          alt
        },
        categories[]-> {
          _id,
          title
        },
        tags,
        body,
        excerpt,
        seo {
          metaTitle,
          metaDescription,
          metaKeywords
        }
      }`,
      { slug }
    );
    return data;
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
};

export const fetchJsTutorials = async (limit = 10) => {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "jsPost"][0...${limit}] {
        _id,
        title,
        slug {
          current
        },
        publishedAt,
        author-> {
          _id,
          name,
          bio,
          image
        },
        mainImage {
          asset-> {
            url
          },
          alt
        },
        categories[]-> {
          _id,
          title
        },
        tags,
        body,
        excerpt,
        seo {
          metaTitle,
          metaDescription,
          metaKeywords
        }
      } | order(publishedAt desc)`
    );
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const getJsTutorialPostBySlug = async (slug) => {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "jsPost" && slug.current == $slug][0] {
        _id,
        title,
        slug {
          current
        },
        publishedAt,
        author-> {
          _id,
          name,
          bio,
          image
        },
        mainImage {
          asset-> {
            url
          },
          alt
        },
        categories[]-> {
          _id,
          title
        },
        tags,
        body[],
        excerpt,
        seo {
          metaTitle,
          metaDescription,
          metaKeywords
        }
      }`,
      { slug }
    );
    return data;
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
};
