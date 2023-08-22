import { CMSHeroProps, HeroComponentProps } from "./HeroTypes";

export class HeroModel {
  static getProps(props: CMSHeroProps): HeroComponentProps {
    const { title } = props;

    return {
      title: title || 'asdasd',
      flag: this.getFlag()
    }
  }

  static getFlag() {
    return true
  }
}