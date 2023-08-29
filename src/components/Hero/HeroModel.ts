import { CMSHeroProps, HeroComponentProps } from "./HeroTypes";

export class HeroModel {
  static getProps(props: CMSHeroProps): HeroComponentProps {
    const { heading, description, url, cta_text } = props;

    return {
      title: heading || 'default title',
      description,
      url,
      cta_text
    }
  }
}