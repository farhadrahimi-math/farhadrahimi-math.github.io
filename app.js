import { renderLogin } from "./pages/login.js";
import { renderDashboard } from "./pages/dashboard.js";
import { renderAdmin } from "./pages/admin.js";

const routes = {
    login: renderLogin,
    dashboard: renderDashboard,
    admin: renderAdmin,
};

function router() {
    const page = location.hash.replace("#", "") || "login";

    if (routes[page]) {
        routes[page]();
    } else {
        document.getElementById("app").innerHTML = `
            <h2>صفحه پیدا نشد</h2>
        `;
    }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
