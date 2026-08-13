import { createAppLayout } from "../components/appLayout.js";

import {
    getStudents,
    setStudentActive,
    createStudent
} from "../services/studentService.js";

import {
    getGames,
    updateGame,
    deleteGame,
    publishGame,
    replaceGameFile
} from "../services/contentService.js";

import {
    createGamesSection,
    createGameForm,
    createReplaceGameFileModal,
    getChapterOptions
} from "../components/adminGames.js";

import { getProfile } from "../store/appStore.js";
import { initializeLayout } from "../core/layout.js";
import { navigate } from "../utils/navigation.js";
import { showToast } from "../components/toast.js";
import { createInput } from "../components/input.js";

import {
    createModal,
    openModal,
    closeModal,
    bindModalClose
} from "../components/modal.js";


let currentGames = [];


/* =========================
   MODALS
========================= */

function createAddStudentModal() {

    const formContent = `

        <form id="addStudentForm">

            ${createInput({
                id: "studentName",
                label: "نام دانش‌آموز",
                type: "text",
                placeholder: "مثلاً علی احمدی"
            })}

            ${createInput({
                id: "studentPhone",
                label: "شماره موبایل",
                type: "tel",
                placeholder: "09123456789"
            })}

            ${createInput({
                id: "studentPassword",
                label: "رمز عبور",
                type: "password",
                placeholder: "رمز عبور"
            })}

            <div class="input-group">

                <label for="studentGrade">
                    پایه
                </label>

                <select id="studentGrade">

                    <option value="">
                        انتخاب پایه
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

            </div>

        </form>

    `;


    return createModal({
        id: "addStudentModal",
        title: "افزودن دانش‌آموز",
        content: formContent,
        submitText: "ثبت دانش‌آموز"
    });
}


function createGameModal() {

    return createModal({
        id: "gameModal",
        title: "افزودن بازی",
        content: createGameForm(),
        submitText: "ثبت و انتشار بازی"
    });
}


/* =========================
   RENDER
========================= */

export async function renderAdmin() {

    const profile =
        getProfile();


    if (
        !profile ||
        profile.role !== "admin"
    ) {

        navigate("dashboard");

        return;
    }


    const [students, games] =
        await Promise.all([
            getStudents(),
            getGames()
        ]);


    currentGames =
        games;


    const content = `

        <div class="admin-page">

            <div class="admin-header">

                <div>

                    <h2>
                        مدیریت دانش‌آموزان
                    </h2>

                    <p>
                        ${students.length}
                        دانش‌آموز
                    </p>

                </div>


                <button
                    id="addStudentBtn"
                    class="btn"
                    type="button">

                    افزودن دانش‌آموز

                </button>

            </div>


            <div class="student-list">

                ${
                    students.length

                        ? students
                            .map(
                                createStudentCard
                            )
                            .join("")

                        : `

                            <div class="empty-state">

                                هنوز دانش‌آموزی
                                ثبت نشده است.

                            </div>

                        `
                }

            </div>


            ${createGamesSection(
                games
            )}

        </div>


        ${createAddStudentModal()}

        ${createGameModal()}

        ${createReplaceGameFileModal()}

    `;


    document
        .getElementById("app")
        .innerHTML =
        createAppLayout({
            title:
                "پنل مدیریت",

            content,

            profile,

            showBack:
                false
        });


    initializeLayout();

    bindAdminEvents();
}


/* =========================
   STUDENTS
========================= */

function createStudentCard(
    student
) {

    return `

        <div
            class="student-card"
            data-user-id="${student.id}">

            <div class="student-info">

                <h3>
                    ${student.name}
                </h3>

                <p>

                    پایه
                    ${student.grade}

                    ${
                        student.phone

                            ? ` • ${student.phone}`

                            : ""
                    }

                </p>

            </div>


            <div class="student-actions">

                <span
                    class="student-status ${
                        student.is_active
                            ? "active"
                            : "inactive"
                    }">

                    ${
                        student.is_active
                            ? "فعال"
                            : "غیرفعال"
                    }

                </span>


                <button
                    type="button"
                    class="toggle-student-btn"
                    data-user-id="${student.id}"
                    data-active="${student.is_active}">

                    ${
                        student.is_active

                            ? "غیرفعال کردن"

                            : "فعال کردن"
                    }

                </button>

            </div>

        </div>

    `;
}


/* =========================
   EVENTS
========================= */

function bindAdminEvents() {

    bindModalClose(
        "addStudentModal"
    );

    bindModalClose(
        "gameModal"
    );

    bindModalClose(
        "replaceGameFileModal"
    );


    document
        .getElementById(
            "addStudentBtn"
        )
        ?.addEventListener(
            "click",
            handleOpenStudentModal
        );


    document
        .querySelector(
            "#addStudentModal .modal-submit"
        )
        ?.addEventListener(
            "click",
            handleCreateStudent
        );


    document
        .getElementById(
            "addStudentForm"
        )
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                handleCreateStudent();
            }
        );


    document
        .querySelectorAll(
            ".toggle-student-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    handleStudentStatus
                );
            }
        );


    document
        .getElementById(
            "addGameBtn"
        )
        ?.addEventListener(
            "click",
            handleOpenAddGame
        );


    document
        .querySelectorAll(
            ".edit-game-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    handleOpenEditGame
                );
            }
        );


    document
        .querySelectorAll(
            ".replace-game-file-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    handleOpenReplaceGameFile
                );
            }
        );


    document
        .querySelectorAll(
            ".delete-game-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    handleDeleteGame
                );
            }
        );


    document
        .querySelector(
            "#gameModal .modal-submit"
        )
        ?.addEventListener(
            "click",
            handleSaveGame
        );


    document
        .getElementById(
            "confirmReplaceGameFile"
        )
        ?.addEventListener(
            "click",
            handleReplaceGameFile
        );


    bindGameFormEvents();
}


/* =========================
   STUDENT ACTIONS
========================= */

function handleOpenStudentModal() {

    document
        .getElementById(
            "addStudentForm"
        )
        ?.reset();


    openModal(
        "addStudentModal"
    );
}


async function handleCreateStudent() {

    const name =
        document
            .getElementById(
                "studentName"
            )
            ?.value
            .trim();


    const phone =
        document
            .getElementById(
                "studentPhone"
            )
            ?.value
            .trim();


    const password =
        document
            .getElementById(
                "studentPassword"
            )
            ?.value;


    const grade =
        document
            .getElementById(
                "studentGrade"
            )
            ?.value;


    if (!name) {

        showToast(
            "نام دانش‌آموز را وارد کنید.",
            "error"
        );

        return;
    }


    if (
        !/^09\d{9}$/.test(
            phone || ""
        )
    ) {

        showToast(
            "شماره موبایل معتبر وارد کنید.",
            "error"
        );

        return;
    }


    if (
        !password ||
        password.length < 6
    ) {

        showToast(
            "رمز عبور باید حداقل ۶ کاراکتر باشد.",
            "error"
        );

        return;
    }


    if (
        !["7", "8", "9"]
            .includes(grade)
    ) {

        showToast(
            "پایه دانش‌آموز را انتخاب کنید.",
            "error"
        );

        return;
    }


    const button =
        document.querySelector(
            "#addStudentModal .modal-submit"
        );


    setButtonLoading(
        button,
        true,
        "در حال ثبت..."
    );


    const result =
        await createStudent({
            name,
            phone,
            password,
            grade:
                Number(grade)
        });


    if (!result.success) {

        showToast(
            result.message ||
            "ثبت دانش‌آموز انجام نشد.",
            "error"
        );


        setButtonLoading(
            button,
            false,
            "ثبت دانش‌آموز"
        );

        return;
    }


    showToast(
        "دانش‌آموز با موفقیت اضافه شد.",
        "success"
    );


    closeModal(
        "addStudentModal"
    );


    await renderAdmin();
}


async function handleStudentStatus(
    event
) {

    const button =
        event.currentTarget;


    const userId =
        button.dataset.userId;


    const currentlyActive =
        button.dataset.active ===
        "true";


    const newStatus =
        !currentlyActive;


    button.disabled =
        true;


    button.textContent =
        "در حال تغییر...";


    const result =
        await setStudentActive(
            userId,
            newStatus
        );


    if (!result.success) {

        showToast(
            result.message,
            "error"
        );


        button.disabled =
            false;


        button.textContent =
            currentlyActive

                ? "غیرفعال کردن"

                : "فعال کردن";


        return;
    }


    showToast(
        newStatus

            ? "دانش‌آموز فعال شد."

            : "دانش‌آموز غیرفعال شد.",

        "success"
    );


    await renderAdmin();
}


/* =========================
   GAME FORM
========================= */

function handleOpenAddGame() {

    renderGameForm();


    setGameModalTitle(
        "افزودن بازی",
        "ثبت و انتشار بازی"
    );


    openModal(
        "gameModal"
    );
}


function handleOpenEditGame(
    event
) {

    const game =
        findGame(
            event.currentTarget
                .dataset.gameId
        );


    if (!game) {

        showToast(
            "اطلاعات بازی پیدا نشد.",
            "error"
        );

        return;
    }


    renderGameForm(
        game
    );


    setGameModalTitle(
        "ویرایش بازی",
        "ذخیره تغییرات"
    );


    openModal(
        "gameModal"
    );
}


function renderGameForm(
    game = null
) {

    const container =
        document.querySelector(
            "#gameModal .modal-content"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        createGameForm({
            game
        });


    bindGameFormEvents();
}


function setGameModalTitle(
    title,
    submitText
) {

    const titleElement =
        document.querySelector(
            "#gameModal .modal-header h3"
        );


    const button =
        document.querySelector(
            "#gameModal .modal-submit"
        );


    if (titleElement) {

        titleElement.textContent =
            title;
    }


    if (button) {

        button.textContent =
            submitText;

        button.disabled =
            false;
    }
}


function bindGameFormEvents() {

    const form =
        document.getElementById(
            "gameForm"
        );


    const gradeSelect =
        document.getElementById(
            "gameGrade"
        );


    const chapterSelect =
        document.getElementById(
            "gameChapter"
        );


    gradeSelect
        ?.addEventListener(
            "change",
            () => {

                if (!chapterSelect) {
                    return;
                }


                chapterSelect
                    .innerHTML =
                    getChapterOptions(
                        gradeSelect.value,
                        1
                    );
            }
        );


    form
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                handleSaveGame();
            }
        );
}


/* =========================
   SAVE / PUBLISH GAME
========================= */

async function handleSaveGame() {

    const gameId =
        document
            .getElementById(
                "gameId"
            )
            ?.value;


    const title =
        document
            .getElementById(
                "gameTitle"
            )
            ?.value
            .trim();


    const grade =
        document
            .getElementById(
                "gameGrade"
            )
            ?.value;


    const chapter =
        document
            .getElementById(
                "gameChapter"
            )
            ?.value;


    const orderNo =
        document
            .getElementById(
                "gameOrder"
            )
            ?.value;


    if (!title) {

        showToast(
            "عنوان بازی را وارد کنید.",
            "error"
        );

        return;
    }


    if (
        !["7", "8", "9"]
            .includes(grade)
    ) {

        showToast(
            "پایه بازی نامعتبر است.",
            "error"
        );

        return;
    }


    if (
        !chapter ||
        Number(chapter) < 1
    ) {

        showToast(
            "فصل بازی را انتخاب کنید.",
            "error"
        );

        return;
    }


    if (
        !orderNo ||
        Number(orderNo) < 1
    ) {

        showToast(
            "ترتیب نمایش معتبر نیست.",
            "error"
        );

        return;
    }


    const button =
        document.querySelector(
            "#gameModal .modal-submit"
        );


    /*
     * EDIT
     */

    if (gameId) {

        const game =
            findGame(
                gameId
            );


        if (!game) {

            showToast(
                "بازی پیدا نشد.",
                "error"
            );

            return;
        }


        setButtonLoading(
            button,
            true,
            "در حال ذخیره..."
        );


        const result =
            await updateGame(
                Number(gameId),
                {
                    title,

                    grade:
                        Number(grade),

                    chapter:
                        Number(chapter),

                    url:
                        game.url,

                    orderNo:
                        Number(orderNo)
                }
            );


        if (!result.success) {

            showToast(
                result.message,
                "error"
            );


            setButtonLoading(
                button,
                false,
                "ذخیره تغییرات"
            );


            return;
        }


        showToast(
            "اطلاعات بازی ویرایش شد.",
            "success"
        );


        closeModal(
            "gameModal"
        );


        await renderAdmin();

        return;
    }


    /*
     * NEW GAME
     */

    const file =
        document
            .getElementById(
                "gameFile"
            )
            ?.files?.[0];


    if (!file) {

        showToast(
            "فایل HTML بازی را انتخاب کنید.",
            "error"
        );

        return;
    }


    if (
        !file.name
            .toLowerCase()
            .endsWith(".html")
    ) {

        showToast(
            "فقط فایل HTML قابل قبول است.",
            "error"
        );

        return;
    }


    setButtonLoading(
        button,
        true,
        "در حال انتشار..."
    );


    const result =
        await publishGame({
            title,

            grade:
                Number(grade),

            chapter:
                Number(chapter),

            orderNo:
                Number(orderNo),

            file
        });


    if (!result.success) {

        showToast(
            result.message ||
            "انتشار بازی انجام نشد.",
            "error"
        );


        setButtonLoading(
            button,
            false,
            "ثبت و انتشار بازی"
        );


        return;
    }


    showToast(
        "بازی با موفقیت منتشر شد 🎮",
        "success"
    );


    closeModal(
        "gameModal"
    );


    await renderAdmin();
}


/* =========================
   REPLACE GAME FILE
========================= */

function handleOpenReplaceGameFile(
    event
) {

    const game =
        findGame(
            event.currentTarget
                .dataset.gameId
        );


    if (!game) {

        showToast(
            "بازی پیدا نشد.",
            "error"
        );

        return;
    }


    const idInput =
        document.getElementById(
            "replaceGameId"
        );


    const title =
        document.getElementById(
            "replaceGameTitle"
        );


    const fileInput =
        document.getElementById(
            "replaceGameFile"
        );


    if (idInput) {

        idInput.value =
            game.id;
    }


    if (title) {

        title.textContent =
            `فایل جدید برای «${game.title}»`;
    }


    if (fileInput) {

        fileInput.value =
            "";
    }


    const button =
        document.getElementById(
            "confirmReplaceGameFile"
        );


    if (button) {

        button.disabled =
            false;

        button.textContent =
            "جایگزینی و انتشار";
    }


    openModal(
        "replaceGameFileModal"
    );
}


async function handleReplaceGameFile() {

    const gameId =
        Number(
            document
                .getElementById(
                    "replaceGameId"
                )
                ?.value
        );


    const file =
        document
            .getElementById(
                "replaceGameFile"
            )
            ?.files?.[0];


    if (
        !gameId ||
        gameId < 1
    ) {

        showToast(
            "شناسه بازی نامعتبر است.",
            "error"
        );

        return;
    }


    if (!file) {

        showToast(
            "فایل HTML جدید را انتخاب کنید.",
            "error"
        );

        return;
    }


    if (
        !file.name
            .toLowerCase()
            .endsWith(".html")
    ) {

        showToast(
            "فقط فایل HTML قابل قبول است.",
            "error"
        );

        return;
    }


    const button =
        document.getElementById(
            "confirmReplaceGameFile"
        );


    setButtonLoading(
        button,
        true,
        "در حال انتشار..."
    );


    const result =
        await replaceGameFile({
            gameId,
            file
        });


    if (!result.success) {

        showToast(
            result.message ||
            "جایگزینی فایل انجام نشد.",
            "error"
        );


        setButtonLoading(
            button,
            false,
            "جایگزینی و انتشار"
        );


        return;
    }


    showToast(
        "فایل بازی با موفقیت جایگزین شد ✅",
        "success"
    );


    closeModal(
        "replaceGameFileModal"
    );


    await renderAdmin();
}


/* =========================
   DELETE GAME
========================= */

async function handleDeleteGame(
    event
) {

    const button =
        event.currentTarget;


    const game =
        findGame(
            button.dataset.gameId
        );


    if (!game) {

        showToast(
            "بازی پیدا نشد.",
            "error"
        );

        return;
    }


    const confirmed =
        window.confirm(
            `بازی «${game.title}» حذف شود؟`
        );


    if (!confirmed) {
        return;
    }


    button.disabled =
        true;


    button.textContent =
        "در حال حذف...";


    const result =
        await deleteGame(
            game.id
        );


    if (!result.success) {

        showToast(
            result.message,
            "error"
        );


        button.disabled =
            false;


        button.textContent =
            "حذف";


        return;
    }


    showToast(
        "بازی حذف شد.",
        "success"
    );


    await renderAdmin();
}


/* =========================
   HELPERS
========================= */

function findGame(gameId) {

    return currentGames
        .find(
            item =>
                Number(item.id) ===
                Number(gameId)
        );
}


function setButtonLoading(
    button,
    loading,
    text
) {

    if (!button) {
        return;
    }


    button.disabled =
        loading;


    button.textContent =
        text;
}
