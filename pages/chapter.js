import { createAppLayout } from "../components/appLayout.js";

import { getRoute } from "../utils/navigation.js";

import { chapters } from "../config/chapters.js";

import { getProfile } from "../store/appStore.js";

import { initializeLayout } from "../core/layout.js";

export async function renderChapter() {

    const { params } = getRoute();

    const grade = Number(params.grade);

    const chapter = Number(params.chapter);

    const profile = getProfile();

    const title =
        chapters[grade]?.[chapter - 1] || "فصل";

    const content = `

        <div class="chapter-page">

            <h2>${title}</h2>

            <p>

                پایه ${grade}

            </p>

            <hr>

            <p>

                شماره فصل: ${chapter}

            </p>

            <br>

            <h3>🎮 بازی‌های آموزشی</h3>

            <p>به زودی...</p>

            <br>

            <h3>📝 آزمون‌ها</h3>

            <p>به زودی...</p>

        </div>

    `;

    document.getElementById("app").innerHTML =
        createAppLayout({

            title,

            content,

            profile,

            showBack: true

        });

    initializeLayout();

}
