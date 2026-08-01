import { createChapterCard } from "./chapterCard.js";
import { createSection } from "../section.js";

export function createChapterList(grade, chapters) {

    const cards = chapters.map((title, index) => {

        return createChapterCard({

            grade,

            number: index + 1,

            title,

            status: "not_started"

        });

    }).join("");

    return createSection({

        title: "فصل‌های ریاضی",

        icon: "book-open",

        content: cards

    });

}
