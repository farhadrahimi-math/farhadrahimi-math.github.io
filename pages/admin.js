export function renderAdmin() {
    document.getElementById("app").innerHTML = `
        <h1>پنل مدیریت</h1>

        <button onclick="location.hash='login'">
            خروج
        </button>
    `;
}
