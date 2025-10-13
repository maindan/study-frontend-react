import type { ITask } from '@/interfaces/task'
import { Pause, Pencil, Play, Trash } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import "./task.css"

type TaskProp = {
  task: ITask;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function Task({task, onEdit, onDelete}: TaskProp) {

  function getStatusClass():string {
    if(task.status == "PENDENTE") return "pending"
    else if (task.status == "EM_ANDAMENTO") return "current"
    return "finished";
  }

  function getStatus(): string {
    return task.status.charAt(0).toUpperCase() + task.status.toLocaleLowerCase().slice(1)
  }

  return (
    <div className="min-h-30 rounded-lg p-3 shadow-effect-xl flex flex-col justify-between bg-[#191f36]">
      <h2>{task.description}</h2>
      <div className="flex w-full items-center justify-between">
        <p className={`${getStatusClass()} } px-1 text-[12px] w-fit rounded-md h-5`}>{getStatus()}</p>
        <div className="flex gap-2 justify-end">
          {task.status === "EM_ANDAMENTO" ? 
            (<Button size="icon" className=" cursor-pointer rounded-4xl"><Pause/></Button>):
            (<Button size="icon" className=" cursor-pointer rounded-4xl"><Play/></Button>)
          }
          
          <Button size="icon" className=" cursor-pointer rounded-4xl" variant="ghost" onClick={() => onEdit(task.id)}><Pencil/></Button>
          <Button size="icon" className=" cursor-pointer rounded-4xl" variant="destructive" onClick={() => onDelete(task.id)}><Trash/></Button>
        </div>
      </div>
    </div>
  )
}
