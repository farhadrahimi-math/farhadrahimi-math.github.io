import { supabase } from "../config.js";

import { chapters } from "../config/chapters.js";

import { getProfile } from "../store/appStore.js";

export async function getChapterData(grade, chapter) {

    const profile = getProfile();

    const title =
        chapters[grade]?.[chapter - 1] || "فصل";

    const { data: contents } = await supabase
        .from("contents")
        .select("*")
        .eq("grade", grade)
        .eq("chapter", chapter);

    const { data: progress } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", profile.id)
        .eq("grade", grade)
        .eq("chapter", chapter)
        .maybeSingle();

    const games =
        (contents || []).filter(item => item.type === "game");

    const videos =
        (contents || []).filter(item => item.type === "video");

    const pdfs =
        (contents || []).filter(item => item.type === "pdf");

    const links =
        (contents || []).filter(item => item.type === "link");

    return {

        title,

        progress,

        games,

        videos,

        pdfs,

        links

    };

}
