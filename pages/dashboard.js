import { createAppLayout } from "../components/appLayout.js";
import { createWelcomeCard } from "../components/dashboard/welcomeCard.js";
import { getDashboardData } from "../services/dashboardService.js";
import { createStatsCard } from "../components/dashboard/statsCard.js";

export async function renderDashboard() {

    const data = await getDashboardData();

    if (!data) {
        return;
    }

    const content = `

        ${createWelcomeCard(data.profile)}

        ${createStatsCard(data.stats)}

        <div id="dashboardContent">

        </div>

    `;

    document.getElementById("app").innerHTML =
        createAppLayout(content, "داشبورد");

}
