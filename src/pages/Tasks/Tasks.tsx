import React, { useEffect, useState } from 'react'
import { PageContainer } from '@/components/core/PageContainer/PageContainer'
import { Topic } from '@/components/topic/Topic'
import { useTopic } from '@/hooks/useTopic'
import SplitText from '@/components/SplitText'
import { Button } from '@/components/ui/button'
import {Plus} from 'lucide-react'
import { toast } from 'sonner'
import { useProfileStore } from '@/states/ProfileState'
import { TopicDialog } from '@/components/topic-dialog/TopicDialog'

export function Tasks() {
  const { data: topics, isLoading: topicsLoading, isError: topicsError, error: topicsErrorMsg } = useTopic();
  const profile = useProfileStore((state) => state.getProfile);
  const [topicDialog, setTopicDialog] = useState(false);

  function handleTopicDialog(): void {
    setTopicDialog(!topicDialog);
  }

  useEffect(() => {
    console.log(profile())
  })

  // const {id} = useParams();
  if(topicsLoading) return <p>Carregando...</p>
  if(topicsError) {
    toast.error(String(topicsErrorMsg))
  }

  return (
    <PageContainer>
      <>
        <TopicDialog open={topicDialog} onOpenChange={handleTopicDialog}  />
        <div className="flex flex-col items-start gap-3">
          <SplitText
            text={`Bem vindo ${profile()!.name}!`}
            className="text-2xl font-semibold text-center"
            delay={50}
            duration={0.3}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <div className='flex flex-col w-full bg-black rounded-t-xl'>
            <section className="h-60 border border-black rounded-t-xl bg-black flex items-center justify-center">
              <h2 className="text-white font-bold">Pomodoro</h2>
            </section>
            <section className={`py-4 px-2 h-70 ${topics!.length != 0 ? 'grid grid-cols-1 md:grid-cols-3':''} gap-2 rounded-t-2xl bg-white`}>
              {topics!.map((item) => (
                <Topic key={item.id} />
              ))}
              {
                topics!.length == 0 && 
                <div className="flex flex-col gap-2 w-full h-full items-center justify-center-safe">
                  <p>Nenhum tópico encontrado.</p>
                  <Button className="cursor-pointer" onClick={handleTopicDialog}> <Plus/> Adicionar Tópico</Button>
                </div>
              }
            </section>
          </div>
        </div>
      </>
    </PageContainer>
  )
}
