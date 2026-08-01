export function createStatsCard(stats) {

    return `

        <div class="stats-grid">

            <div class="stat-card">

                <span class="stat-value">

                    ${stats.exams}

                </span>

                <span class="stat-title">

                    آزمون

                </span>

            </div>

            <div class="stat-card">

                <span class="stat-value">

                    ${stats.average}

                </span>

                <span class="stat-title">

                    میانگین

                </span>

            </div>

        </div>

    `;

}
