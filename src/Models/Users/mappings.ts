import { UserInput } from "./types";
import { toFormData } from "../../Utils";

export const mapUserWriteUpdate = (userForm: UserInput): FormData => {
  if (
    (userForm.profile_image && !(userForm.profile_image as any).preview) ||
    typeof userForm.profile_image === "string"
  ) {
    delete userForm.profile_image;
  }
  return toFormData(userForm);
};
