export function createCard({
    title,
    subtitle = "",
    icon = "book-open",
    data = ""
}) {

    return `
        <div class="card" ${data}>

            <div class="card-icon">
                <i data-lucide="${icon}"></i>
            </div>

            <div class="card-content">

                <h3>${title}</h3>

                <p>${subtitle}</p>

            </div>

            <div class="card-arrow">
                <i data-lucide="chevron-left"></i>
            </div>

        </div>
    `;

}
