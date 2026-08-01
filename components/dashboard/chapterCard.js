export function createChapterCard({
    number,
    title,
    status = "not-started"
}) {

    const statusMap = {
        completed: {
            text: "تکمیل شده",
            className: "completed"
        },
        progress: {
            text: "در حال یادگیری",
            className: "progress"
        },
        "not-started": {
            text: "شروع نشده",
            className: "not-started"
        }
    };

    const current = statusMap[status];

    return `
        <div class="chapter-card"
             data-chapter="${number}">

            <div class="chapter-number">
                ${number}
            </div>

            <div class="chapter-info">

                <h3>${title}</h3>

                <p class="chapter-status ${current.className}">
                    ${current.text}
                </p>

            </div>

        </div>
    `;

}
