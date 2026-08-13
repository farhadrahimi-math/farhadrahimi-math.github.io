import {
    chapters
} from "../config/chapters.js";


export function createGamesSection(
    games = []
) {

    return `

        <section class="admin-games">

            <div class="admin-games-toolbar">

                <button
                    id="addGameBtn"
                    class="admin-add-game-btn"
                    type="button">

                    <span>＋</span>

                    افزودن بازی جدید

                </button>


                <div class="admin-games-filters">

                    <div class="admin-game-search">

                        <span>
                            🔎
                        </span>

                        <input
                            id="gameSearchInput"
                            type="search"
                            placeholder="جستجوی نام بازی..."
                            autocomplete="off">

                    </div>


                    <div class="admin-filter-row">

                        <select
                            id="gameGradeFilter">

                            <option value="">
                                همه پایه‌ها
                            </option>

                            <option value="7">
                                پایه هفتم
                            </option>

                            <option value="8">
                                پایه هشتم
                            </option>

                            <option value="9">
                                پایه نهم
                            </option>

                        </select>


                        <select
                            id="gameChapterFilter">

                            <option value="">
                                همه فصل‌ها
                            </option>

                        </select>

                    </div>

                </div>


                <div class="admin-games-result-info">

                    <span>
                        🎮
                        <strong id="visibleGamesCount">
                            ${games.length}
                        </strong>
                        بازی
                    </span>

                    <button
                        type="button"
                        id="clearGameFilters"
                        class="clear-game-filters">

                        پاک کردن فیلترها

                    </button>

                </div>

            </div>


            <div
                id="gameList"
                class="game-list">

                ${
                    games.length

                        ? games
                            .map(
                                createGameCard
                            )
                            .join("")

                        : createEmptyState()
                }

            </div>


            <div
                id="gameFilterEmpty"
                class="admin-filter-empty"
                hidden>

                <span>
                    🔍
                </span>

                <h3>
                    بازی‌ای پیدا نشد
                </h3>

                <p>
                    فیلترها یا عبارت جستجو
                    را تغییر دهید.
                </p>

            </div>

        </section>

    `;
}


function createGameCard(game) {

    const chapterTitle =
        chapters[
            Number(game.grade)
        ]?.[
            Number(game.chapter) - 1
        ] ||
        `فصل ${game.chapter}`;


    return `

        <article
            class="admin-game-card"
            data-game-id="${game.id}"
            data-game-title="${escapeHtml(
                normalizeForAttribute(
                    game.title
                )
            )}"
            data-game-grade="${game.grade}"
            data-game-chapter="${game.chapter}">


            <div class="admin-game-card-top">

                <div class="admin-game-icon">
                    🎮
                </div>


                <div class="game-info">

                    <h3>
                        ${escapeHtml(
                            game.title ||
                            "بدون عنوان"
                        )}
                    </h3>


                    <div class="admin-game-tags">

                        <span class="grade-tag">
                            پایه ${game.grade}
                        </span>

                        <span class="chapter-tag">

                            فصل
                            ${game.chapter}

                        </span>

                    </div>

                </div>


                <span class="admin-game-order">

                    #${game.order_no || 1}

                </span>

            </div>


            <div class="admin-game-chapter-name">

                📘

                ${escapeHtml(
                    chapterTitle
                )}

            </div>


            <div class="admin-game-meta">

                <span>
                    ID:
                    ${game.id}
                </span>

                ${
                    game.url

                        ? `

                            <span
                                class="admin-game-path"
                                title="${escapeHtml(
                                    game.url
                                )}">

                                ${escapeHtml(
                                    getFileName(
                                        game.url
                                    )
                                )}

                            </span>

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

                                <span>▶</span>
                                اجرا

                            </a>

                        `

                        : ""
                }


                <button
                    type="button"
                    class="edit-game-btn"
                    data-game-id="${game.id}">

                    <span>✏️</span>
                    ویرایش

                </button>


                <button
                    type="button"
                    class="replace-game-file-btn"
                    data-game-id="${game.id}">

                    <span>🔄</span>
                    فایل جدید

                </button>


                <button
                    type="button"
                    class="delete-game-btn"
                    data-game-id="${game.id}">

                    <span>🗑️</span>
                    حذف

                </button>

            </div>

        </article>

    `;
}


function createEmptyState() {

    return `

        <div class="admin-empty">

            <span>
                🎮
            </span>

            <h3>
                هنوز بازی‌ای منتشر نشده
            </h3>

            <p>
                با دکمه افزودن بازی،
                اولین بازی را منتشر کنید.
            </p>

        </div>

    `;
}


export function bindGameFilters() {

    const searchInput =
        document.getElementById(
            "gameSearchInput"
        );


    const gradeFilter =
        document.getElementById(
            "gameGradeFilter"
        );


    const chapterFilter =
        document.getElementById(
            "gameChapterFilter"
        );


    const clearButton =
        document.getElementById(
            "clearGameFilters"
        );


    if (
        !searchInput ||
        !gradeFilter ||
        !chapterFilter
    ) {
        return;
    }


    function updateChapterOptions() {

        const grade =
            Number(
                gradeFilter.value
            );


        if (!grade) {

            chapterFilter.innerHTML =
                `

                    <option value="">
                        همه فصل‌ها
                    </option>

                `;

            return;
        }


        const items =
            chapters[grade] ||
            [];


        chapterFilter.innerHTML = `

            <option value="">
                همه فصل‌ها
            </option>

            ${items
                .map(
                    (
                        title,
                        index
                    ) => `

                        <option
                            value="${index + 1}">

                            فصل ${index + 1}
                            -
                            ${escapeHtml(
                                title
                            )}

                        </option>

                    `
                )
                .join("")}

        `;
    }


    function applyFilters() {

        const search =
            normalizeText(
                searchInput.value
            );


        const grade =
            gradeFilter.value;


        const chapter =
            chapterFilter.value;


        const cards =
            document.querySelectorAll(
                ".admin-game-card"
            );


        let visible =
            0;


        cards.forEach(
            card => {

                const title =
                    normalizeText(
                        card.dataset
                            .gameTitle ||
                        ""
                    );


                const cardGrade =
                    card.dataset
                        .gameGrade;


                const cardChapter =
                    card.dataset
                        .gameChapter;


                const matchesSearch =
                    !search ||
                    title.includes(
                        search
                    );


                const matchesGrade =
                    !grade ||
                    cardGrade ===
                    grade;


                const matchesChapter =
                    !chapter ||
                    cardChapter ===
                    chapter;


                const show =
                    matchesSearch &&
                    matchesGrade &&
                    matchesChapter;


                card.hidden =
                    !show;


                if (show) {
                    visible++;
                }

            }
        );


        const counter =
            document.getElementById(
                "visibleGamesCount"
            );


        if (counter) {
            counter.textContent =
                visible;
        }


        const empty =
            document.getElementById(
                "gameFilterEmpty"
            );


        if (empty) {

            empty.hidden =
                visible !== 0 ||
                cards.length === 0;
        }
    }


    searchInput
        .addEventListener(
            "input",
            applyFilters
        );


    gradeFilter
        .addEventListener(
            "change",
            () => {

                updateChapterOptions();

                chapterFilter.value =
                    "";

                applyFilters();
            }
        );


    chapterFilter
        .addEventListener(
            "change",
            applyFilters
        );


    clearButton
        ?.addEventListener(
            "click",
            () => {

                searchInput.value =
                    "";

                gradeFilter.value =
                    "";

                updateChapterOptions();

                chapterFilter.value =
                    "";

                applyFilters();
            }
        );


    updateChapterOptions();
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


            <div class="admin-form-row">

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

                    <label for="gameOrder">
                        ترتیب
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


            ${
                editing

                    ? `

                        <div class="admin-current-file">

                            <span>
                                📄 فایل فعلی
                            </span>

                            <code>
                                ${escapeHtml(
                                    getFileName(
                                        game?.url
                                    )
                                )}
                            </code>

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


                        <div class="admin-upload-help">

                            <span>
                                💡
                            </span>

                            <p>

                                فایل به صورت خودکار
                                در GitHub منتشر می‌شود.

                                <br>

                                داخل فایل از

                                <code>
                                    __GAME_ID__
                                </code>

                                استفاده کنید.

                            </p>

                        </div>

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
                        🔄 جایگزینی فایل بازی
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


                    <p
                        id="replaceGameTitle"
                        class="replace-game-title">
                    </p>


                    <div class="input-group">

                        <label
                            for="replaceGameFile">

                            فایل HTML جدید

                        </label>

                        <input
                            id="replaceGameFile"
                            type="file"
                            accept=".html,text/html">

                    </div>


                    <div class="admin-upload-help">

                        <span>
                            ✅
                        </span>

                        <p>

                            شناسه بازی تغییر نمی‌کند
                            و امتیازات قبلی
                            حفظ می‌شوند.

                        </p>

                    </div>

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

                    فصل ${index + 1}
                    -
                    ${escapeHtml(
                        title
                    )}

                </option>

            `
        )
        .join("");
}


function getFileName(url) {

    if (!url) {
        return "—";
    }


    return String(url)
        .split("/")
        .filter(Boolean)
        .pop() ||
        "—";
}


function normalizeForAttribute(
    value
) {

    return String(
        value || ""
    );
}


function normalizeText(value) {

    return String(
        value || ""
    )
        .trim()
        .toLowerCase()
        .replaceAll("ي", "ی")
        .replaceAll("ك", "ک");
}


function escapeHtml(value) {

    return String(
        value ?? ""
    )
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
