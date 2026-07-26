export function renderDashboard() {
    document.getElementById("app").innerHTML = `
        <h1>داشبورد</h1>

        <button onclick="location.hash='admin'">
            پنل ادمین
        </button>
    `;
}
