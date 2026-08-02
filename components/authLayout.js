import { APP } from "../config/constants.js";

export function createAuthLayout(content) {

    return `

        <div class="auth-layout">

            <div class="auth-card">

                <div class="auth-logo">
    🏆
</div>

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
