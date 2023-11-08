import { InfoCardType } from "../Content/Home/Data/CardMockData";
import { getBaseApi } from "./BaseAPIHelper";

const baseInfoCard = getBaseApi() + "/infocard";

export const getInfoCards = async () => {
  const result = await fetch(baseInfoCard + "/getinfocards");
  return await result.json();
};

export const getAllInfoCards = async () => {
  const result = await fetch(baseInfoCard, {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token") || "",
    }
  });
  return await result.json() as InfoCardType[];
};

export const updateInfoCard = async (infoCard: InfoCardType) => {
  const result = await fetch(baseInfoCard + "/updateinfocard", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token") || "",
    },
    body: JSON.stringify({ infoCard: infoCard }),
  });
  return await result.json();
};

export const addNewInfoCard = async (infoCard: InfoCardType) => {
  const result = await fetch(baseInfoCard, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token") || "",
    },
    body: JSON.stringify({ infoCard: infoCard }),
  });
  return await result.json();
};
