import { addEditableTags } from "@contentstack/utils";
import { Page, BlogPosts } from "../typescript/pages";
import { FooterProps, HeaderProps } from "../typescript/layout";
import { getEntry, getEntryByUrl } from "../contentstack-sdk";
import { cache } from "react";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getHeaderRes = cache(async (): Promise<HeaderProps> => {
  try {
    const response = (await getEntry({
      contentTypeUid: "header",
      referenceFieldPath: ["navigation_menu.page_reference"],
      jsonRtePath: ["notification_bar.announcement_text"],
    })) as HeaderProps[][];

    if (!response?.[0]?.[0]) {
      throw new Error("Failed to fetch header data");
    }

    liveEdit && addEditableTags(response[0][0], "header", true);
    return response[0][0];
  } catch (error) {
    console.error("Error fetching header data:", error);
    return {} as HeaderProps;
  }
});

export const getFooterRes = cache(async (): Promise<FooterProps> => {
  try {
    const response = (await getEntry({
      contentTypeUid: "footer",
      referenceFieldPath: undefined,
      jsonRtePath: ["copyright"],
    })) as FooterProps[][];
    
    if (!response?.[0]?.[0]) {
      throw new Error("Failed to fetch footer data");
    }
    
    liveEdit && addEditableTags(response[0][0], "footer", true);
    return response[0][0];
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return {} as FooterProps;
  }
});

export const getAllEntries = cache(async (): Promise<Page[]> => {
  try {
    const response = (await getEntry({
      contentTypeUid: "page",
      referenceFieldPath: undefined,
      jsonRtePath: undefined,
    })) as Page[][];
    
    if (!response?.[0]) {
      throw new Error("Failed to fetch page entries");
    }
    
    liveEdit &&
      response[0].forEach((entry) => addEditableTags(entry, "page", true));
    return response[0];
  } catch (error) {
    console.error("Error fetching all entries:", error);
    return [];
  }
});

export const getPageRes = cache(async (entryUrl: string): Promise<Page> => {
  try {
    if (!entryUrl) {
      throw new Error("Invalid entry URL");
    }

    const response = (await getEntryByUrl({
      contentTypeUid: "page",
      entryUrl,
      referenceFieldPath: ["page_components.from_blog.featured_blogs"],
      jsonRtePath: [
        "page_components.from_blog.featured_blogs.body",
        "page_components.section_with_buckets.buckets.description",
        "page_components.section_with_html_code.description",
      ],
    })) as Page[];
    
    if (!response?.[0]) {
      throw new Error(`Failed to fetch page for URL: ${entryUrl}`);
    }
    
    liveEdit && addEditableTags(response[0], "page", true);
    return response[0];
  } catch (error) {
    console.error(`Error fetching page for URL ${entryUrl}:`, error);
    throw error;
  }
});

export const getBlogListRes = cache(async (): Promise<BlogPosts[]> => {
  try {
    const response = (await getEntry({
      contentTypeUid: "blog_post",
      referenceFieldPath: ["author", "related_post"],
      jsonRtePath: ["body"],
    })) as BlogPosts[][];
    
    if (!response?.[0]) {
      throw new Error("Failed to fetch blog posts");
    }
    
    liveEdit &&
      response[0].forEach((entry) => addEditableTags(entry, "blog_post", true));
    return response[0];
  } catch (error) {
    console.error("Error fetching blog list:", error);
    return [];
  }
});

export const getBlogPostRes = cache(async (entryUrl: string): Promise<BlogPosts> => {
  try {
    if (!entryUrl) {
      throw new Error("Invalid blog entry URL");
    }

    const response = (await getEntryByUrl({
      contentTypeUid: "blog_post",
      entryUrl,
      referenceFieldPath: ["author", "related_post"],
      jsonRtePath: ["body", "related_post.body"],
    })) as BlogPosts[];
    
    if (!response?.[0]) {
      throw new Error(`Failed to fetch blog post for URL: ${entryUrl}`);
    }
    
    liveEdit && addEditableTags(response[0], "blog_post", true);
    return response[0];
  } catch (error) {
    console.error(`Error fetching blog post for URL ${entryUrl}:`, error);
    throw error;
  }
});


export const isEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;
  
  if (!obj1 || !obj2 || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  return keys1.every(key => {
    if (!keys2.includes(key)) return false;
    
    const val1 = obj1[key];
    const val2 = obj2[key];
    
    if (typeof val1 === 'object' && typeof val2 === 'object') {
      return isEqual(val1, val2);
    }
    
    return val1 === val2;
  });
};