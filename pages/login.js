export function renderLogin() {
    document.getElementById("app").innerHTML = `
        <h1>ورود</h1>

        <button onclick="location.hash='dashboard'">
            ورود
        </button>
    `;
}
