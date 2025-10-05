import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { Topic } from '@/interfaces/topic'
import { Calendar1, CalendarArrowUp, Ellipsis, ListChecks, Pencil, Percent, Trash } from 'lucide-react'
import { Separator } from '../ui/separator'
import { TooltipButton } from '../tooltip-btn/TooltipButton'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { DialogComponent } from '../shared/Dialog/DialogComponent'

type TopicSheetType = {
    topic: Topic | null,
    open: boolean,
    onOpenChange: (open: boolean) => void;
    onUpdateValue: () => void;
}

export function TopicSheet({topic, open, onOpenChange, onUpdateValue}: TopicSheetType) {
    const [confirmDialog, setConfirmDialog] = useState(false);
    
    function getTotalFinished(): string {
        if(topic) {
            const tasks = topic?.tasks || [];
            const finishedTasks = tasks?.filter(item => item.status == "CONCLUIDO");
            if(tasks.length == 0) return "0";
            return `${((finishedTasks!.length / tasks!.length) * 100).toFixed(0)}%`
        }
        return "";
    }

    function editTopic(): void {

    }

    function deleteTopic(): void {

        onOpenChange(false);
        setConfirmDialog(false);
        onUpdateValue();
    }

    return (
        <>
            <DialogComponent
                title="Confirmar exclusão"
                saveBtnName="Excluir"
                open={confirmDialog}
                onOpenChange={setConfirmDialog}
                saveBtn={deleteTopic}
            >
                <p>Deseja confirmar a exclusão do tópico <strong>{topic?.name}</strong>?</p>
            </DialogComponent>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                <div className='max-w-11/12'>
                                    <h3>{topic && topic.name}</h3>
                                </div>
                            </SheetTitle>
                            <SheetDescription className="flex items-center justify-between">
                                <p>Detalhes de tópico</p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="ghost">
                                            <Ellipsis />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="max-w-fit mr-5">
                                        <DropdownMenuLabel className="text-center">Opções</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={editTopic}><Pencil /> Editar</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setConfirmDialog(true)}><Trash /> Excluir</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                
                            </SheetDescription>
                            <Separator className="my-4 mt-2" />
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
                            <div className="flex gap-2"></div>
                        </SheetHeader>
                        <div className="flex flex-col px-3 w-full">
                            <h2 className="font-semibold">Atividades</h2>
                            <Separator className="my-4" />
                        </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
