import { ClipboardList } from 'lucide-react'
import React from 'react'
import { Progress } from '../ui/progress';

export function Topic() {

  const progress = 40;

  return (
    <div className="flex flex-col p-3 w-full h-full border-2 rounded-2xl bg-gray-950 text-white cursor-pointer">
        <div className="flex w-full items-center gap-2">
            {/* <ClipboardList /> */}
            <h4 className="text-md">Nome do tópico</h4>
        </div>
        <div className="flex w-full items-baseline justify-between mb-2">
          <p className='text-sm'>Progresso</p>
          <div className="flex items-baseline gap-1">
            <p className='text-5xl'>0</p>
            <p className='text-sm'>%</p>
          </div>
        </div>
        <Progress value={progress}  className='w-full' />
    </div>
  )
}
