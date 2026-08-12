export function createModal({
    id,
    title,
    content,
    submitText = "ذخیره"
}) {

    return `
        <div class="modal-overlay" id="${id}">

            <div class="modal-box" role="dialog" aria-modal="true">

                <div class="modal-header">

                    <h3>${title}</h3>

                    <button
                        type="button"
                        class="modal-close"
                        data-modal-close="${id}"
                        aria-label="بستن">
                        ×
                    </button>

                </div>

                <div class="modal-content">
                    ${content}
                </div>

                <div class="modal-actions">

                    <button
                        type="button"
                        class="btn modal-cancel"
                        data-modal-close="${id}">
                        انصراف
                    </button>

                    <button
                        type="submit"
                        class="btn modal-submit">
                        ${submitText}
                    </button>

                </div>

            </div>

        </div>
    `;
}

export function openModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.add("show");

    document.body.classList.add("modal-open");
}

export function closeModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("show");

    document.body.classList.remove("modal-open");
}

export function bindModalClose(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal
        .querySelectorAll(`[data-modal-close="${id}"]`)
        .forEach(button => {

            button.addEventListener("click", () => {
                closeModal(id);
            });

        });

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeModal(id);
        }

    });
}
