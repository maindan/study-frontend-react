import type { StudyState } from '@/interfaces/studyState'
import type { Topic } from '@/interfaces/topic';
import { useStudyStore } from '@/states/StudyState';
import React from 'react'

type StudyType = {
    currentTopic: Topic | null;
}

export function StudyInfo({currentTopic}: StudyType) {

    const studyState = useStudyStore((state) => state.getStudy);

    return (
        <div className='text-white flex flex-col gap-2'>
            <h4>Tópico atual: {currentTopic?.name}</h4>
        </div>
    )
}
