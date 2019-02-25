import { ProjectInput } from "./types";
import { getOrganisationId } from "../Users/utils";

export const mapProjectInputToProject = (
  project: Partial<ProjectInput>
): Partial<ProjectInput> =>
  ({
    ...project,
    organisation: getOrganisationId(),
    // deadline: moment(project.deadline).format("YYYY-MM-DDThh:mm"),
    active: true
  } as any);
