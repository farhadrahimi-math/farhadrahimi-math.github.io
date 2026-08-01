import { getMyProfile } from "./profileService.js";
import { getExamResults } from "./examService.js";
import { chapters } from "../config/chapters.js";

export async function getDashboardData() {

    const profile = await getMyProfile();

    if (!profile) {
        return null;
    }

    const examResults = await getExamResults(profile.id);

    return {

        profile,

        chapters: chapters[profile.grade] || [],

        stats: {

            exams: examResults.length,

            average: calculateAverage(examResults)

        },

        lastExam:
            examResults.length
                ? examResults[0]
                : null

    };

}

function calculateAverage(results) {

    if (!results.length) return 0;

    const total = results.reduce(
        (sum, exam) => sum + exam.score,
        0
    );

    return Math.round(total / results.length);

}
