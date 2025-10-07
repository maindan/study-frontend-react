import { ClipboardList, Pyramid, Sparkle } from 'lucide-react'
import React from 'react'
import { Progress } from '../ui/progress';
import type { Topic } from '@/interfaces/topic';
import CountUp from '../react-bits/CountUp';

export function TopicComponent({topic}: {topic: Topic}) {

  function getTopicProgress(): number {
    const tasks = topic.tasks || [];
    const finishedTasks = tasks.filter(item => item.status == "CONCLUIDO");
    if(tasks.length == 0) return 0;
    return (finishedTasks!.length / tasks!.length) * 100
  }

  return (
    <div className="flex flex-col p-3 w-full h-30 rounded-2xl bg-second shadow-effect cursor-pointer">
        <div className="flex w-full items-center gap-2">
            {/* <ClipboardList /> */}
            {/* <Sparkle size={20} /> */}
            <Pyramid size={20} />
            <h4 className="text-md font-medium overflow-hidden text-ellipsis whitespace-nowrap w-full">
              {topic.name}
            </h4>
        </div>
        <div className="flex w-full items-baseline justify-between mb-2">
          <p className='text-sm'>Progresso</p>
          <div className="flex items-baseline gap-1">
            <CountUp
              from={0}
              to={Number(getTopicProgress().toFixed())}
              direction="up"
              duration={1}
              className="text-5xl"
            />
            {/* <p className='text-5xl'>{getTopicProgress().toFixed(0)}</p> */}
            <p className='text-sm'>%</p>
          </div>
        </div>
        <Progress value={50}  className='w-full' />
    </div>
  )
}
