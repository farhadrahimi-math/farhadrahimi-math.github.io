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

export async function createStudent({
    name,
    phone,
    password,
    grade
}) {

    try {

        const { data, error } =
            await supabase.functions.invoke(
                "create-student",
                {
                    body: {
                        name,
                        phone,
                        password,
                        grade: Number(grade)
                    }
                }
            );

        if (error) {

            console.error(
                "Create student function error:",
                error
            );

            return {
                success: false,
                message:
                    "ساخت دانش‌آموز انجام نشد."
            };
        }

        if (!data?.success) {

            return {
                success: false,
                message:
                    data?.message ||
                    "ساخت دانش‌آموز انجام نشد."
            };
        }

        return {
            success: true,
            userId: data.userId
        };

    } catch (error) {

        console.error(
            "Create student error:",
            error
        );

        return {
            success: false,
            message:
                "خطا در ارتباط با سرور."
        };
    }
}
