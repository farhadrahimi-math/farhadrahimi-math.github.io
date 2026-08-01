export function createNavbar(title = "باشگاه نخبگان ریاضی") {

    return `

        <header class="navbar">

            <div class="navbar-title">

                <img
                    src="assets/images/logo.svg"
                    class="navbar-logo"
                    alt="Logo">

                <span>${title}</span>

            </div>

            <button
                id="menuBtn"
                class="icon-btn">

                <i data-lucide="menu"></i>

            </button>

        </header>

    `;

}
