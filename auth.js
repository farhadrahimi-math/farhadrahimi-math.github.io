import { supabase } from "./config.js";

import { navigate } from "./utils/navigation.js";

import {
    setUser,
    setProfile,
    clearStore
} from "./store/appStore.js";

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

    // ذخیره اطلاعات در Store
    setUser(data.user);
    setProfile(profile);

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

    clearStore();

    await supabase.auth.signOut();

    navigate("login");

}

export async function requireAuth() {

    const { data } = await supabase.auth.getUser();

    if (!data.user) {

        navigate("login");

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

        await logout();

        return null;

    }

    setUser(data.user);
    setProfile(profile);

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

                    await logout();

                }

            }
        )
        .subscribe();

}
