import { getMyProfile } from "./profileService.js";
import { getExamResults } from "./examService.js";

export async function getDashboardData() {

    const profile = await getMyProfile();

    if (!profile) {
        return null;
    }

    const results = await getExamResults(profile.id);

    return {
        profile,
        results
    };

}
