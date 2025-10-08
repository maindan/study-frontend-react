import React from 'react'
import { Task } from '../task/Task';
import { TaskStatus, type ITask } from '@/interfaces/task';

type TaskListProps = {
  taskList: ITask[];
}

export function TaskScrollList({taskList}:TaskListProps) {
  return (
    <div className="w-full min-h-12/12 max-h-10/12 flex flex-col gap-5 rounded-lg p-4 overflow-y-auto custom-scrollbar">
      {taskList.length > 0 ?
       taskList.map((item) => (
        <Task key={item.id} task={item} />
      )) : <div className='flex flex-1 items-center justify-center'>
        <p>Sem atividades</p>
        </div>}
    </div>
  )
}
