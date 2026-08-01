import { createNavbar } from "./navbar.js";
import { initIcons } from "./icons.js";

export function createLayout(content, title = "باشگاه نخبگان ریاضی") {

    const html = `

        <div class="app-layout">

            ${createNavbar(title)}

            <main class="app-content">

                ${content}

            </main>

            <footer class="app-footer">

                <small>
                    باشگاه نخبگان ریاضی • نسخه 1.0.0
                </small>

            </footer>

        </div>

    `;

    // بعد از رندر، آیکون‌های Lucide را فعال می‌کنیم
    setTimeout(() => initIcons(), 0);

    return html;

}
