import { renderLogin } from "./pages/login.js";
import { renderDashboard } from "./pages/dashboard.js";
import { renderAdmin } from "./pages/admin.js";

import { getCurrentUser } from "./auth.js";

const routes = {
    login: renderLogin,
    dashboard: renderDashboard,
    admin: renderAdmin,
};

async function router() {

    const page = location.hash.replace("#", "") || "login";

    const user = await getCurrentUser();

    // اگر کاربر وارد شده باشد و به login برود
    if (user && page === "login") {
        location.hash = "dashboard";
        return;
    }

    // اگر وارد نشده باشد و بخواهد صفحات دیگر را ببیند
    if (!user && page !== "login") {
        location.hash = "login";
        return;
    }

    if (routes[page]) {
        routes[page]();
    } else {
        document.getElementById("app").innerHTML =
            "<h2>صفحه پیدا نشد</h2>";
    }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
