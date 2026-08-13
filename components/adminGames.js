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


function createGameCard(game) {

    const chapterTitle =
        chapters[game.grade]?.[
            Number(game.chapter) - 1
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

                ${
                    game.url
                        ? `

                            <a
                                href="${escapeHtml(
                                    game.url
                                )}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="open-game-btn">

                                اجرای بازی

                            </a>

                        `
                        : ""
                }


                <button
                    type="button"
                    class="replace-game-file-btn"
                    data-game-id="${game.id}">

                    جایگزینی فایل

                </button>


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
                    game?.id ||
                    ""
                }">


            <div class="input-group">

                <label for="gameTitle">
                    عنوان بازی
                </label>

                <input
                    id="gameTitle"
                    type="text"
                    value="${escapeHtml(
                        game?.title ||
                        ""
                    )}"
                    placeholder="مثلاً بازی کسرها">

            </div>


            <div class="input-group">

                <label for="gameGrade">
                    پایه
                </label>

                <select id="gameGrade">

                    ${[7,8,9]
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
                                آدرس فایل
                            </label>

                            <input
                                id="gameUrl"
                                type="text"
                                value="${escapeHtml(
                                    game?.url ||
                                    ""
                                )}"
                                readonly>

                        </div>

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

                            فایل HTML را انتخاب کن.
                            انتشار در GitHub
                            به صورت خودکار انجام می‌شود.

                        </p>


                        <p class="form-help">

                            داخل فایل بازی بنویس:

                            <code>
                                const GAME_ID = __GAME_ID__;
                            </code>

                        </p>

                    `
            }

        </form>

    `;
}


export function createReplaceGameFileModal() {

    return `

        <div
            class="modal-overlay"
            id="replaceGameFileModal">

            <div
                class="modal-box"
                role="dialog"
                aria-modal="true">

                <div class="modal-header">

                    <h3>
                        جایگزینی فایل بازی
                    </h3>

                    <button
                        type="button"
                        class="modal-close"
                        data-modal-close="replaceGameFileModal">

                        ×

                    </button>

                </div>


                <div class="modal-content">

                    <input
                        type="hidden"
                        id="replaceGameId">


                    <p id="replaceGameTitle">
                    </p>


                    <div class="input-group">

                        <label for="replaceGameFile">

                            فایل HTML جدید

                        </label>

                        <input
                            id="replaceGameFile"
                            type="file"
                            accept=".html,text/html">

                    </div>


                    <p class="form-help">

                        شناسه بازی تغییر نمی‌کند
                        و امتیازات قبلی باقی می‌مانند.

                    </p>

                </div>


                <div class="modal-actions">

                    <button
                        type="button"
                        class="btn modal-cancel"
                        data-modal-close="replaceGameFileModal">

                        انصراف

                    </button>


                    <button
                        type="button"
                        id="confirmReplaceGameFile"
                        class="btn modal-submit">

                        جایگزینی و انتشار

                    </button>

                </div>

            </div>

        </div>

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
                    value="${index + 1}"
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


function escapeHtml(value) {

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
