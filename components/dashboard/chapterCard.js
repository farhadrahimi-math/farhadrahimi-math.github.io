export function createChapterCard(index, title) {

    return `
        <div class="chapter-card" data-chapter="${index + 1}">

            <div class="chapter-number">
                ${index + 1}
            </div>

            <div class="chapter-info">

                <h3>${title}</h3>

                <p>ورود به فصل</p>

            </div>

        </div>
    `;

}
