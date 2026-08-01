import { supabase } from "../config.js";

import {
    setUser,
    setProfile
} from "../store/appStore.js";

export async function restoreSession() {

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return false;
    }

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error || !profile) {
        return false;
    }

    if (!profile.is_active) {
        return false;
    }

    setUser(user);
    setProfile(profile);

    return true;

}
