import { getBaseApi } from "./BaseAPIHelper";
import { Project } from "../Content/Portfolio/Projects/Data/project";

const baseInfoCard = getBaseApi() + "/projects";

export const getProjects = async (): Promise<Project[]> => {
  const result = await fetch(baseInfoCard, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await result.json();
};

export const updateProject = async (project: Project) => {
  const result = await fetch(baseInfoCard + "/updateproject", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token") || "",
    },
    body: JSON.stringify({ project: project }),
  });
  return await result.json();
};

export const addNewProject = async (project: Project) => {
  const result = await fetch(baseInfoCard, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token") || "",
    },
    body: JSON.stringify({ project: project }),
  });
  return await result.json();
};

export const deleteProject = async (id: number) => {
  const result = await fetch(baseInfoCard + "/deleteproject", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token") || "",
    },
    body: JSON.stringify({ id: id }),
  });
  return await result.json();
};
