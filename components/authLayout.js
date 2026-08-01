import { APP } from "../config/constants.js";

export function createAuthLayout(content) {

    return `

        <div class="auth-layout">

            <div class="auth-card">

                <img
                    src="assets/images/logo.svg"
                    class="auth-logo"
                    alt="${APP.NAME}">

                <h1>

                    ${APP.NAME}

                </h1>

                <p>

                    ${APP.TAGLINE}

                </p>

                ${content}

                <div class="auth-footer">

                    نسخه ${APP.VERSION}

                </div>

            </div>

        </div>

    `;

}
