import { APP } from "../config/constants.js";

export function createHeroCard({
    title,
    subtitle,
    progress = 0,
    message = "امروز هم ادامه بده 🚀"
}) {

    return `

        <section class="hero-card">

            <div class="hero-brand">

                <img
                    src="assets/images/logo.svg"
                    class="hero-logo"
                    alt="${APP.NAME}">

                <div>

                    <span class="hero-app-name">
                        ${APP.NAME}
                    </span>

                </div>

            </div>

            <div class="hero-body">

                <h1>${title}</h1>

                <p>${subtitle}</p>

            </div>

            <div class="hero-progress">

                <div class="hero-progress-bar">

                    <div
                        class="hero-progress-fill"
                        style="width:${progress}%">
                    </div>

                </div>

                <span>${progress}% پیشرفت</span>

            </div>

            <div class="hero-message">

                ${message}

            </div>

            <div class="hero-circle hero-circle-1"></div>
            <div class="hero-circle hero-circle-2"></div>

        </section>

    `;

}
