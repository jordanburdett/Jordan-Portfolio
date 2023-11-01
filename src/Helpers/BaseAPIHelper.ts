export const getBaseApi = () => {
    if (window.location.hostname === "localhost") {
        return "http://localhost:3000/api";
    }

    return window.location.origin + "/api";
}