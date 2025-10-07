export interface ITask {
  id: number;
  description: string;
  status: TaskStatus;
  topic_id?: number;
  created_at: string;
  updated_at: string;
}

export interface ITaskCreate {
  description: string;
  status?: TaskStatus;
  topic_id?: number;
}

export const TaskStatus = {
  PENDENTE: "PENDENTE",
  EM_ANDAMENTO: "EM_ANDAMENTO",
  CONCLUIDO: "CONCLUIDO",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
