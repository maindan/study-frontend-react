import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '@/core/security/interceptor';
import type { Topic } from '@/interfaces/topic';

const urlBase = "http://localhost:8080/"

const fetchTopics = async (): Promise<Topic[]> => {
    const res = await api.get(urlBase + 'topic');
    return res.data;
}

export function useTopic() {
    const topics = useQuery({
        queryKey: ['topics'],
        queryFn: fetchTopics,
    }) 
    return topics;
}