import {
    chapters
} from "../config/chapters.js";


export function createGamesSection(
    games = []
) {

    return `

        <section class="admin-games">

            <div class="admin-header">

                <div>

                    <h2>
                        مدیریت بازی‌ها
                    </h2>

                    <p>
                        ${games.length}
                        بازی ثبت شده
                    </p>

                </div>


                <button
                    id="addGameBtn"
                    class="btn"
                    type="button">

                    افزودن بازی

                </button>

            </div>


            <div class="game-list">

                ${
                    games.length

                        ? games
                            .map(
                                createGameCard
                            )
                            .join("")

                        : `

                            <div class="empty-state">

                                هنوز بازی‌ای
                                ثبت نشده است.

                            </div>

                        `
                }

            </div>

        </section>

    `;
}


function createGameCard(
    game
) {

    const chapterTitle =
        chapters[game.grade]?.[
            Number(
                game.chapter
            ) - 1
        ] ||
        `فصل ${game.chapter}`;


    return `

        <div
            class="admin-game-card"
            data-game-id="${game.id}">

            <div class="game-info">

                <h3>
                    ${escapeHtml(
                        game.title ||
                        "بدون عنوان"
                    )}
                </h3>


                <p>

                    پایه ${game.grade}

                    •

                    ${escapeHtml(
                        chapterTitle
                    )}

                </p>


                <small>
                    شناسه بازی:
                    ${game.id}
                </small>


                ${
                    game.url
                        ? `

                            <small>
                                ${escapeHtml(
                                    game.url
                                )}
                            </small>

                        `
                        : ""
                }

            </div>


            <div class="game-actions">

                <button
                    type="button"
                    class="edit-game-btn"
                    data-game-id="${game.id}">

                    ویرایش اطلاعات

                </button>


                <button
                    type="button"
                    class="delete-game-btn"
                    data-game-id="${game.id}">

                    حذف

                </button>

            </div>

        </div>

    `;
}


export function createGameForm({
    game = null,
    grade = 7
} = {}) {

    const editing =
        Boolean(game);


    const selectedGrade =
        Number(
            game?.grade ||
            grade
        );


    const selectedChapter =
        Number(
            game?.chapter ||
            1
        );


    const gradeChapters =
        chapters[
            selectedGrade
        ] || [];


    return `

        <form id="gameForm">

            <input
                type="hidden"
                id="gameId"
                value="${
                    game?.id || ""
                }">


            <div class="input-group">

                <label for="gameTitle">
                    عنوان بازی
                </label>

                <input
                    id="gameTitle"
                    type="text"
                    value="${escapeHtml(
                        game?.title || ""
                    )}"
                    placeholder="مثلاً بازی کسرها">

            </div>


            <div class="input-group">

                <label for="gameGrade">
                    پایه
                </label>

                <select id="gameGrade">

                    ${[7, 8, 9]
                        .map(
                            item => `

                                <option
                                    value="${item}"
                                    ${
                                        item ===
                                        selectedGrade
                                            ? "selected"
                                            : ""
                                    }>

                                    پایه ${item}

                                </option>

                            `
                        )
                        .join("")}

                </select>

            </div>


            <div class="input-group">

                <label for="gameChapter">
                    فصل
                </label>

                <select id="gameChapter">

                    ${gradeChapters
                        .map(
                            (
                                title,
                                index
                            ) => `

                                <option
                                    value="${
                                        index + 1
                                    }"
                                    ${
                                        index + 1 ===
                                        selectedChapter
                                            ? "selected"
                                            : ""
                                    }>

                                    فصل ${
                                        index + 1
                                    }
                                    -
                                    ${escapeHtml(
                                        title
                                    )}

                                </option>

                            `
                        )
                        .join("")}

                </select>

            </div>


            <div class="input-group">

                <label for="gameOrder">
                    ترتیب نمایش
                </label>

                <input
                    id="gameOrder"
                    type="number"
                    min="1"
                    value="${
                        game?.order_no ||
                        1
                    }">

            </div>


            ${
                editing

                    ? `

                        <div class="input-group">

                            <label>
                                آدرس فعلی بازی
                            </label>

                            <input
                                id="gameUrl"
                                type="text"
                                value="${escapeHtml(
                                    game?.url || ""
                                )}"
                                readonly>

                        </div>


                        <p class="form-help">

                            در حالت ویرایش،
                            فایل بازی تغییر نمی‌کند.

                        </p>

                    `

                    : `

                        <div class="input-group">

                            <label for="gameFile">
                                فایل HTML بازی
                            </label>

                            <input
                                id="gameFile"
                                type="file"
                                accept=".html,text/html">

                        </div>


                        <p class="form-help">

                            فایل باید با پسوند
                            .html باشد.

                        </p>


                        <p class="form-help">

                            داخل فایل بازی از
                            __GAME_ID__
                            استفاده کن؛
                            شناسه واقعی خودکار
                            جایگزین می‌شود.

                        </p>

                    `
            }

        </form>

    `;
}


export function getChapterOptions(
    grade,
    selectedChapter = 1
) {

    const gradeChapters =
        chapters[
            Number(grade)
        ] || [];


    return gradeChapters
        .map(
            (
                title,
                index
            ) => `

                <option
                    value="${
                        index + 1
                    }"
                    ${
                        index + 1 ===
                        Number(
                            selectedChapter
                        )
                            ? "selected"
                            : ""
                    }>

                    فصل ${
                        index + 1
                    }
                    -
                    ${escapeHtml(
                        title
                    )}

                </option>

            `
        )
        .join("");
}


function escapeHtml(
    value
) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );
}
