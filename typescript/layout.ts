import { Image } from "./action";
import { Component } from "../typescript/component";

type Object = {
  title: {};
  copyright: string;
  announcement_text: string;
  label: {};
  url: string;
}

type EntryData = {
  title: string;
  url: string;
  $: Object;
}

type Announcement = {
  show_announcement: boolean;
  announcement_text: string;
  $: Object;
}

type PageRef = {
  url: string;
  $: Object;
}

type List = {
  label: string;
  page_reference: [PageRef];
  $: Object;
}

type Share = {
  link: Links;
  icon: Image
}

type Social = {
  social_share: [Share];
}

type Navigation = {
  link: [Links];
}

type Author = {
  title: string;
  $: Object;
}

type Blog = {
  url: string;
  body: string;
  title: string;
  $: Object;
}

export type Posts = {
  locale: string;
  author: [Author];
  body: string;
  date: string;
  featured_image: {};
  is_archived: boolean;
  related_post: [Blog];
  seo: {};
  url:string;
  title: string;
  _owner: {}
}

export type HeaderProps = {
  locale:string;
  logo: Image;
  navigation_menu:[List]
  notification_bar: Announcement
  title: string;
  uid: string;
}

export type Entry = [
  entry: EntryData
]

export type Links = {
  label: string;
  title: string;
  href: string;
  $:Object;
}

export type PageProps = {
  locale: string;
  page_components: Component[];
  uid: string;
  url: string;
  title: string;
  seo: {};
}

export type FooterProps = {
  logo: Image;
  title: string;
  social: Social;
  navigation: Navigation;
  copyright: string;
  $: Object;
}

export type ChilderenProps = {
  props: {};
  type: Function;
}