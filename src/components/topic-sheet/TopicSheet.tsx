import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { Topic } from '@/interfaces/topic'
import { Calendar1, CalendarArrowUp, ListChecks, Percent } from 'lucide-react'
import { Separator } from '../ui/separator'

type TopicSheetType = {
    topic: Topic | null,
    open: boolean,
    onOpenChange: (open: boolean) => void
}

export function TopicSheet({topic, open, onOpenChange}: TopicSheetType) {
    
    function getTotalFinished(): string {
        if(topic) {
            const tasks = topic?.tasks || [];
            const finishedTasks = tasks?.filter(item => item.status == "CONCLUIDO");
            if(tasks.length == 0) return "0";
            return `${((finishedTasks!.length / tasks!.length) * 100).toFixed(0)}%`
        }
        return "";
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            <div className='max-w-11/12'>
                                <h3>{topic && topic.name}</h3>
                            </div>
                        </SheetTitle>
                        <SheetDescription>
                            Detalhes de tópico
                        </SheetDescription>
                        <Separator className="my-4" />
                        <div className="flex flex-col text-sm text-gray-600 gap-3">
                            <div className="flex gap-2 items-center">
                                <Calendar1 size={18} />
                                <p><strong>Data de criação: </strong></p>
                                <p>{topic?.created_at.split('T')[0]}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <CalendarArrowUp size={18}  />
                                <p><strong>Última alteração: </strong></p>
                                <p>{topic?.updated_at.split('T')[0]}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <ListChecks size={18}  />
                                <p><strong>Quantidade de atividades: </strong></p>
                                <p>{topic?.tasks ? topic.tasks.length : 0}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Percent size={18}  />
                                <p><strong>Total concluído: </strong></p>
                                <p>{getTotalFinished()}</p>
                            </div>
                        </div>
                    </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
