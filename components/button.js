export function createButton({

    id = "",

    text = "",

    type = "button",

    className = "btn"

}) {

    return `
        <button
            id="${id}"
            type="${type}"
            class="${className}">

            ${text}

        </button>
    `;

}
