import type { ITask } from '@/interfaces/task'
import { Play, Trash } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import "./task.css"

type TaskProp = {
  task: ITask
}

export function Task({task}: TaskProp) {

  function getStatusClass() {
    if(task.status == "PENDENTE") return "pending"
    else if (task.status == "EM_ANDAMENTO") return "current"
    return "finished";
  }

  return (
    <div className="min-h-30 border rounded-xl p-3 shadow-effect bg-second flex flex-col justify-between">
      <div className="flex flex-col">
        <h2>{task.description}</h2>
        <p className={`${getStatusClass() } px-1 text-[12px] w-fit rounded-xl h-5`}>{task.status.toLocaleLowerCase()}</p>
      </div>
      <div className="flex mt-auto gap-2 justify-end">
        <Button size="icon" className="h-8 cursor-pointer"><Play/></Button>
        <Button size="icon" className="h-8 cursor-pointer" variant="destructive"><Trash/></Button>
      </div>
    </div>
  )
}
