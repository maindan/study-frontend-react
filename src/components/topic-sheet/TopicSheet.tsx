import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Calendar1, CalendarArrowUp, Ellipsis, ListChecks, Pencil, Percent, Plus, Trash } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { DialogComponent } from '../shared/Dialog/DialogComponent'
import { TaskScrollList } from '../task-scroll-list/TaskScrollList'
import { TooltipButton } from '../tooltip-btn/TooltipButton'
import { TaskFormModal } from '../task-form-modal/TaskFormModal'
import type { ITask } from '@/interfaces/task'
import { useTopicById } from '@/hooks/useTopic'
import { Skeleton } from '../ui/skeleton'
import { useQueryClient } from '@tanstack/react-query'

type TopicSheetType = {
  topicId: number | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export function TopicSheet({ topicId, open, onOpenChange, onUpdate }: TopicSheetType) {
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [taskForm, setTaskForm] = useState(false);
  const [taskSelected, setTaskSelected] = useState<ITask | null>(null);
  
  const queryClient = useQueryClient();

  // 🔹 Busca o tópico via React Query
  const { data: topic, isLoading, refetch } = useTopicById(topicId ?? undefined);

  function getTotalFinished(): string {
    if (topic) {
      const tasks = topic.tasks || [];
      const finishedTasks = tasks.filter(item => item.status === "CONCLUIDO");
      if (tasks.length === 0) return "0";
      return `${((finishedTasks.length / tasks.length) * 100).toFixed(0)}%`;
    }
    return "";
  }

  function editTopic(): void {
    // implementar depois
  }

  function deleteTopic(): void {
    // implementar a exclusão
    onOpenChange(false);
    setConfirmDialog(false);
    queryClient.invalidateQueries({ queryKey: ['topics'] });
  }

  function handleTaskForm(): void {
    setTaskForm(!taskForm);
  }
  
  function handleTaskUpdate(): void {
    refetch();
    queryClient.invalidateQueries({ queryKey: ['topics'] });
    onUpdate()
  }

  return (
    <>
      <DialogComponent
        title="Confirmar exclusão"
        saveBtnName="Excluir"
        open={confirmDialog}
        onOpenChange={setConfirmDialog}
        saveBtn={deleteTopic}
        className='w-[450px]'
      >
        <p>Deseja confirmar a exclusão do tópico <strong>{topic?.name}</strong>?</p>
      </DialogComponent>

      <TaskFormModal
        open={taskForm}
        onOpenChange={handleTaskForm}
        onUpdate={handleTaskUpdate}
        topicId={topic?.id}
        taskToEdit={taskSelected}
      />

      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex flex-col h-screen max-h-screen overflow-hidden bg-slate-950 text-white border-0">
          {isLoading ? (
            <div className="flex flex-col gap-4 p-4">
              <Skeleton className="w-1/2 h-6" />
              <Skeleton className="w-full h-40" />
            </div>
          ) : (
            <>
              <SheetHeader>
                <SheetTitle asChild>
                  <div className="max-w-11/12">
                    <h3 className="text-white">{topic?.name}</h3>
                  </div>
                </SheetTitle>

                <SheetDescription className="flex items-center justify-between">
                  Detalhes do tópico
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" className='rounded-4xl cursor-pointer'>
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="max-w-fit mr-5">
                      <DropdownMenuLabel className="text-center">Opções</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={editTopic} className='cursor-pointer'>
                        <Pencil /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setConfirmDialog(true)} variant='destructive' className='cursor-pointer'>
                        <Trash /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SheetDescription>

                <Separator className="mt-2" />

                <div className="flex flex-col text-sm text-gray-300 gap-3">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 min-w-[230px]">
                      <Calendar1 size={18} />
                      <p><strong>Data de criação:</strong></p>
                    </div>
                    <p>{topic?.created_at?.split('T')[0]}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 min-w-[230px]">
                      <CalendarArrowUp size={18} />
                      <p><strong>Última alteração:</strong></p>
                    </div>
                    <p>{topic?.updated_at?.split('T')[0]}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 min-w-[230px]">
                      <ListChecks size={18} />
                      <p><strong>Quantidade de atividades:</strong></p>
                    </div>
                    <p>{topic?.tasks?.length ?? 0}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 min-w-[230px]">
                      <Percent size={18} />
                      <p><strong>Total concluído:</strong></p>
                    </div>
                    <p>{getTotalFinished()}</p>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex flex-col px-3 w-full min-h-7/12 max-h-7/12">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Atividades</h2>
                  <TooltipButton onClick={handleTaskForm} toolTip="Adicionar atividade" className='rounded-4xl'>
                    <Plus />
                  </TooltipButton>
                </div>
                <Separator className="my-3" />
                <div className="h-full overflow-y-auto">
                  <TaskScrollList taskList={topic?.tasks || []} />
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
