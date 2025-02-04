import { AboutType } from "../Content/About/Data/about";
import { getBaseApi } from "./BaseAPIHelper";

const baseAbout = getBaseApi() + "/about";

export const getAbout = async (): Promise<AboutType> => {
  const response = await fetch(baseAbout);
  const data = await response.json();
  return data;
};

export const updateAbout = async (about: AboutType): Promise<AboutType> => {
  const response = await fetch(baseAbout, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token") || "",
    },
    body: JSON.stringify(about),
  });
  const data = await response.json();
  return data;
};
