import { createChapterCard } from "./chapterCard.js";
import { createSection } from "../section.js";

export function createChapterList(chapters) {

    const cards = chapters
        .map((chapter, index) =>
            createChapterCard(index, chapter)
        )
        .join("");

    return createSection({
        title: "فصل‌های ریاضی",
        icon: "book-open",
        content: cards
    });

}
