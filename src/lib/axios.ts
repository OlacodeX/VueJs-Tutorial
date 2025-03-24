import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '@/store/auth';
import { useToast } from 'vue-toast-notification';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  withCredentials: true,
  withXSRFToken: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const authStore = useAuthStore();
    const toast = useToast();
    switch (error.response.status) {
      case 401:
        authStore.cleanState();
        toast.error('Unauthorized');
        router.push('/login');
        break;
      case 404:
        toast.error('Page not found');
        router.push('/404');  
        break;
      case 500:
        toast.error('Internal server error');
        router.push('/500');
        break;
      case 419:
        authStore.cleanState();
        toast.error('Session expired');
        router.push('/login');
        break;
      default:
        toast.error('Something went wrong');
        router.push('/login');
    }
    return Promise.reject(error);
  }
);
export default api;
