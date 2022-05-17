import { Image, Action } from "../typescript/action";

type Object = {
  banner_title: string;
  banner_description: string;
}

type Banner = {
  bg_color: string;
  text_color: string;
  banner_title: string;
  banner_description: string;
  call_to_action: Action;
  banner_image: Image;
  $: Object;
}

export type BannerProps = {
  banner: Banner;
}