import type { Task, TaskCreate } from "./task";


export interface Topic {
  id: number;
  name: string;
  tasks: Task[];
  created_at: string;
  updated_at: string;
}

export interface TopicCreate {
  name: string;
  tasks?: TaskCreate[]
}
