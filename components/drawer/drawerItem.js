export function createDrawerItem({

    id,

    title,

    icon,

    route

}) {

    return `

        <button
            class="drawer-item"
            data-route="${route}"
            id="${id}">

            <i data-lucide="${icon}"></i>

            <span>

                ${title}

            </span>

        </button>

    `;

}
