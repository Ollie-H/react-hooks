import { ProjectItem, ProjectItemInput } from "./types";
import { getEnvironmentConfigItem } from "../../Config";
import useReadApiData from "../../Hooks/UseReadApiData";
import useWriteApiData from "../../Hooks/UseWriteApiData";
import axios from "axios";
import { mapProjectItemsInputToProjectItem } from "./mappings";

export const useGetProjectItems = (projectId: number) => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/organisations/:organisation/projects/${projectId}/items`;
  return useReadApiData<ProjectItem[]>({ url, initialData: [] });
};

export const useCreateProjectItem = (projectId: number) => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/organisations/:organisation/projects/${projectId}/items`;
  return useWriteApiData<ProjectItemInput>({
    url,
    httpAction: axios.post,
    mapDataToModel: mapProjectItemsInputToProjectItem(projectId)
  });
}; 

export const useUpdateProjectItem = (projectId: number, itemId: number) => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/organisations/:organisation/projects/${projectId}/items/${itemId}`;
  return useWriteApiData<Partial<ProjectItemInput>>({
    url,
    httpAction: axios.patch,
    mapDataToModel: mapProjectItemsInputToProjectItem(projectId)
  });
};
