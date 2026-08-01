import { supabase } from "../config.js";

export async function getExamResults(userId) {

    const { data, error } = await supabase
        .from("exam_results")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return [];
    }

    return data;

}
