import { login } from "../auth.js";
import { createAuthLayout } from "../components/authLayout.js";
import { createInput } from "../components/input.js";
import { createButton } from "../components/button.js";
import { showToast } from "../components/toast.js";
import { navigate } from "../utils/navigation.js";

export function renderLogin() {

    const content = `

        <div class="login">

            ${createInput({
                id: "phone",
                label: "شماره موبایل",
                type: "tel",
                placeholder: "09123456789"
            })}

            ${createInput({
                id: "password",
                label: "رمز عبور",
                type: "password",
                placeholder: "رمز عبور"
            })}

            ${createButton({
                id: "loginBtn",
                text: "ورود به سامانه"
            })}

        </div>

    `;

    document.getElementById("app").innerHTML =
    createAuthLayout(content, "ورود به سامانه");

    document
        .getElementById("loginBtn")
        .addEventListener("click", handleLogin);

}

async function handleLogin() {

    const phone = document
        .getElementById("phone")
        .value
        .trim()
        .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

    const password =
        document.getElementById("password").value;

    const button =
        document.getElementById("loginBtn");

    button.disabled = true;
    button.textContent = "در حال ورود...";

    const result = await login(phone, password);

    if (result.success) {

        showToast(
            "خوش آمدید 🌹",
            "success"
        );

        location.hash = "dashboard";

    } else {

        showToast(
            result.message,
            "error"
        );

        button.disabled = false;
        button.textContent = "ورود به سامانه";

    }

}
