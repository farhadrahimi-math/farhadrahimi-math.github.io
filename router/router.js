import { renderLogin } from "../pages/login.js";
import { renderDashboard } from "../pages/dashboard.js";
import { renderAdmin } from "../pages/admin.js";
import { renderChapter } from "../pages/chapter.js";
import { renderGame } from "../pages/game.js";

import {
    getCurrentUser,
    watchProfile
} from "../auth.js";

import {
    startSessionWatcher,
    stopSessionWatcher
} from "../session.js";

import { getMyProfile } from "../services/profileService.js";

import {
    getRoute,
    navigate
} from "../utils/navigation.js";


const routes = {
    login: renderLogin,
    dashboard: renderDashboard,
    chapter: renderChapter,
    admin: renderAdmin,
    game: renderGame
};


const publicRoutes = [
    "login",
    "game"
];


let profileChannel = null;
let sessionStarted = false;


export async function router() {

    const { page } = getRoute();

    /*
     * صفحه بازی عمومی است و برای ورود
     * نیازی به Supabase Auth ندارد.
     */
    if (page === "game") {

        stopSessionWatcher();

        await renderGame();

        return;
    }


    const user =
        await getCurrentUser();


    // کاربر وارد نشده
    if (!user) {

        if (profileChannel) {

            await profileChannel.unsubscribe();

            profileChannel = null;
        }

        stopSessionWatcher();

        sessionStarted = false;

        if (!publicRoutes.includes(page)) {

            navigate("login");

            return;
        }

        await renderLogin();

        return;
    }


    // Realtime
    if (!profileChannel) {

        profileChannel =
            watchProfile(user.id);
    }


    // Idle timeout
    if (!sessionStarted) {

        startSessionWatcher();

        sessionStarted = true;
    }


    const profile =
        await getMyProfile();


    if (!profile) {

        return;
    }


    // ورود مدیر
    if (
        page === "login" &&
        profile.role === "admin"
    ) {

        navigate("admin");

        return;
    }


    // ورود دانش‌آموز
    if (page === "login") {

        navigate("dashboard");

        return;
    }


    // جلوگیری از ورود دانش‌آموز به Admin
    if (
        page === "admin" &&
        profile.role !== "admin"
    ) {

        navigate("dashboard");

        return;
    }


    // مدیر نباید Dashboard دانش‌آموز را ببیند
    if (
        page === "dashboard" &&
        profile.role === "admin"
    ) {

        navigate("admin");

        return;
    }


    const render =
        routes[page];


    if (render) {

        await render();

        return;
    }


    document
        .getElementById("app")
        .innerHTML =
        "<h2>صفحه پیدا نشد.</h2>";
}
