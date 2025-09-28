export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  topic_id?: number;
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  description: string;
  status?: TaskStatus;
  topic_id?: number;
}

export const TaskStatus = {
  PENDENTE: "Pendente",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDO: "Concluído",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
