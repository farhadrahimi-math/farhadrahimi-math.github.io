export function createHeroCard({
    title,
    subtitle,
    progress = null
}) {

    return `

        <section class="hero-card">

            <div class="hero-content">

                <h1>${title}</h1>

                <p>${subtitle}</p>

                ${
                    progress !== null
                        ? `
                            <div class="hero-progress">

                                <div class="hero-progress-bar">

                                    <div
                                        class="hero-progress-fill"
                                        style="width:${progress}%">
                                    </div>

                                </div>

                                <span>${progress}% پیشرفت</span>

                            </div>
                        `
                        : ""
                }

            </div>

            <div class="hero-pattern"></div>

        </section>

    `;

}
