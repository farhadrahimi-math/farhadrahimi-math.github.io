import { supabase } from "./config.js";

export async function login(phone, password) {

    const email = `${phone}@school.local`;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return {
            success: false,
            message: "شماره یا رمز عبور اشتباه است."
        };
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

    if (profileError) {
        return {
            success: false,
            message: "اطلاعات کاربر پیدا نشد."
        };
    }

    if (!profile.is_active) {

        await supabase.auth.signOut();

        return {
            success: false,
            message: "حساب شما غیرفعال است."
        };
    }

    return {
        success: true,
        profile
    };

}
export async function getCurrentUser() {

    const { data } = await supabase.auth.getUser();

    return data.user;

}
export async function logout() {

    await supabase.auth.signOut();

    location.hash = "login";

}
export async function requireAuth() {

    const { data } = await supabase.auth.getUser();

    if (!data.user) {

        location.hash = "login";
        return null;

    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

    if (!profile) {

        await logout();
        return null;

    }

    if (!profile.is_active) {

        alert("حساب شما توسط مدیر غیرفعال شده است.");

        await logout();

        return null;

    }

    return profile;

}
export function watchProfile(profileId) {

    return supabase
        .channel("profile-status")
        .on(
            "postgres_changes",
            {
                event: "UPDATE",
                schema: "public",
                table: "profiles",
                filter: `id=eq.${profileId}`
            },
            async (payload) => {

                if (!payload.new.is_active) {

                    alert("حساب شما توسط مدیر غیرفعال شده است.");

                    await logout();

                }

            }
        )
        .subscribe();

}
