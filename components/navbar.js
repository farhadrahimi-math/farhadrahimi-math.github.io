export function createNavbar({

    title = "باشگاه نخبگان ریاضی",

    showBack = false,

    showMenu = true

}) {

    return `

        <header class="navbar">

            <div class="navbar-left">

                ${
                    showBack
                        ? `
                            <button
                                id="backBtn"
                                class="icon-btn">

                                <i data-lucide="arrow-right"></i>

                            </button>
                        `
                        : `
                            <div class="navbar-space"></div>
                        `
                }

            </div>

            <div class="navbar-center">

                <div class="navbar-logo">
    🏆
</div>

                <span class="navbar-title">

                    ${title}

                </span>

            </div>

            <div class="navbar-right">

                ${
                    showMenu
                        ? `
                            <button
                                id="menuBtn"
                                class="icon-btn">

                                <i data-lucide="menu"></i>

                            </button>
                        `
                        : `
                            <div class="navbar-space"></div>
                        `
                }

            </div>

        </header>

    `;

}
