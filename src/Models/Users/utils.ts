import { CurrentUserLocalStorage } from "./types";
import { getEnvironmentConfigItem } from "../../Config";

export const getUserData = (): CurrentUserLocalStorage | undefined => {
  try {
    const userData =
      window.localStorage.getItem(
        getEnvironmentConfigItem("AUTH_LOCAL_STORAGE")
      ) || "";
    return JSON.parse(userData);
  } catch (e) {
    return undefined;
  }
};

export const removeUserData = (): void => {
  try {
    window.localStorage.removeItem(
      getEnvironmentConfigItem("AUTH_LOCAL_STORAGE")
    );
  } catch (e) {}
};

export const setUserData = (
  currentUserLocalStorage: Partial<CurrentUserLocalStorage>
): void => {
  try {
    window.localStorage.setItem(
      getEnvironmentConfigItem("AUTH_LOCAL_STORAGE"),
      JSON.stringify(currentUserLocalStorage)
    );
  } catch (e) {}
};

export const getOrganisationId = () => {
  const authData = getUserData();
  if (!authData || !authData.organisation) {
    throw new Error("User has no organisation defined.");
  }
  console.log(authData);
  return authData.organisation.organisation;
};
