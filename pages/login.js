import { login } from "../auth.js";

export function renderLogin() {

    document.getElementById("app").innerHTML = `

    <div class="login">

        <h2>ورود</h2>

        <input
            id="phone"
            placeholder="شماره موبایل">

        <input
            id="password"
            type="password"
            placeholder="رمز عبور">

        <button id="loginBtn">
            ورود
        </button>

        <p id="message"></p>

    </div>

    `;

    document
        .getElementById("loginBtn")
        .addEventListener("click", async () => {

            const phone =
                document.getElementById("phone").value.trim();

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
