import { Image } from "./action";

type Object = {
    banner_title:string;
    banner_description: string;
    title: {};
    title_h2: string;
    body: string;
    date: string;
  }

type Author = {
    title: string;
    $: Object;
  }

type Article = {
    href: string;
    title: string;
    $: Object;
  }
  
type FeaturedBlog = {
    title: string;
    featured_image: Image;
    body: string;
    url: string;
    $: Object;
  }

type FeaturedBlogData = {
    title_h2: string;
    view_articles: Article;
    featured_blogs: [FeaturedBlog]
    $: Object;
  }
  
export type BannerProps = {
    banner_title:string;
    banner_description: string;
    bg_color: string;
    $: Object;
  }

export type BloglistProps = {
    body: string;
    url: string;
    featured_image: Image; 
    title: string;
    date: string;
    author: [Author];
    $: Object;
  }

export type FeaturedBlogProps = {
  fromBlog: FeaturedBlogData;
  }