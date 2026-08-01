import { grades } from "../../config/chapters.js";

export function createWelcomeCard(profile) {

    const grade = grades[profile.grade];

    return `

        <div class="welcome-card">

            <div>

                <h2>

                    سلام ${profile.name} 👋

                </h2>

                <p>

                    ${grade.title}

                </p>

            </div>

        </div>

    `;

}
