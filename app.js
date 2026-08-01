import { renderLogin } from "./pages/login.js";
import { renderDashboard } from "./pages/dashboard.js";
import { renderAdmin } from "./pages/admin.js";

import { getCurrentUser, watchProfile } from "./auth.js";
import { startSessionWatcher, stopSessionWatcher } from "./session.js";

const routes = {
    login: renderLogin,
    dashboard: renderDashboard,
    admin: renderAdmin,
};

let profileChannel = null;
let sessionStarted = false;

async function router() {

    const page = location.hash.replace("#", "") || "login";

    const user = await getCurrentUser();

    // اگر کاربر وارد شده باشد
    if (user) {

        // فقط یک بار Realtime را فعال کن
        if (!profileChannel) {
            profileChannel = watchProfile(user.id);
        }

        // فقط یک بار تایمر عدم فعالیت را فعال کن
        if (!sessionStarted) {
            startSessionWatcher();
            sessionStarted = true;
        }

    } else {

        // بستن Realtime
        if (profileChannel) {
            await profileChannel.unsubscribe();
            profileChannel = null;
        }

        // توقف تایمر
        stopSessionWatcher();
        sessionStarted = false;
    }

    // اگر کاربر وارد شده باشد و login را باز کند
    if (user && page === "login") {
        location.hash = "dashboard";
        return;
    }

    // اگر وارد نشده باشد
    if (!user && page !== "login") {
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
