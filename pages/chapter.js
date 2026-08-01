import { createAppLayout } from "../components/appLayout.js";
import { createActionCard } from "../components/actionCard.js";

import { getRoute } from "../utils/navigation.js";

import { getChapterData } from "../services/chapterService.js";

import { initializeLayout } from "../core/layout.js";

export async function renderChapter() {

    const { params } = getRoute();

    const grade = Number(params.grade);

    const chapter = Number(params.chapter);

    const data = await getChapterData(
        grade,
        chapter
    );

    const progress = data.progress?.progress ?? 0;

    const content = `

        <div class="chapter-page">

            <div class="chapter-progress">

                <h2>

                    پیشرفت شما

                </h2>

                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width:${progress}%">

                    </div>

                </div>

                <p>

                    ${progress}٪ تکمیل شده

                </p>

            </div>

            ${data.games.length ? createActionCard({

                title: "بازی‌های آموزشی",

                subtitle: `${data.games.length} بازی`,

                icon: "gamepad-2",

                color: "warning",

                route: "game",

                data: `data-grade="${grade}" data-chapter="${chapter}"`

            }) : ""}

            ${createActionCard({

                title: "آزمون‌های آنلاین",

                subtitle: "مشاهده آزمون‌های فصل",

                icon: "clipboard-list",

                color: "success",

                route: "exam",

                data: `data-grade="${grade}" data-chapter="${chapter}"`

            })}

            ${data.pdfs.length ? createActionCard({

                title: "جزوه آموزشی",

                subtitle: `${data.pdfs.length} فایل`,

                icon: "file-text",

                color: "primary",

                route: "pdf",

                data: `data-grade="${grade}" data-chapter="${chapter}"`

            }) : ""}

            ${data.videos.length ? createActionCard({

                title: "ویدئوهای آموزشی",

                subtitle: `${data.videos.length} ویدئو`,

                icon: "play-circle",

                color: "purple",

                route: "video",

                data: `data-grade="${grade}" data-chapter="${chapter}"`

            }) : ""}

        </div>

    `;

    document.getElementById("app").innerHTML =
        createAppLayout({

            title: data.title,

            content,

            showBack: true

        });

    initializeLayout();

    bindChapterEvents();

}

function bindChapterEvents() {

    document
        .querySelectorAll(".action-card")
        .forEach(card => {

            card.addEventListener("click", () => {

                // مرحله بعد این قسمت را
                // به Router وصل می‌کنیم.

                console.log(card.dataset);

            });

        });

}
