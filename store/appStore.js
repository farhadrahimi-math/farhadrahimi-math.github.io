const state = {

    user: null,

    profile: null,

    version: "1.0.0"

};

export function getState() {
    return state;
}

export function setUser(user) {
    state.user = user;
}

export function setProfile(profile) {
    state.profile = profile;
}

export function clearStore() {

    state.user = null;

    state.profile = null;

}
