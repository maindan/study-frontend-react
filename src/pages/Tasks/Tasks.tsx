import { PageContainer } from '@/components/core/PageContainer/PageContainer'
import { Topic } from '@/components/topic/Topic'
import React from 'react'
import { useParams } from 'react-router-dom'

export function Tasks() {

  // const {id} = useParams();
  const list = [1, 2, 3, 4, 5]

  return (
    <PageContainer>
      <div className='flex flex-col w-full'>
        <section className="h-60 border border-black rounded-t-xl bg-black flex items-center justify-center">
          <h2 className="text-white font-bold">Pomodoro</h2>
        </section>
        <section className="py-4 h-70 grid grid-cols-1 md:grid-cols-3 gap-2">
          {list.map((item) => (
            <Topic key={item} />
          ))}
        </section>
      </div>
    </PageContainer>
  )
}
