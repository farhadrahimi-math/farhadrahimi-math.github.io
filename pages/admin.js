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
    getChapterOptions,
    bindGameFilters
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


let currentStudents = [];
let currentGames = [];
let adminSection = "home";


function createAddStudentModal() {

    const content = `

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
                placeholder: "حداقل ۶ کاراکتر"
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
        content,
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


export async function renderAdmin() {

    const profile = getProfile();

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


    currentStudents = students;
    currentGames = games;


    const content = `

        <div class="admin-shell">

            <div id="adminContent">
                ${renderCurrentSection()}
            </div>

        </div>

        ${createAddStudentModal()}

        ${createGameModal()}

        ${createReplaceGameFileModal()}

    `;


    document.getElementById("app").innerHTML =
        createAppLayout({
            title: "پنل مدیریت",
            content,
            profile,
            showBack: false
        });


    initializeLayout();

    bindAdminEvents();
}


function renderCurrentSection() {

    if (adminSection === "students") {
        return createStudentsPage();
    }

    if (adminSection === "games") {
        return createGamesPage();
    }

    return createAdminHome();
}


function createAdminHome() {

    return `

        <section class="admin-home">

            <div class="admin-hero">

                <div>

                    <span class="admin-eyebrow">
                        باشگاه نخبگان ریاضی
                    </span>

                    <h1>
                        پنل مدیریت
                    </h1>

                    <p>
                        مدیریت بخش‌های سامانه
                        از یک مکان
                    </p>

                </div>

                <div class="admin-hero-icon">
                    🏆
                </div>

            </div>


            <div class="admin-dashboard-grid">

                <button
                    type="button"
                    class="admin-dashboard-card students"
                    data-admin-section="students">

                    <span class="admin-card-icon">
                        👨‍🎓
                    </span>

                    <span class="admin-card-content">

                        <strong>
                            دانش‌آموزان
                        </strong>

                        <small>
                            ${currentStudents.length}
                            دانش‌آموز
                        </small>

                    </span>

                    <span class="admin-card-arrow">
                        ←
                    </span>

                </button>


                <button
                    type="button"
                    class="admin-dashboard-card games"
                    data-admin-section="games">

                    <span class="admin-card-icon">
                        🎮
                    </span>

                    <span class="admin-card-content">

                        <strong>
                            بازی‌ها
                        </strong>

                        <small>
                            ${currentGames.length}
                            بازی منتشرشده
                        </small>

                    </span>

                    <span class="admin-card-arrow">
                        ←
                    </span>

                </button>


                <button
                    type="button"
                    class="admin-dashboard-card exams disabled">

                    <span class="admin-card-icon">
                        📝
                    </span>

                    <span class="admin-card-content">

                        <strong>
                            آزمون‌ها
                        </strong>

                        <small>
                            به‌زودی
                        </small>

                    </span>

                    <span class="admin-coming-soon">
                        به‌زودی
                    </span>

                </button>

            </div>

        </section>

    `;
}


function createStudentsPage() {

    return `

        <section class="admin-section-page">

            ${createAdminSectionHeader(
                "👨‍🎓",
                "مدیریت دانش‌آموزان",
                `${currentStudents.length} دانش‌آموز`
            )}


            <button
                id="addStudentBtn"
                class="admin-primary-action"
                type="button">

                <span>＋</span>

                افزودن دانش‌آموز

            </button>


            <div class="student-list admin-student-list">

                ${
                    currentStudents.length

                        ? currentStudents
                            .map(
                                createStudentCard
                            )
                            .join("")

                        : `

                            <div class="admin-empty">

                                <span>
                                    👨‍🎓
                                </span>

                                <h3>
                                    دانش‌آموزی وجود ندارد
                                </h3>

                                <p>
                                    اولین دانش‌آموز را
                                    اضافه کنید.
                                </p>

                            </div>

                        `
                }

            </div>

        </section>

    `;
}


function createGamesPage() {

    return `

        <section class="admin-section-page">

            ${createAdminSectionHeader(
                "🎮",
                "مدیریت بازی‌ها",
                `${currentGames.length} بازی منتشرشده`
            )}


            ${createGamesSection(
                currentGames
            )}

        </section>

    `;
}


function createAdminSectionHeader(
    icon,
    title,
    subtitle
) {

    return `

        <div class="admin-section-heading">

            <button
                type="button"
                class="admin-back-home"
                data-admin-section="home"
                aria-label="بازگشت">

                →

            </button>


            <div class="admin-section-icon">
                ${icon}
            </div>


            <div>

                <h2>
                    ${title}
                </h2>

                <p>
                    ${subtitle}
                </p>

            </div>

        </div>

    `;
}


function createStudentCard(student) {

    const active =
        Boolean(
            student.is_active
        );


    return `

        <div
            class="student-card admin-student-card"
            data-user-id="${student.id}">


            <div class="student-avatar">

                ${getInitial(
                    student.name
                )}

            </div>


            <div class="student-info">

                <h3>
                    ${escapeHtml(
                        student.name
                    )}
                </h3>

                <p>

                    🎓 پایه
                    ${student.grade || "—"}

                </p>

                ${
                    student.phone

                        ? `

                            <p class="student-phone">

                                📱
                                ${escapeHtml(
                                    student.phone
                                )}

                            </p>

                        `

                        : ""
                }

            </div>


            <div class="student-actions">

                <span
                    class="student-status ${
                        active
                            ? "active"
                            : "inactive"
                    }">

                    ${
                        active
                            ? "● فعال"
                            : "● غیرفعال"
                    }

                </span>


                <button
                    type="button"
                    class="toggle-student-btn"
                    data-user-id="${student.id}"
                    data-active="${active}">

                    ${
                        active
                            ? "غیرفعال کردن"
                            : "فعال کردن"
                    }

                </button>

            </div>

        </div>

    `;
}


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
        .querySelectorAll(
            "[data-admin-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    switchAdminSection(
                        button.dataset
                            .adminSection
                    );
                }
            );

        });


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
        .forEach(button => {

            button.addEventListener(
                "click",
                handleStudentStatus
            );

        });


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
        .forEach(button => {

            button.addEventListener(
                "click",
                handleOpenEditGame
            );

        });


    document
        .querySelectorAll(
            ".replace-game-file-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                handleOpenReplaceGameFile
            );

        });


    document
        .querySelectorAll(
            ".delete-game-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                handleDeleteGame
            );

        });


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
    bindGameFilters();
}


function switchAdminSection(
    section
) {

    adminSection =
        section || "home";


    const container =
        document.getElementById(
            "adminContent"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        renderCurrentSection();


    bindAdminEvents();
}


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


    await refreshAdminData(
        "students"
    );
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


    button.disabled =
        true;


    button.textContent =
        "در حال تغییر...";


    const result =
        await setStudentActive(
            userId,
            !currentlyActive
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
        !currentlyActive
            ? "دانش‌آموز فعال شد."
            : "دانش‌آموز غیرفعال شد.",
        "success"
    );


    await refreshAdminData(
        "students"
    );
}


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


    if (gameId) {

        const game =
            findGame(
                gameId
            );


        if (!game) {
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


        closeModal(
            "gameModal"
        );


        showToast(
            "اطلاعات بازی ویرایش شد.",
            "success"
        );


        await refreshAdminData(
            "games"
        );


        return;
    }


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
            result.message,
            "error"
        );


        setButtonLoading(
            button,
            false,
            "ثبت و انتشار بازی"
        );


        return;
    }


    closeModal(
        "gameModal"
    );


    showToast(
        "بازی با موفقیت منتشر شد 🎮",
        "success"
    );


    await refreshAdminData(
        "games"
    );
}


function handleOpenReplaceGameFile(
    event
) {

    const game =
        findGame(
            event.currentTarget
                .dataset.gameId
        );


    if (!game) {
        return;
    }


    document
        .getElementById(
            "replaceGameId"
        )
        .value =
        game.id;


    document
        .getElementById(
            "replaceGameTitle"
        )
        .textContent =
        `فایل جدید برای «${game.title}»`;


    const fileInput =
        document.getElementById(
            "replaceGameFile"
        );


    if (fileInput) {
        fileInput.value = "";
    }


    const button =
        document.getElementById(
            "confirmReplaceGameFile"
        );


    setButtonLoading(
        button,
        false,
        "جایگزینی و انتشار"
    );


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


    if (!file) {

        showToast(
            "فایل HTML جدید را انتخاب کنید.",
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
            result.message,
            "error"
        );


        setButtonLoading(
            button,
            false,
            "جایگزینی و انتشار"
        );


        return;
    }


    closeModal(
        "replaceGameFileModal"
    );


    showToast(
        "فایل بازی جایگزین شد ✅",
        "success"
    );


    await refreshAdminData(
        "games"
    );
}


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
        return;
    }


    if (
        !window.confirm(
            `بازی «${game.title}» حذف شود؟`
        )
    ) {
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


    await refreshAdminData(
        "games"
    );
}


async function refreshAdminData(
    section = adminSection
) {

    const [
        students,
        games
    ] =
        await Promise.all([
            getStudents(),
            getGames()
        ]);


    currentStudents =
        students;


    currentGames =
        games;


    adminSection =
        section;


    const container =
        document.getElementById(
            "adminContent"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        renderCurrentSection();


    bindAdminEvents();
}


function findGame(gameId) {

    return currentGames.find(
        item =>
            Number(item.id) ===
            Number(gameId)
    );
}


function getInitial(name) {

    const value =
        String(
            name || "?"
        ).trim();


    return escapeHtml(
        value.charAt(0)
            .toUpperCase()
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
