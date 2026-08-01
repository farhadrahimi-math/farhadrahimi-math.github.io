import { navigate } from "../../utils/navigation.js";
import { logout } from "../../auth.js";

let initialized = false;

export function bindDrawerEvents() {

    if (initialized) return;

    const menuBtn = document.getElementById("menuBtn");
    const drawer = document.getElementById("drawer");
    const overlay = document.getElementById("drawerOverlay");

    if (!menuBtn || !drawer || !overlay) return;

    initialized = true;

    menuBtn.addEventListener("click", openDrawer);

    overlay.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeDrawer();
        }

    });

    document.addEventListener("click", handleDrawerItemClick);

}

function openDrawer() {

    const drawer = document.getElementById("drawer");
    const overlay = document.getElementById("drawerOverlay");

    if (!drawer || !overlay) return;

    drawer.classList.add("open");
    overlay.classList.add("open");

    document.body.style.overflow = "hidden";

}

export function closeDrawer() {

    const drawer = document.getElementById("drawer");
    const overlay = document.getElementById("drawerOverlay");

    if (!drawer || !overlay) return;

    drawer.classList.remove("open");
    overlay.classList.remove("open");

    document.body.style.overflow = "";

}

async function handleDrawerItemClick(event) {

    const button = event.target.closest(".drawer-item");

    if (!button) return;

    closeDrawer();

    const route = button.dataset.route;

    if (route === "logout") {

        await logout();

        return;

    }

    navigate(route);

}
