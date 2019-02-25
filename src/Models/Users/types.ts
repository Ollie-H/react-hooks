export interface User {
  id: number;
  change_password_on_login: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  is_verified: boolean;
  profile_image: string;
  profile_colour: string;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface UserInput {
  id: number;
  change_password_on_login: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  is_verified: boolean;
  profile_colour: string;
  accessToken: string | null;
  refreshToken: string | null;
  password?: string;
  profile_image: File;
}

export interface User2Fa {
  token: string;
}

export interface UserOrganisation {
  id: number;
  user: number;
  organisation: number;
  status: number;
}

export interface UserVerifyEmailInput {
  email: string;
}

export interface UserVerifyEmail {}

export interface RegisterProps {
  user: User;
  organisation: any;
}

export interface LoginProps {
  username: string;
  password: string;
}

export interface AuthenticationToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_interface: string;
}

export interface CurrentUserLocalStorage {
  user: User;
  authentication: AuthenticationToken;
  organisation: UserOrganisation;
}

export type CurrentUserState = {
  Auth: Partial<AuthenticationToken>;
  Organisation: Partial<UserOrganisation>;
  User: Partial<User>;
};
