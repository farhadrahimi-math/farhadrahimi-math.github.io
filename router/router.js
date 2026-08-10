import { renderLogin } from "../pages/login.js";
import { renderDashboard } from "../pages/dashboard.js";
import { renderAdmin } from "../pages/admin.js";
import { renderChapter } from "../pages/chapter.js";

import {
    getCurrentUser,
    watchProfile
} from "../auth.js";

import {
    startSessionWatcher,
    stopSessionWatcher
} from "../session.js";

import {
    getProfile
} from "../store/appStore.js";

import {
    getRoute,
    navigate
} from "../utils/navigation.js";

const routes = {
    login: renderLogin,
    dashboard: renderDashboard,
    chapter: renderChapter,
    admin: renderAdmin,
};

let profileChannel = null;
let sessionStarted = false;

export async function router() {

    const { page } = getRoute();

    const user = await getCurrentUser();

    if (user) {

        if (!profileChannel) {
            profileChannel = watchProfile(user.id);
        }

        if (!sessionStarted) {
            startSessionWatcher();
            sessionStarted = true;
        }

    } else {

        if (profileChannel) {
            await profileChannel.unsubscribe();
            profileChannel = null;
        }

        stopSessionWatcher();
        sessionStarted = false;
    }

    // کاربر وارد نشده
    if (!user) {

        if (page !== "login") {
            navigate("login");
        }

        return;
    }

    const profile = getProfile();

    if (!profile) {
        return;
    }

    // کاربر واردشده دوباره Login را باز کرده
    if (page === "login") {

        if (profile.role === "admin") {
            navigate("admin");
        } else {
            navigate("dashboard");
        }

        return;
    }

    // دانش‌آموز اجازه ورود به پنل مدیریت ندارد
    if (
        page === "admin" &&
        profile.role !== "admin"
    ) {
        navigate("dashboard");
        return;
    }

    // مدیر وارد داشبورد دانش‌آموز نشود
    if (
        page === "dashboard" &&
        profile.role === "admin"
    ) {
        navigate("admin");
        return;
    }

    const render = routes[page];

    if (render) {
        await render();
        return;
    }

    document.getElementById("app").innerHTML =
        "<h2>صفحه پیدا نشد.</h2>";
}
