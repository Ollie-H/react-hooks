import { Project, ProjectInput } from "./types";
import { getEnvironmentConfigItem } from "../../Config";
import useReadApiData from "../../Hooks/UseReadApiData";
import useWriteApiData from "../../Hooks/UseWriteApiData";
import axios from "axios";
import { mapProjectInputToProject } from "./mappings";

export const useGetProjects = () => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/organisations/:organisation/projects`;
  return useReadApiData<Project[]>({ url, initialData: [] });
};

export const useGetProject = (projectId: number) => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/organisations/:organisation/projects/${projectId}`;
  return useReadApiData<Project>({ url, initialData: {} });
};

export const useCreateProject = () => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/organisations/:organisation/projects`;
  return useWriteApiData<ProjectInput>({
    url,
    httpAction: axios.post,
    mapDataToModel: mapProjectInputToProject
  });
};

export const useUpdateProject = (projectId: number) => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/organisations/:organisation/projects/${projectId}`;
  return useWriteApiData<Partial<ProjectInput>>({
    url,
    httpAction: axios.patch,
    mapDataToModel: mapProjectInputToProject
  });
};
