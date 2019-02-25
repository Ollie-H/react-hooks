export interface Project {
  id: number;
  name: string;
  description: string;
  deadline: Date;
  image: string;
  code: string;
  season: string;
  category: string;
  active: boolean;
}

export interface ProjectInput {
  name: string;
  description: string;
  deadline: Date;
  image: File;
  code: string;
  season: string;
  category: string;
  active: boolean;
}
