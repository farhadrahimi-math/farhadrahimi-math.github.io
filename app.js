import { renderLogin } from "./pages/login.js";
import { renderDashboard } from "./pages/dashboard.js";
import { renderAdmin } from "./pages/admin.js";

import { getCurrentUser, watchProfile } from "./auth.js";

const routes = {
    login: renderLogin,
    dashboard: renderDashboard,
    admin: renderAdmin,
};

let profileChannel = null;

async function router() {

    const page = location.hash.replace("#", "") || "login";

    const user = await getCurrentUser();

    // اگر کاربر وارد شده باشد، فقط یک بار Realtime را فعال کن
    if (user && !profileChannel) {
        profileChannel = watchProfile(user.id);
    }

    // اگر کاربر وارد شده باشد و صفحه login را باز کند
    if (user && page === "login") {
        location.hash = "dashboard";
        return;
    }

    // اگر وارد نشده باشد
    if (!user && page !== "login") {

        if (profileChannel) {
            await profileChannel.unsubscribe();
            profileChannel = null;
        }

        location.hash = "login";
        return;
    }

    // نمایش صفحه
    if (routes[page]) {
        routes[page]();
    } else {
        document.getElementById("app").innerHTML =
            "<h2>صفحه پیدا نشد</h2>";
    }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
