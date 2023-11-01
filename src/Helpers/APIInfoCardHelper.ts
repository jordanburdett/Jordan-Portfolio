import { getBaseApi } from "./BaseAPIHelper";

const baseInfoCard = getBaseApi() + "/infocard";

export const getInfoCards = async () => {
    console.log("GET ON: " + baseInfoCard + "/getinfocards")
    const result = await fetch(baseInfoCard + "/getinfocards");
    return await result.json();
}