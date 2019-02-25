import { Organisation, Department, DepartmentInput } from "./types";
import { getEnvironmentConfigItem } from "../../Config";
import useReadApiData from "../../Hooks/UseReadApiData";
import useWriteApiData from "../../Hooks/UseWriteApiData";
import axios from "axios";
import { addOrganisationToPayload } from "../../Utils";

export const useGetDepartments = () => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/organisations/:organisation/departments`;
  return useReadApiData<Department>({ url, initialData: {} });
};

export const useCreateDepartment = () => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/organisations/:organisation/departments`;
  return useWriteApiData<DepartmentInput>({
    url,
    httpAction: axios.post,
    mapDataToModel: addOrganisationToPayload
  });
};

export const useUpdateDepartment = (departmentId: number) => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/organisations/:organisation/departments/${departmentId}`;
  return useWriteApiData<Partial<DepartmentInput>>({
    url,
    httpAction: axios.patch
  });
};
