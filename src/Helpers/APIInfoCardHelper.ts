import { getBaseApi } from "./BaseAPIHelper";

const baseInfoCard = getBaseApi() + "/infocard";

export const getInfoCards = async () => {
    const result = await fetch(baseInfoCard + "/getinfocards");
    return await result.json();
}