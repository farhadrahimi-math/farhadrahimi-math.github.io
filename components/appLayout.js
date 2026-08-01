import { createNavbar } from "./navbar.js";
import { initIcons } from "./icons.js";

export function createAppLayout(content, title = "داشبورد") {

    const html = `

        <div class="app-layout">

            ${createNavbar(title)}

            <main class="app-main">

                ${content}

            </main>

        </div>

    `;

    setTimeout(() => {
        initIcons();
    }, 0);

    return html;

}
