import React from "react";

import { HeaderComponentProps } from '../HeaderTypes';
import HeaderNavbar from '../molecules/HeaderNavbar';

function HeaderComponent({ logo, navigation_menu, title }: HeaderComponentProps): JSX.Element {
    return (
        <div className="page-header">
            <div className="page-header__logo">
                <img className="page-header__logo-img" src={logo} alt={title} />
            </div>
            <div className="page-header__navbar">
                <ul className="navbar">
                    { navigation_menu.map(menuItem => <HeaderNavbar {...menuItem} key={menuItem.nav_item_label} />) }
                </ul>
            </div>
        </div>
    )
}

export default HeaderComponent;
