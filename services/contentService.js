import { supabase } from "../config.js";

export async function getContents(grade, chapter) {

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
