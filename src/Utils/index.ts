import { getUserData, getOrganisationId } from "../Models/Users/utils";

export const toFormData = (formData: any): FormData => {
  const data = new FormData();
  Object.keys(formData).map(key => data.append(key, formData[key]));
  return data;
};

export const formatOrganisationUrl = (url: string): string => {
  const authData = getUserData();
  if (url.indexOf(":organisation") === -1) {
    return url;
  }
  if (!authData || !authData.organisation) {
    throw new Error("User has no organisation defined.");
  }
  return url.replace(
    ":organisation",
    authData.organisation.organisation.toString()
  );
};

export const getAuthBearer = (): {} => {
  const authData = getUserData();
  if (
    authData &&
    authData.authentication &&
    authData.authentication.access_token
  ) {
    return {
      Authorization: authData.authentication.access_token
    };
  } else {
    return {};
  }
};

export const addOrganisationToPayload = <T>(
  data: T
): T & { organisation: number } =>
  Object.assign({}, data, {
    organisation: getOrganisationId()
  });
