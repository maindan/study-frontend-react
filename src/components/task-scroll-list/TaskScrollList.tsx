import React from 'react'
import { Task } from '../task/Task';
import { TaskStatus, type ITask } from '@/interfaces/task';

export function TaskScrollList() {
const items: ITask[] = [
  {
    id: 1,
    description: "Revisar documentação do projeto",
    status: TaskStatus.PENDENTE,
    topic_id: 2,
    created_at: "2025-10-07T10:00:00Z",
    updated_at: "2025-10-07T10:00:00Z",
  },
  {
    id: 2,
    description: "Implementar autenticação com JWT",
    status: TaskStatus.EM_ANDAMENTO,
    topic_id: 3,
    created_at: "2025-10-06T14:30:00Z",
    updated_at: "2025-10-07T08:00:00Z",
  },
  {
    id: 3,
    description: "Criar testes unitários para o módulo de tarefas",
    status: TaskStatus.PENDENTE,
    topic_id: 3,
    created_at: "2025-10-05T09:15:00Z",
    updated_at: "2025-10-05T09:15:00Z",
  },
  {
    id: 4,
    description: "Refatorar componentes de interface",
    status: TaskStatus.CONCLUIDO,
    topic_id: 1,
    created_at: "2025-09-30T16:00:00Z",
    updated_at: "2025-10-01T12:45:00Z",
  },
  {
    id: 5,
    description: "Configurar pipeline de CI/CD no GitHub Actions",
    status: TaskStatus.EM_ANDAMENTO,
    topic_id: 4,
    created_at: "2025-10-03T11:20:00Z",
    updated_at: "2025-10-07T09:10:00Z",
  },
]; 
  return (
    <div className="w-full min-h-10/12 max-h-10/12 flex flex-col gap-5 border rounded-xl p-4 overflow-y-auto">
      {items && items.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  )
}
