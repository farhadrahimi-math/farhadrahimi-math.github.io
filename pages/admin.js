import { createAppLayout } from "../components/appLayout.js";

import {
    getStudents,
    setStudentActive,
    createStudent
} from "../services/studentService.js";

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


export async function renderAdmin() {

    const profile = getProfile();

    if (!profile || profile.role !== "admin") {
        navigate("dashboard");
        return;
    }

    const students = await getStudents();

    const content = `

        <div class="admin-page">

            <div class="admin-header">

                <div>
                    <h2>مدیریت دانش‌آموزان</h2>
                    <p>${students.length} دانش‌آموز</p>
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
                        ? students.map(createStudentCard).join("")
                        : `
                            <div class="empty-state">
                                هنوز دانش‌آموزی ثبت نشده است.
                            </div>
                        `
                }

            </div>

        </div>

        ${createAddStudentModal()}

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


function createStudentCard(student) {

    return `

        <div
            class="student-card"
            data-user-id="${student.id}">

            <div class="student-info">

                <h3>${student.name}</h3>

                <p>
                    پایه ${student.grade}
                    ${student.phone ? ` • ${student.phone}` : ""}
                </p>

            </div>

            <div class="student-actions">

                <span class="student-status ${
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


function bindAdminEvents() {

    bindModalClose("addStudentModal");

    document
        .getElementById("addStudentBtn")
        ?.addEventListener("click", () => {

            resetAddStudentForm();

            openModal("addStudentModal");

        });

    document
        .querySelector("#addStudentModal .modal-submit")
        ?.addEventListener(
            "click",
            handleCreateStudent
        );

    document
        .getElementById("addStudentForm")
        ?.addEventListener("submit", event => {

            event.preventDefault();

            handleCreateStudent();

        });

    document
        .querySelectorAll(".toggle-student-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                handleStudentStatus
            );

        });
}


function resetAddStudentForm() {

    const form =
        document.getElementById("addStudentForm");

    form?.reset();
}


async function handleCreateStudent() {

    const name =
        document
            .getElementById("studentName")
            ?.value
            .trim();

    const phone =
        document
            .getElementById("studentPhone")
            ?.value
            .trim();

    const password =
        document
            .getElementById("studentPassword")
            ?.value;

    const grade =
        document
            .getElementById("studentGrade")
            ?.value;

    if (!name) {

        showToast(
            "نام دانش‌آموز را وارد کنید.",
            "error"
        );

        return;
    }

    if (!/^09\d{9}$/.test(phone || "")) {

        showToast(
            "شماره موبایل معتبر وارد کنید.",
            "error"
        );

        return;
    }

    if (!password || password.length < 6) {

        showToast(
            "رمز عبور باید حداقل ۶ کاراکتر باشد.",
            "error"
        );

        return;
    }

    if (!["7", "8", "9"].includes(grade)) {

        showToast(
            "پایه دانش‌آموز را انتخاب کنید.",
            "error"
        );

        return;
    }

    const submitButton =
        document.querySelector(
            "#addStudentModal .modal-submit"
        );

    if (submitButton) {

        submitButton.disabled = true;
        submitButton.textContent =
            "در حال ثبت...";

    }

    const result = await createStudent({
        name,
        phone,
        password,
        grade: Number(grade)
    });

    if (!result.success) {

        showToast(
            result.message ||
            "ثبت دانش‌آموز انجام نشد.",
            "error"
        );

        if (submitButton) {

            submitButton.disabled = false;
            submitButton.textContent =
                "ثبت دانش‌آموز";

        }

        return;
    }

    showToast(
        "دانش‌آموز با موفقیت اضافه شد.",
        "success"
    );

    closeModal("addStudentModal");

    await renderAdmin();
}


async function handleStudentStatus(event) {

    const button = event.currentTarget;

    const userId = button.dataset.userId;

    const currentlyActive =
        button.dataset.active === "true";

    const newStatus = !currentlyActive;

    button.disabled = true;

    button.textContent = "در حال تغییر...";

    const result = await setStudentActive(
        userId,
        newStatus
    );

    if (!result.success) {

        showToast(
            result.message,
            "error"
        );

        button.disabled = false;

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
