import { HeaderComponentCMSProps, HeaderComponentProps } from "./HeaderTypes";

export class HeaderModel {
  static getProps({ logo, navigation_menu, title }: HeaderComponentCMSProps): HeaderComponentProps {
    return {
        logo: logo.url || 'Logo',
        navigation_menu: navigation_menu,
        title: title || 'Default title'
    }
  }
}
