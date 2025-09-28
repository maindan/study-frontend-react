import { ClipboardList } from 'lucide-react'
import React from 'react'

export function Topic() {
  return (
    <div className="flex flex-col p-3 w-full h-full border-2 rounded-2xl bg-gray-950 text-white">
        <div className="flex w-full items-center gap-2">
            <ClipboardList />
            <h4 className="text-md">Nome do tópico</h4>
        </div>
    </div>
  )
}
