import React, { useEffect, useState } from 'react'
import { DialogComponent } from '../shared/Dialog/DialogComponent'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import api from '@/core/security/interceptor'

type TaskFormModalProps = {
  open: boolean
  onOpenChange: () => void
  onUpdate: () => void
  topicId: number | undefined
  taskToEdit?: {
    id: number
    description: string
  } | null
}

export function TaskFormModal({ open, onOpenChange, onUpdate, topicId, taskToEdit }: TaskFormModalProps) {
  const urlBase = import.meta.env.VITE_API_BASE_URL
  const [description, setDescription] = useState("")
  const isEditMode = !!taskToEdit

  useEffect(() => {
    if (open) {
      setDescription(taskToEdit?.description ?? "")
    }
  }, [open, taskToEdit])

  async function handleSave(): Promise<void> {
    if (!description.trim()) {
      toast.info("Informe a descrição da tarefa")
      return
    }

    try {
      if (isEditMode && taskToEdit?.id) {
        await api.put(`${urlBase}/task/${taskToEdit.id}`, { description })
        toast.success("Tarefa atualizada com sucesso!")
      } else {
        await api.post(`${urlBase}/task`, {
          description,
          topic_id: topicId,
        })
        toast.success("Tarefa criada com sucesso!")
      }

      onOpenChange()
      onUpdate()
    } catch (err) {
      console.error(err)
      toast.error("Ocorreu um erro ao salvar a tarefa")
    }
  }

  return (
    <DialogComponent
      title={isEditMode ? "Editar tarefa" : "Nova tarefa"}
      subtitle={isEditMode ? "Atualize os dados da tarefa" : "Informe os dados da nova tarefa"}
      open={open}
      onOpenChange={onOpenChange}
      saveBtn={handleSave}
    >
      <div className="flex gap-1">
        <Input
          placeholder="Descrição da tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </DialogComponent>
  )
}
