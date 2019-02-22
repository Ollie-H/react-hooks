import { useEffect } from "react";
import {
  User,
  UserInput,
  User2Fa,
  UserOrganisation,
  UserVerifyEmailInput,
  UserVerifyEmail
} from "./types";
import { getEnvironmentConfigItem } from "../../Config";
import useReadApiData from "../../Hooks/UseReadApiData";
import useWriteApiData from "../../Hooks/UseWriteApiData";
import axios from "axios";
import { mapUserWriteUpdate } from "./mappings";

export const useGetUsers = () => {
  const url = `${getEnvironmentConfigItem("API_BASE_URL")}/users/`;
  return useReadApiData<User[]>({ url, initialData: [] });
};

export const useGetUser = (userId: number) => {
  const url = `${getEnvironmentConfigItem("API_BASE_URL")}/users/${userId}`;
  return useReadApiData<User>({ url, initialData: {} });
};

export const useGetByUsername = (username: string) => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/users/username/${username}`;
  return useReadApiData<User>({ url, initialData: {} });
};

export const useUpdateUser = (userId: number) => {
  const url = `${getEnvironmentConfigItem("API_BASE_URL")}/users/${userId}`;
  return useWriteApiData<UserInput>({
    url,
    httpAction: axios.patch,
    mapDataToModel: mapUserWriteUpdate
  });
};

export const useTwoFactorAuthenticate = (userId: number) => {
  const url = `${getEnvironmentConfigItem("API_BASE_URL")}/users/${userId}/2fa`;
  return useReadApiData<User>({ url, initialData: {} });
};

export const useTwoFactorVerify = (userId: number) => {
  const url = `${getEnvironmentConfigItem("API_BASE_URL")}/users/${userId}/2fa`;
  return useWriteApiData<User2Fa>({ url, httpAction: axios.post });
};

export const useGetOrganisationUserList = () => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/organisations/:organisation/users`;

  const userOrganisation = useReadApiData<UserOrganisation[]>({
    url,
    initialData: {}
  });
  const getUsers = useReadApiData<User[]>({ url, initialData: [] });

  // TODO: This endpoint isn't created to handle multiple
  useEffect(() => {
    const userIds = userOrganisation.data.map(user => user.id).join(",");
    getUsers.performSetUrl(`${url}/?userIds=${userIds}`);
  }, [userOrganisation.data]);

  return getUsers;
};

export const useResendEmail = (userId: number) => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/users/${userId}/verify-email`;
  return useReadApiData<any>({ url, initialData: {} });
};

export const useResetPassword = () => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/users/reset-password`;
  return useWriteApiData<UserVerifyEmailInput>({ url, httpAction: axios.post });
};

// TODO: this doesn't seem correct
export const useResetPasswordVerify = (
  userId: string,
  verificationId: string
) => {
  const url = `${getEnvironmentConfigItem(
    "API_BASE_URL"
  )}/users/${userId}/reset-password/${verificationId}`;
  return useReadApiData<UserVerifyEmail>({ url, initialData: {} });
};
