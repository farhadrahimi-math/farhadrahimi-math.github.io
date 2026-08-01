const state = {

    user: null,

    profile: null,

    version: "1.0.0"

};

export function getState() {
    return state;
}

export function getUser() {
    return state.user;
}

export function getProfile() {
    return state.profile;
}

export function setUser(user) {
    state.user = user;
}

export function setProfile(profile) {
    state.profile = profile;
}

export function isAdmin() {
    return state.profile?.role === "admin";
}

export function isStudent() {
    return state.profile?.role === "student";
}

export function clearStore() {

    state.user = null;
    state.profile = null;

}
