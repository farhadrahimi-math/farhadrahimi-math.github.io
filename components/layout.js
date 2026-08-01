export function createLayout(content) {

    return `

        <div class="app-layout">

            <header class="app-header">

                <img
                    src="assets/images/logo.svg"
                    class="header-logo"
                    alt="Logo">

                <div>

                    <h1>باشگاه نخبگان ریاضی</h1>

                    <p>یادگیری • تمرین • پیشرفت</p>

                </div>

            </header>

            <main class="app-content">

                ${content}

            </main>

            <footer class="app-footer">

                نسخه 1.0.0

            </footer>

        </div>

    `;

}
