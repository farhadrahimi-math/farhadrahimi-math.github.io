import { supabase } from "./config.js";

export async function login(phone, password) {

    const email = `${phone}@student.math`;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return {
            success: false,
            message: error.message
        };
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

    if (!profile.is_active) {

        await supabase.auth.signOut();

        return {
            success: false,
            message: "حساب شما غیرفعال است."
        };
    }

    return {
        success: true,
        user: profile
    };
}
