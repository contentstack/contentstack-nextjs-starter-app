import React from "react";

import { NavigationMenuType } from '../HeaderTypes';

function HeaderNavbar({nav_item_label, nav_item_url}: NavigationMenuType): JSX.Element {
    return (
        <li className="navbar__item">
            <a className="navbar__link" href={nav_item_url}>{nav_item_label}</a>
        </li>
    )
}

export default HeaderNavbar;
