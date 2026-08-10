import { supabase } from "../config.js";

export async function getStudents() {

    const { data, error } = await supabase
        .from("profiles")
        .select("id, name, phone, grade, is_active, role")
        .eq("role", "student")
        .order("name");

    if (error) {
        console.error("Get students error:", error);
        return [];
    }

    return data;
}
