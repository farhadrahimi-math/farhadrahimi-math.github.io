import { supabase } from "../config.js";

export async function getChapterContents(grade, chapter) {

    const { data, error } = await supabase
        .from("contents")
        .select("*")
        .eq("grade", grade)
        .eq("chapter", chapter)
        .order("order_no");

    if (error) {
        console.error(error);
        return [];
    }

    return data;

}

export async function getChapterProgress(userId, grade, chapter) {

    const { data } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("grade", grade)
        .eq("chapter", chapter)
        .maybeSingle();

    return data;

}
