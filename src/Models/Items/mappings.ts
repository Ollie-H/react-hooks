import { ProjectItemInput } from "./types";
import { getOrganisationId } from "../Users/utils";

export const mapProjectItemsInputToProjectItem = (projectId: number) => (
  project: Partial<ProjectItemInput>
): Partial<ProjectItemInput> => ({
  ...project,
  organisation: getOrganisationId(),
  project: projectId,
  // deadline: moment(project.deadline).format("YYYY-MM-DDThh:mm"),
  active: true
});
