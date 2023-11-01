import { getBaseApi } from "./BaseAPIHelper";

const baseURL = getBaseApi() + "/users";

export const userSignIn = async (email: string, password: string) => {
  const options = {
    method: "POST",
    headers: {
      // http headers if there are any
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  const result = await fetch(baseURL + "/login", options);
  return await result.json();
};

export const userLogOut = () => {
  localStorage.removeItem("token");  
}


