export function bindDrawerEvents() {

    const menuBtn = document.getElementById("menuBtn");
    const drawer = document.getElementById("drawer");
    const overlay = document.getElementById("drawerOverlay");

    if (!menuBtn || !drawer || !overlay) return;

    menuBtn.addEventListener("click", () => {

        drawer.classList.add("open");
        overlay.classList.add("open");

    });

    overlay.addEventListener("click", closeDrawer);

}

export function closeDrawer() {

    const drawer = document.getElementById("drawer");
    const overlay = document.getElementById("drawerOverlay");

    if (!drawer || !overlay) return;

    drawer.classList.remove("open");
    overlay.classList.remove("open");

}
