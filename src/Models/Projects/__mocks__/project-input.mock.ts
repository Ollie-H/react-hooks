import { ProjectInput } from "../types";

const project: ProjectInput = {
  name: "project name",
  description: "description",
  deadline: new Date(),
  image: {
    lastModified: 1,
    name: "ss",
    size: 1,
    type: "jpg",
    slice: () => null as any
  },
  code: "sssdds",
  season: "AW19",
  category: "sss",
  active: true
};

export default project;
