import api from '@/core/security/interceptor';
import type { Profile } from '@/interfaces/profile';

const urlBase = "http://localhost:8080/";

const fetchProfile = async (): Promise<Profile> => {
  const res = await api.get(urlBase + 'profile');
  return res.data;
};

export async function useProfile() {
    
}
