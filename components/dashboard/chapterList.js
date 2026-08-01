import { createChapterCard } from "./chapterCard.js";
import { createSection } from "../section.js";

export function createChapterList(chapters) {

    const cards = chapters.map((title, index) => {

        return createChapterCard({
            number: index + 1,
            title,
            status: "not-started"
        });

    }).join("");

    return createSection({
        title: "فصل‌های ریاضی",
        icon: "book-open",
        content: cards
    });

}
