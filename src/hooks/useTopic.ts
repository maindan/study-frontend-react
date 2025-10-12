import { useQuery } from '@tanstack/react-query';
import api from '@/core/security/interceptor';
import type { Topic } from '@/interfaces/topic';

const urlBase = import.meta.env.VITE_API_BASE_URL;

const fetchTopics = async (): Promise<Topic[]> => {
  const res = await api.get(urlBase + 'topic');
  return res.data;
};

const fetchTopicById = async (id: number): Promise<Topic> => {
  const res = await api.get(`${urlBase}topic/${id}`);
  return res.data;
};

export function useTopic() {
  return useQuery({
    queryKey: ['topics'],
    queryFn: fetchTopics,
  });
}

export function useTopicById(id?: number) {
  return useQuery({
    queryKey: ['topic', id],
    queryFn: () => fetchTopicById(id!),
    enabled: !!id,
  });
}
