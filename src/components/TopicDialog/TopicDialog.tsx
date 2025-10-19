import React, { useEffect, useState } from 'react'
import { DialogComponent } from '../shared/Dialog/DialogComponent'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import api from '@/core/security/interceptor'
import type { Topic } from '@/interfaces/topic'

type TopicDialogType = {
  open: boolean
  onOpenChange: () => void
  onUpdate: () => void
  topic?: Topic | null
}

export function TopicDialog({ open, onOpenChange, onUpdate, topic }: TopicDialogType) {
  const urlBase = import.meta.env.VITE_API_BASE_URL
  const [topicName, setTopicName] = useState("")

  // Ao abrir o diálogo, define o nome do tópico (para edição)
  useEffect(() => {
    if (open) {
      setTopicName(topic?.name ?? "")
    }
  }, [open, topic])

  async function handleSave(): Promise<void> {
    if (!topicName.trim()) {
      toast.info("Informe o nome do tópico para prosseguir")
      return
    }

    try {
      const data = { name: topicName }

      if (topic?.id) {
        // Edição de tópico existente
        await api.put(`${urlBase}/topic/${topic.id}`, data)
        toast.success("Tópico atualizado com sucesso!")
      } else {
        // Criação de novo tópico
        await api.post(`${urlBase}/topic`, data)
        toast.success("Tópico adicionado com sucesso!")
      }

      onOpenChange()
      onUpdate()
    } catch (error) {
      console.error(error)
      toast.error("Ocorreu um erro ao salvar o tópico.")
    }
  }

  return (
    <DialogComponent
      title={topic ? "Editar Tópico" : "Novo Tópico"}
      subtitle="Informe os dados do tópico"
      open={open}
      onOpenChange={onOpenChange}
      saveBtn={handleSave}
      className="w-[400px]"
    >
      <div className="flex gap-1">
        <Input
          placeholder="Nome do tópico"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
      </div>
    </DialogComponent>
  )
}
