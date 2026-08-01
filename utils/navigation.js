export function navigate(page, params = {}) {

    const query = new URLSearchParams(params).toString();

    location.hash = query
        ? `${page}?${query}`
        : page;

}

export function getRoute() {

    const hash = location.hash.replace("#", "");

    const [page, query] = hash.split("?");

    return {
        page: page || "login",
        params: Object.fromEntries(
            new URLSearchParams(query || "")
        )
    };

}
