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

                <button id="addStudentBtn" class="btn">
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

    document
        .getElementById("addStudentBtn")
        ?.addEventListener("click", () => {

            showToast(
                "فرم افزودن دانش‌آموز در مرحله بعد ساخته می‌شود.",
                "info"
            );

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
