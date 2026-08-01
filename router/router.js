import { renderLogin } from "../pages/login.js";
import { renderDashboard } from "../pages/dashboard.js";
import { renderAdmin } from "../pages/admin.js";

import {
    getCurrentUser,
    watchProfile
} from "../auth.js";

import {
    startSessionWatcher,
    stopSessionWatcher
} from "../session.js";

import { getRoute, navigate } from "../utils/navigation.js";

const routes = {
    login: renderLogin,
    dashboard: renderDashboard,
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

    if (user && page === "login") {
        navigate("dashboard");
        return;
    }

    if (!user && page !== "login") {
        navigate("login");
        return;
    }

    const render = routes[page];

    if (render) {
        await render();
    } else {
        document.getElementById("app").innerHTML =
            "<h2>صفحه پیدا نشد.</h2>";
    }

}
