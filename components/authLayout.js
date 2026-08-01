export function createAuthLayout(content) {

    return `

        <div class="auth-layout">

            <div class="auth-card">

                <img
                    src="assets/images/logo.svg"
                    class="auth-logo"
                    alt="Logo">

                <h1>

                    باشگاه نخبگان ریاضی

                </h1>

                <p>

                    یادگیری • تمرین • پیشرفت

                </p>

                ${content}

            </div>

        </div>

    `;

}
