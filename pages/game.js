import {
    grades,
    chapters
} from "../config/chapters.js";

import {
    getPublicGames
} from "../services/contentService.js";

import { navigate } from "../utils/navigation.js";


const state = {
    playerName: "",
    grade: null,
    chapter: null
};


export function renderGame() {

    restorePlayer();

    const content = `

        <div class="public-games-page">

            <section class="games-intro">

                <div class="games-logo">
                    🎮
                </div>

                <h1>
                    بازی‌های ریاضی
                </h1>

                <h2>
                    فرهاد رحیمی
                </h2>

                <p>
                    دبیر ریاضی
                </p>

                <p class="games-description">
                    یادگیری ریاضی با بازی،
                    تمرین و رقابت
                </p>

            </section>


            <section class="player-section">

                <h2>
                    👋 اسمت چیه؟
                </h2>

                <div class="input-group">

                    <label for="playerName">
                        نام بازیکن
                    </label>

                    <input
                        id="playerName"
                        type="text"
                        maxlength="30"
                        autocomplete="off"
                        placeholder="اسمت رو وارد کن"
                        value="${escapeHtml(
                            state.playerName
                        )}">

                </div>

            </section>


            <section class="grade-section">

                <h2>
                    پایه خودت رو انتخاب کن
                </h2>

                <div class="grade-list">

                    ${Object.entries(grades)
                        .map(
                            ([grade, info]) => `

                                <button
                                    type="button"
                                    class="grade-game-btn"
                                    data-grade="${grade}"
                                    style="
                                        --grade-color:
                                        ${info.color};
                                    ">

                                    <span>
                                        پایه
                                    </span>

                                    <strong>
                                        ${grade}
                                    </strong>

                                    <small>
                                        ${info.title}
                                    </small>

                                </button>

                            `
                        )
                        .join("")}

                </div>

            </section>


            <section
                id="chaptersSection"
                class="public-chapters-section"
                hidden>

                <h2 id="chaptersTitle">
                    فصل‌ها
                </h2>

                <div
                    id="publicChapterList"
                    class="public-chapter-list">
                </div>

            </section>


            <section
                id="publicGamesSection"
                class="public-game-list-section"
                hidden>

                <div class="public-games-title">

                    <h2 id="selectedChapterTitle">
                        بازی‌های فصل
                    </h2>

                    <button
                        type="button"
                        id="backToChaptersBtn">
                        بازگشت به فصل‌ها
                    </button>

                </div>

                <div
                    id="publicGameList"
                    class="public-game-list">
                </div>

            </section>


            <div
                id="gamesMessage"
                class="games-message">
            </div>


            <button
                id="backToLoginBtn"
                type="button"
                class="games-back-btn">

                ورود به سامانه آزمون دانش‌آموزی

            </button>

        </div>

    `;

    document.getElementById("app").innerHTML =
        content;

    bindGamePageEvents();
}


function bindGamePageEvents() {

    document
        .querySelectorAll(".grade-game-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    handleGradeSelect(
                        Number(
                            button.dataset.grade
                        )
                    );
                }
            );
        });


    document
        .getElementById("backToChaptersBtn")
        ?.addEventListener(
            "click",
            showChapters
        );


    document
        .getElementById("backToLoginBtn")
        ?.addEventListener(
            "click",
            () => {

                navigate("login");
            }
        );
}


function handleGradeSelect(grade) {

    const playerName =
        document
            .getElementById("playerName")
            ?.value
            .trim();

    if (!playerName) {

        showMessage(
            "اول اسمت رو وارد کن 🌟"
        );

        document
            .getElementById("playerName")
            ?.focus();

        return;
    }


    if (playerName.length < 2) {

        showMessage(
            "اسم بازیکن خیلی کوتاهه."
        );

        return;
    }


    state.playerName = playerName;
    state.grade = grade;
    state.chapter = null;

    savePlayer();

    showMessage("");

    renderChapters();
}


function renderChapters() {

    const section =
        document.getElementById(
            "chaptersSection"
        );

    const gamesSection =
        document.getElementById(
            "publicGamesSection"
        );

    const list =
        document.getElementById(
            "publicChapterList"
        );

    const title =
        document.getElementById(
            "chaptersTitle"
        );


    const gradeChapters =
        chapters[state.grade] || [];


    if (!section || !list) {
        return;
    }


    if (title) {

        title.textContent =
            `فصل‌های پایه ${state.grade}`;
    }


    list.innerHTML =
        gradeChapters
            .map(
                (chapterTitle, index) => `

                    <button
                        type="button"
                        class="public-chapter-btn"
                        data-chapter="${index + 1}">

                        <span class="chapter-number">
                            ${index + 1}
                        </span>

                        <span class="chapter-name">
                            ${escapeHtml(
                                chapterTitle
                            )}
                        </span>

                    </button>

                `
            )
            .join("");


    section.hidden = false;

    if (gamesSection) {
        gamesSection.hidden = true;
    }


    list
        .querySelectorAll(
            ".public-chapter-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    handleChapterSelect(
                        Number(
                            button.dataset.chapter
                        )
                    );
                }
            );
        });


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


async function handleChapterSelect(
    chapter
) {

    state.chapter = chapter;

    showMessage(
        "در حال دریافت بازی‌ها..."
    );


    const games =
        await getPublicGames(
            state.grade,
            chapter
        );


    showMessage("");

    renderGames(games);
}


function renderGames(games) {

    const chapterSection =
        document.getElementById(
            "chaptersSection"
        );

    const section =
        document.getElementById(
            "publicGamesSection"
        );

    const list =
        document.getElementById(
            "publicGameList"
        );

    const title =
        document.getElementById(
            "selectedChapterTitle"
        );


    if (!section || !list) {
        return;
    }


    const chapterTitle =
        chapters[state.grade]?.[
            state.chapter - 1
        ] || `فصل ${state.chapter}`;


    if (title) {

        title.textContent =
            chapterTitle;
    }


    if (!games.length) {

        list.innerHTML = `

            <div class="empty-state">

                <div>
                    🎮
                </div>

                <p>
                    هنوز برای این فصل
                    بازی‌ای قرار داده نشده است.
                </p>

            </div>

        `;

    } else {

        list.innerHTML =
            games
                .map(
                    game => `

                        <div
                            class="public-game-card">

                            <div
                                class="public-game-icon">
                                🎮
                            </div>

                            <div
                                class="public-game-info">

                                <h3>
                                    ${escapeHtml(
                                        game.title
                                    )}
                                </h3>

                                <p>
                                    بازی آموزشی ریاضی
                                </p>

                            </div>

                            <a
                                class="play-game-btn"
                                href="${escapeAttribute(
                                    game.url
                                )}"
                                data-game-id="${game.id}">

                                شروع بازی

                            </a>

                        </div>

                    `
                )
                .join("");
    }


    if (chapterSection) {
        chapterSection.hidden = true;
    }

    section.hidden = false;


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function showChapters() {

    const chaptersSection =
        document.getElementById(
            "chaptersSection"
        );

    const gamesSection =
        document.getElementById(
            "publicGamesSection"
        );


    if (gamesSection) {
        gamesSection.hidden = true;
    }

    if (chaptersSection) {

        chaptersSection.hidden = false;

        chaptersSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


function savePlayer() {

    sessionStorage.setItem(
        "publicGamePlayer",
        JSON.stringify({
            name: state.playerName,
            grade: state.grade
        })
    );
}


function restorePlayer() {

    try {

        const saved =
            JSON.parse(
                sessionStorage.getItem(
                    "publicGamePlayer"
                )
            );

        if (!saved) return;

        state.playerName =
            saved.name || "";

        state.grade =
            Number(saved.grade) || null;

    } catch {

        sessionStorage.removeItem(
            "publicGamePlayer"
        );
    }
}


function showMessage(message) {

    const element =
        document.getElementById(
            "gamesMessage"
        );

    if (!element) return;

    element.textContent = message;
}


function escapeHtml(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function escapeAttribute(value) {

    return escapeHtml(value);
}
