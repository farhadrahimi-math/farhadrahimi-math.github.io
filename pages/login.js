import { login } from "../auth.js";

export function renderLogin() {

    document.getElementById("app").innerHTML = `

        <div class="login">

            <div class="login-header">

                <img
                    src="assets/images/logo.svg"
                    class="logo"
                    alt="باشگاه نخبگان ریاضی">

                <h1>باشگاه نخبگان ریاضی</h1>

                <p>
                    یادگیری • تمرین • پیشرفت
                </p>

            </div>

            <div class="form-group">

                <label>شماره موبایل</label>

                <input
                    id="phone"
                    type="tel"
                    placeholder="09123456789">

            </div>

            <div class="form-group">

                <label>رمز عبور</label>

                <input
                    id="password"
                    type="password"
                    placeholder="رمز عبور">

            </div>

            <button id="loginBtn">

                ورود به سامانه

            </button>

            <p id="message"></p>

        </div>

    `;

    document
        .getElementById("loginBtn")
        .addEventListener("click", async () => {

            const phone = document
                .getElementById("phone")
                .value
                .trim()
                .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

            const password =
                document.getElementById("password").value;

            const result =
                await login(phone, password);

            if (result.success) {

                location.hash = "dashboard";

            } else {

                document.getElementById("message").textContent =
                    result.message;

            }

        });

}
