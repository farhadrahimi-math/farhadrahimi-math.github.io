export function createActionCard({
    title,
    subtitle,
    icon,
    color = "primary",
    route = "",
    data = ""
}) {

    return `
        <button
            class="action-card"
            data-route="${route}"
            ${data}>

            <div class="action-card-icon ${color}">

                <i data-lucide="${icon}"></i>

            </div>

            <div class="action-card-content">

                <h3>${title}</h3>

                <p>${subtitle}</p>

            </div>

            <i
                data-lucide="chevron-left"
                class="action-card-arrow">
            </i>

        </button>
    `;

}
