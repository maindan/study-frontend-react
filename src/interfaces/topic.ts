import type { ITask, ITaskCreate } from "./task";


export interface Topic {
  id: number;
  name: string;
  tasks: ITask[];
  created_at: string;
  updated_at: string;
}

export interface TopicCreate {
  name: string;
  tasks?: ITaskCreate[]
}
