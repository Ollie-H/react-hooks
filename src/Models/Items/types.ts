export interface ProjectItem {
  id: number;
  code: string;
  description: string;
  history: ProjectItem[];
  image: string;
  fabric: string;
  name: string;
  organisation: number;
  project: number;
  season: string;
  size: string;
  active: boolean;
}

export interface ProjectItemInput {
  code: string;
  description: string;
  image: File;
  fabric: string;
  name: string;
  organisation: number;
  project: number;
  season: string;
  size: string;
  active?: boolean;
}
