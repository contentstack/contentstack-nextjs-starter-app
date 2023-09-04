type LogoType = {
    filename: string,
    title: string,
    url: string
}

export type NavigationMenuType = {
    nav_item_label: string,
    nav_item_url: string
}

export type HeaderComponentProps = {
    logo: string,
    navigation_menu: NavigationMenuType[],
    title: string
}

export type HeaderComponentCMSProps = {
    logo: LogoType,
    navigation_menu: NavigationMenuType[],
    title: string
}
