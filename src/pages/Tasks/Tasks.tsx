import React, { useState, useMemo } from 'react'
import { PageContainer } from '@/components/core/PageContainer/PageContainer'
import { TopicComponent } from '@/components/topic/Topic'
import { useTopic } from '@/hooks/useTopic'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useProfileStore } from '@/states/ProfileState'
import { TopicDialog } from '@/components/topic-dialog/TopicDialog'
import AnimatedContent from '@/components/react-bits/AnimatedContent'
import type { Topic } from '@/interfaces/topic'
import { TopicSheet } from '@/components/topic-sheet/TopicSheet'
import { Skeleton } from '@/components/ui/skeleton'
import { useQueryClient } from '@tanstack/react-query'
import { Paginator } from '@/components/core/Paginator/Paginator'

const ITEMS_PER_PAGE = 6

export function Tasks() {
  const { data: topics, isLoading: topicsLoading, isError: topicsError, error: topicsErrorMsg } = useTopic();
  const profile = useProfileStore((state) => state.getProfile);
  const [topicDialog, setTopicDialog] = useState(false);
  const [topicState, setTopicState] = useState<{ open: boolean, topic: Topic | null }>({
    open: false,
    topic: null,
  });
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const totalItems = topics ? topics.length : 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedTopics = useMemo(() => {
    if (!topics) return [];
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return topics.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [topics, page]);

  function handleTopicSheet(value: boolean) {
    setTopicState(prev => ({
      open: value,
      topic: value ? prev.topic : null,
    }));
  }

  function handleTopicSelected(topic: Topic): void {
    setTopicState({
      open: true,
      topic: topic
    });
  }

  function handleTopicDialog(): void {
    setTopicDialog(!topicDialog);
  }

  function handleTopicUpdate(): void {
    queryClient.invalidateQueries({ queryKey: ['topics'] })
  }

  if (topicsError) {
    toast.error(String(topicsErrorMsg))
  }

  return (
    <PageContainer>
      <>
        <TopicDialog open={topicDialog} onOpenChange={handleTopicDialog} onUpdate={handleTopicUpdate} />
        <TopicSheet topic={topicState.topic} open={topicState.open} onOpenChange={handleTopicSheet} onUpdateValue={handleTopicUpdate} />

        <div className="flex flex-col items-start">
          <div className="flex items-center justify-between w-full mb-2">
            <AnimatedContent
              distance={30}
              direction="vertical"
              reverse={false}
              duration={1.2}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.2}
              delay={0.3}
            >
              <h2 className='font-medium text-xl'>{`Bem vindo ${profile()!.name}!`}</h2>
            </AnimatedContent>
            <Button className="cursor-pointer" onClick={handleTopicDialog}>
              <Plus /> Adicionar Tópico
            </Button>
          </div>

          <div className='flex flex-col w-full bg-black rounded-t-xl'>
            <section className="h-55 border border-black rounded-t-xl bg-black flex items-center justify-center">
              <h2 className="text-white font-bold">Pomodoro</h2>
            </section>
            <section className={`py-4 px-2 h-70 ${topics && topics.length !== 0 ? 'grid grid-cols-1 md:grid-cols-3' : ''} gap-2 rounded-t-2xl bg-white`}>
              {topicsLoading ? (
                <Skeleton className="w-1/3 h-30 rounded-2xl" />
              ) : totalItems > 0 ? (
                <>
                  {paginatedTopics.map((item) => (
                    <div key={item.id} onClick={() => handleTopicSelected(item)}>
                      <TopicComponent topic={item} />
                    </div>
                  ))}                  
                </>
              ) : (
                <div className="flex flex-col gap-2 w-full h-full items-center justify-center-safe">
                  <p>Nenhum tópico encontrado.</p>
                  <Button className="cursor-pointer" onClick={handleTopicDialog}>
                    <Plus /> Adicionar Tópico
                  </Button>
                </div>
              )}
            </section>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center w-full">
              <Paginator
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </>
    </PageContainer>
  )
}
