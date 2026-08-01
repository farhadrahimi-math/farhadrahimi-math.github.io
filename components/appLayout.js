import { createNavbar } from "./navbar.js";
import { createDrawer } from "./drawer/drawer.js";
import { initIcons } from "./icons.js";

export function createAppLayout({

    title = "داشبورد",

    content = "",

    profile = null,

    showBack = false

}) {

    const html = `

        <div class="app-layout">

            ${createNavbar({
                title,
                showBack,
                showMenu: true
            })}

            ${profile ? createDrawer(profile) : ""}

            <main class="app-main">

                ${content}

            </main>

        </div>

    `;

    requestAnimationFrame(() => {
        initIcons();
    });

    return html;

}
