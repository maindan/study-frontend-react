import React from 'react'
import { TaskComponent } from '../Task/TaskComponent';
import { TaskStatus, type ITask } from '@/interfaces/task';

type TaskListProps = {
  taskList: ITask[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onStartTask: (id: number) => void;
  onFinishTask: (id: number) => void;
}

export function TaskScrollList({taskList, onEdit, onDelete, onStartTask, onFinishTask}:TaskListProps) {
  return (
    <div className="w-full min-h-12/12 max-h-10/12 flex flex-col gap-5 rounded-lg p-4 overflow-y-auto custom-scrollbar">
      {taskList.length > 0 ?
       taskList.map((item) => (
        <TaskComponent key={item.id} task={item} onEdit={onEdit} onDelete={onDelete} onStartTask={onStartTask} onFinishTask={onFinishTask} />
      )) : <div className='flex flex-1 items-center justify-center'>
        <p>Sem atividades</p>
        </div>}
    </div>
  )
}
