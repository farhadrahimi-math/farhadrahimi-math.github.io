import { createAppLayout } from "../components/appLayout.js";
import { getStudents } from "../services/studentService.js";
import { getProfile } from "../store/appStore.js";
import { initializeLayout } from "../core/layout.js";
import { navigate } from "../utils/navigation.js";

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

            <span class="student-status ${
                student.is_active ? "active" : "inactive"
            }">

                ${student.is_active ? "فعال" : "غیرفعال"}

            </span>

        </div>

    `;
}

function bindAdminEvents() {

    document
        .getElementById("addStudentBtn")
        ?.addEventListener("click", () => {

            console.log("Add student");

        });
}
