export function createInput({
    id = "",
    label = "",
    type = "text",
    placeholder = "",
    value = ""
}) {

    return `
        <div class="input-group">

            <label for="${id}">
                ${label}
            </label>

            <input
                id="${id}"
                type="${type}"
                placeholder="${placeholder}"
                value="${value}"
                autocomplete="off">

        </div>
    `;

}
