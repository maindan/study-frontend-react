import React, { useEffect, useState } from 'react'
import { DialogComponent } from '../shared/Dialog/DialogComponent'
import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { Search } from 'lucide-react'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"
import { toast } from 'sonner'
import api from '@/core/security/interceptor'

type TopicDialogType = {
    open: boolean,
    onOpenChange: () => void,
    onUpdate: () => void
}

export function TopicDialog({open, onOpenChange, onUpdate}: TopicDialogType) {
    const urlBase = import.meta.env.VITE_API_BASE_URL
    const [topicName, setTopicName] = useState("");

    useEffect(() => {setTopicName("")}, [open])

    async function handleSave(): Promise<void> {
        if(topicName) {
            const data = {name: topicName};
            await api.post(urlBase + "/topic", data);
            toast.success("Tópico adicionado com sucesso!");
            onOpenChange();
            onUpdate();
        } else {
            toast.info("Informe o nome do tópico para prosseguir")
        }
    }

    return (
    <DialogComponent
        title="Tópico"
        subtitle="Informe os dados do tópico"
        open={open}
        onOpenChange={onOpenChange}
        saveBtn={handleSave}
        className='w-[400px]'
    >
        <div className="flex gap-1">
            <Input placeholder="Nome do tópico" value={topicName} onChange={(e) => setTopicName(e.target.value)} />
            
        </div>

    </DialogComponent>
    )
}
