import React from 'react'
import { PageContainer } from '@/components/core/PageContainer/PageContainer'
import { Topic } from '@/components/topic/Topic'
import { useTopic } from '@/hooks/useTopic'

export function Tasks() {
  const {data, isLoading, isError, error} = useTopic();

  // const {id} = useParams();
  if(isLoading) return <p>Carregando...</p>
  if(isError) return <p>Error: {String(error)}</p>

  return (
    <PageContainer>
      <div className='flex flex-col w-full bg-black rounded-t-xl'>
        <section className="h-60 border border-black rounded-t-xl bg-black flex items-center justify-center">
          <h2 className="text-white font-bold">Pomodoro</h2>
        </section>
        <section className="py-4 px-2 h-70 grid grid-cols-1 md:grid-cols-3 gap-2 rounded-t-2xl bg-white">
          {data!.map((item) => (
            <Topic key={item.id} />
          ))}
        </section>
      </div>
    </PageContainer>
  )
}
