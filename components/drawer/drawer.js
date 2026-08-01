import { createDrawerHeader } from "./drawerHeader.js";
import { createDrawerItem } from "./drawerItem.js";

import { getMenuItems } from "../../services/menuService.js";

export function createDrawer(profile) {

    const items = getMenuItems(profile.role);

    return `

        <div id="drawerOverlay" class="drawer-overlay"></div>

        <aside id="drawer" class="drawer">

            ${createDrawerHeader(profile)}

            <div class="drawer-menu">

                ${items.map(item => createDrawerItem(item)).join("")}

            </div>

        </aside>

    `;

}
