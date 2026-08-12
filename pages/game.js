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

    document.getElementById("app").innerHTML = `

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


            <section id="gameSelector">

                ${createGradeStep()}

            </section>


            <div
                id="gamesMessage"
                class="games-message">
            </div>


            <div class="student-login-link">

                <p>
                    دانش‌آموز سامانه هستی؟
                </p>

                <button
                    id="backToLoginBtn"
                    type="button"
                    class="games-back-btn">

                    ورود به بخش آزمون‌ها

                </button>

            </div>

        </div>

    `;

    bindGradeEvents();
    bindLoginEvent();
}


function createGradeStep() {

    return `

        <section class="player-section">

            <h2>
                👋 اول اسمت رو وارد کن
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
                                data-grade="${grade}">

                                <span>
                                    پایه
                                </span>

                                <strong>
                                    ${grade}
                                </strong>

                                <small>
                                    ${escapeHtml(
                                        info.title
                                    )}
                                </small>

                            </button>

                        `
                    )
                    .join("")}

            </div>

        </section>

    `;
}


function bindGradeEvents() {

    document
        .querySelectorAll(
            ".grade-game-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const playerName =
                        document
                            .getElementById(
                                "playerName"
                            )
                            ?.value
                            .trim();

                    if (
                        !playerName ||
                        playerName.length < 2
                    ) {

                        showMessage(
                            "لطفاً اول اسمت رو وارد کن 🌟"
                        );

                        document
                            .getElementById(
                                "playerName"
                            )
                            ?.focus();

                        return;
                    }


                    state.playerName =
                        playerName;

                    state.grade =
                        Number(
                            button.dataset.grade
                        );

                    state.chapter = null;

                    savePlayer();

                    showMessage("");

                    renderChapterStep();
                }
            );
        });
}


function renderChapterStep() {

    const selector =
        document.getElementById(
            "gameSelector"
        );

    if (!selector) return;


    const gradeChapters =
        chapters[state.grade] || [];


    selector.innerHTML = `

        <section class="public-chapters-section">

            <div class="selection-summary">

                <span>
                    👤
                    ${escapeHtml(
                        state.playerName
                    )}
                </span>

                <span>
                    📚 پایه ${state.grade}
                </span>

            </div>


            <h2>
                فصل‌های پایه ${state.grade}
            </h2>


            <div class="public-chapter-list">

                ${gradeChapters
                    .map(
                        (title, index) => `

                            <button
                                type="button"
                                class="public-chapter-btn"
                                data-chapter="${index + 1}">

                                <span
                                    class="chapter-number">

                                    ${index + 1}

                                </span>

                                <span
                                    class="chapter-name">

                                    ${escapeHtml(
                                        title
                                    )}

                                </span>

                            </button>

                        `
                    )
                    .join("")}

            </div>


            <button
                type="button"
                id="changeGradeBtn"
                class="games-back-btn">

                تغییر نام یا پایه

            </button>

        </section>

    `;


    document
        .querySelectorAll(
            ".public-chapter-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    loadChapterGames(
                        Number(
                            button.dataset.chapter
                        )
                    );
                }
            );
        });


    document
        .getElementById(
            "changeGradeBtn"
        )
        ?.addEventListener(
            "click",
            () => {

                selector.innerHTML =
                    createGradeStep();

                bindGradeEvents();
            }
        );
}


async function loadChapterGames(
    chapter
) {

    state.chapter = chapter;

    showMessage(
        "در حال دریافت بازی‌ها..."
    );


    const games =
        await getPublicGames(
            state.grade,
            state.chapter
        );


    showMessage("");

    renderGamesStep(games);
}


function renderGamesStep(games) {

    const selector =
        document.getElementById(
            "gameSelector"
        );

    if (!selector) return;


    const chapterTitle =
        chapters[state.grade]?.[
            state.chapter - 1
        ] || `فصل ${state.chapter}`;


    selector.innerHTML = `

        <section
            class="public-game-list-section">

            <div class="selection-summary">

                <span>
                    👤
                    ${escapeHtml(
                        state.playerName
                    )}
                </span>

                <span>
                    📚 پایه ${state.grade}
                </span>

            </div>


            <h2>
                ${escapeHtml(
                    chapterTitle
                )}
            </h2>


            <div class="public-game-list">

                ${
                    games.length
                        ? games
                            .map(
                                game =>
                                    createGameCard(
                                        game
                                    )
                            )
                            .join("")
                        : `

                            <div class="empty-state">

                                <div>
                                    🎮
                                </div>

                                <p>
                                    هنوز برای این فصل
                                    بازی‌ای قرار داده
                                    نشده است.
                                </p>

                            </div>

                        `
                }

            </div>


            <button
                type="button"
                id="backToChaptersBtn"
                class="games-back-btn">

                بازگشت به فصل‌ها

            </button>

        </section>

    `;


    document
        .getElementById(
            "backToChaptersBtn"
        )
        ?.addEventListener(
            "click",
            renderChapterStep
        );
}


function createGameCard(game) {

    return `

        <div class="public-game-card">

            <div class="public-game-icon">
                🎮
            </div>

            <div class="public-game-info">

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
                href="${escapeHtml(
                    game.url
                )}">

                شروع بازی

            </a>

        </div>

    `;
}


function bindLoginEvent() {

    document
        .getElementById(
            "backToLoginBtn"
        )
        ?.addEventListener(
            "click",
            () => {

                navigate("login");
            }
        );
}


function savePlayer() {

    sessionStorage.setItem(
        "publicGamePlayer",
        JSON.stringify({
            name:
                state.playerName,
            grade:
                state.grade
        })
    );
}


function restorePlayer() {

    try {

        const value =
            sessionStorage.getItem(
                "publicGamePlayer"
            );

        if (!value) return;


        const saved =
            JSON.parse(value);


        state.playerName =
            saved.name || "";

        state.grade =
            Number(
                saved.grade
            ) || null;

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
