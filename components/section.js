export function createSection({

    title,

    icon = "",

    content

}) {

    return `

        <section class="section">

            <div class="section-header">

                ${icon ? `<i data-lucide="${icon}"></i>` : ""}

                <h2>${title}</h2>

            </div>

            <div class="section-content">

                ${content}

            </div>

        </section>

    `;

}
