import { createAppLayout } from "../components/appLayout.js";

import { createHeroCard } from "../components/heroCard.js";
import { createStatsCard } from "../components/dashboard/statsCard.js";
import { createChapterList } from "../components/dashboard/chapterList.js";

import { getDashboardData } from "../services/dashboardService.js";

import { initializeLayout } from "../core/layout.js";

import { navigate } from "../utils/navigation.js";

export async function renderDashboard() {

    const data = await getDashboardData();

    if (!data) return;

    const hero = createHeroCard({

        title: `سلام ${data.profile.name} 👋`,

        subtitle: `🎓 ${data.profile.grade === 7
            ? "پایه هفتم"
            : data.profile.grade === 8
            ? "پایه هشتم"
            : "پایه نهم"}`,

        progress: 0

    });

    const content = `

        ${hero}

        ${createStatsCard(data.stats)}

        ${createChapterList(
            data.profile.grade,
            data.chapters
        )}

    `;

    document.getElementById("app").innerHTML =
        createAppLayout({

            title: "داشبورد",

            content,

            profile: data.profile,

            showBack: false

        });

    initializeLayout();

    bindDashboardEvents();

}

function bindDashboardEvents() {

    document
        .querySelectorAll(".chapter-card")
        .forEach(card => {

            card.addEventListener("click", () => {

                navigate("chapter", {

                    grade: Number(card.dataset.grade),

                    chapter: Number(card.dataset.chapter)

                });

            });

        });

}
