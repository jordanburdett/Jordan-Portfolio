const base = window.location.origin;
let baseInfoCard = base + "/infocard";

if (window.location.hostname === "localhost") {
    baseInfoCard = "http://localhost:3000/infocard";
}

export const getInfoCards = async () => {
    console.log("GET ON: " + baseInfoCard + "/getinfocards")
    const result = await fetch(baseInfoCard + "/getinfocards");
    return await result.json();
}