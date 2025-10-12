import api from '@/core/security/interceptor';
import type { Profile } from '@/interfaces/profile';

const urlBase = import.meta.env.VITE_API_BASE_URL;

const fetchProfile = async (): Promise<Profile> => {
  const res = await api.get(urlBase + '/profile');
  return res.data;
};

export async function useProfile() {
    
}
