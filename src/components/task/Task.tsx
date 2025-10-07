import type { ITask } from '@/interfaces/task'
import React from 'react'

type TaskProp = {
  task: ITask
}

export function Task({task}: TaskProp) {
  return (
    <div className="min-h-30 border rounded-xl p-3">
      <h2>{task.description}</h2>
    </div>
  )
}
