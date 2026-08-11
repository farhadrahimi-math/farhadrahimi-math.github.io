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

export async function setStudentActive(userId, isActive) {

    const { error } = await supabase
        .from("profiles")
        .update({
            is_active: isActive
        })
        .eq("id", userId)
        .eq("role", "student");

    if (error) {

        console.error("Update student error:", error);

        return {
            success: false,
            message: "تغییر وضعیت دانش‌آموز انجام نشد."
        };
    }

    return {
        success: true
    };
}
