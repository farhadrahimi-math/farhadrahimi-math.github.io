import { createAppLayout } from "../components/appLayout.js";
import { createWelcomeCard } from "../components/dashboard/welcomeCard.js";
import { createStatsCard } from "../components/dashboard/statsCard.js";
import { createChapterList } from "../components/dashboard/chapterList.js";

import { getDashboardData } from "../services/dashboardService.js";

import { navigate } from "../utils/navigation.js";

export async function renderDashboard() {

    const data = await getDashboardData();

    if (!data) return;

    const content = `

        ${createWelcomeCard(data.profile)}

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
