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
import api from '@/core/security/interceptor'
import { toast } from 'sonner'

type TopicSheetType = {
  topicId: number | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (isDelete?: boolean) => void;
  onEditTopic: (topicId: number) => void;
}

export function TopicSheet({ topicId, open, onOpenChange, onUpdate, onEditTopic }: TopicSheetType) {
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [taskForm, setTaskForm] = useState(false);
  const [taskSelected, setTaskSelected] = useState<ITask | null>(null);
  const [deleteType, setDeleteType] = useState<'topic' | 'task' | null>(null);
  const urlBase = import.meta.env.VITE_API_BASE_URL;

  const queryClient = useQueryClient();
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
    topicId && onEditTopic(topicId);
  }

  async function handleDelete(): Promise<void> {
    try {
      if (deleteType === 'task' && taskSelected) {
        await api.delete(`${urlBase}/task/${taskSelected.id}`);
        toast.success("Atividade deletada com sucesso!");
      } else if (deleteType === 'topic' && topic) {
        await api.delete(`${urlBase}/topic/${topic.id}`);
        setConfirmDialog(false);
        onUpdate(true);
        toast.success("Tópico deletado com sucesso!");
      }
      setConfirmDialog(false);
      setTaskSelected(null);
      setDeleteType(null);
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      refetch();
      onUpdate();
    } catch {
      toast.error("Erro ao deletar.");
    }
  }

  function handleTaskForm(): void {
    setTaskForm(!taskForm);
    if (taskForm) setTaskSelected(null);
  }

  function handleTaskUpdate(): void {
    refetch();
    queryClient.invalidateQueries({ queryKey: ['topics'] });
    onUpdate();
  }

  function handleTaskEdit(id: number): void {
    const task = getTaskById(id);
    if (task) {
      setTaskSelected(task);
      handleTaskForm();
    }
  }

  function handleDeleteDialog(type: 'topic' | 'task', id?: number): void {
    if (type === 'task' && id) {
      const task = getTaskById(id);
      if (task) setTaskSelected(task);
    }
    setDeleteType(type);
    setConfirmDialog(true);
  }

  function getTaskById(id: number): ITask | undefined {
    return topic?.tasks.find((item) => item.id === id);
  }

  return (
    <>
      {/* Confirmação de exclusão */}
      <DialogComponent
        title="Confirmar exclusão"
        saveBtnName="Excluir"
        open={confirmDialog}
        onOpenChange={setConfirmDialog}
        saveBtn={handleDelete}
        className="w-[450px]"
      >
        <p>
          Deseja confirmar a exclusão {deleteType === 'task' ? 'da atividade' : 'do tópico'}
          <strong className="ml-1">
            {deleteType === 'task' ? '' : `“${topic?.name ?? ''}”`}
          </strong>?
        </p>
      </DialogComponent>

      {/* Modal de criação/edição de tarefas */}
      <TaskFormModal
        open={taskForm}
        onOpenChange={handleTaskForm}
        onUpdate={handleTaskUpdate}
        topicId={topic?.id}
        taskToEdit={taskSelected}
      />

      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex flex-col h-screen max-h-screen overflow-hidden bg-slate-950 text-white border-0">
          <SheetHeader>
            <SheetTitle asChild>
              <div className="max-w-11/12">
                {isLoading ? (
                  <Skeleton className="w-[180px] h-6 rounded-md" />
                ) : (
                  <h3 className="text-white">{topic?.name}</h3>
                )}
              </div>
            </SheetTitle>

            <SheetDescription className="flex items-center justify-between">
              {isLoading ? (
                <Skeleton className="w-[120px] h-4 rounded-md" />
              ) : (
                "Detalhes do tópico"
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" className="rounded-4xl cursor-pointer">
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="max-w-fit mr-5">
                  <DropdownMenuLabel className="text-center">Opções</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={editTopic} className="cursor-pointer">
                    <Pencil /> Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteDialog('topic')}
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    <Trash /> Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SheetDescription>

            <Separator className="mt-2" />

            <div className="flex flex-col text-sm text-gray-300 gap-3 mt-2">
              {/* Data de criação */}
              <div className="flex items-center">
                <div className="flex items-center gap-2 min-w-[230px]">
                  <Calendar1 size={18} />
                  <p><strong>Data de criação:</strong></p>
                </div>
                {isLoading ? (
                  <Skeleton className="w-[100px] h-4" />
                ) : (
                  <p>{topic?.created_at?.split('T')[0]}</p>
                )}
              </div>

              {/* Última alteração */}
              <div className="flex items-center">
                <div className="flex items-center gap-2 min-w-[230px]">
                  <CalendarArrowUp size={18} />
                  <p><strong>Última alteração:</strong></p>
                </div>
                {isLoading ? (
                  <Skeleton className="w-[100px] h-4" />
                ) : (
                  <p>{topic?.updated_at?.split('T')[0]}</p>
                )}
              </div>

              {/* Quantidade de atividades */}
              <div className="flex items-center">
                <div className="flex items-center gap-2 min-w-[230px]">
                  <ListChecks size={18} />
                  <p><strong>Quantidade de atividades:</strong></p>
                </div>
                {isLoading ? (
                  <Skeleton className="w-[40px] h-4" />
                ) : (
                  <p>{topic?.tasks?.length ?? 0}</p>
                )}
              </div>

              {/* Total concluído */}
              <div className="flex items-center">
                <div className="flex items-center gap-2 min-w-[230px]">
                  <Percent size={18} />
                  <p><strong>Total concluído:</strong></p>
                </div>
                {isLoading ? (
                  <Skeleton className="w-[50px] h-4" />
                ) : (
                  <p>{getTotalFinished()}</p>
                )}
              </div>
            </div>
          </SheetHeader>

          <div className="flex flex-col px-3 w-full min-h-7/12 max-h-7/12 mt-4">
            <div className="flex items-center justify-between">
              {isLoading ? (
                <Skeleton className="w-[120px] h-5" />
              ) : (
                <h2 className="font-semibold">Atividades</h2>
              )}
              
              <TooltipButton onClick={handleTaskForm} toolTip="Adicionar atividade" className="rounded-4xl">
                <Plus />
              </TooltipButton>
                
            </div>

            <Separator className="my-3" />

            <div className="h-full overflow-y-auto">
              {isLoading ? (
                <div className="flex flex-col gap-5 rounded-lg p-4 overflow-y-auto custom-scrollbar">
                  {Array.from({ length: 1 }).map((_, i) => (
                    <div key={i} className="min-h-30 rounded-lg p-3 shadow-effect-xl flex flex-col gap-2 bg-[#191f36]">
                      <Skeleton className="w-2/3 h-5 rounded" />
                      <Skeleton className="w-1/3 h-3 rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <TaskScrollList
                  taskList={topic?.tasks || []}
                  onEdit={handleTaskEdit}
                  onDelete={(id) => handleDeleteDialog('task', id)}
                />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
