import api from '@/lib/axios';
import router from '@/router';
import type { LoginForm, RegisterForm, User } from '@/types'
import type { FormKitNode } from '@formkit/core';
import { AxiosError } from 'axios';
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

// Register uses normal vue procedures while login uses formkit


export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const isLoggedIn = ref<boolean>(false);
    const error = ref('')
    const success = ref('')
    const form = reactive<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    
    const errors = reactive({
        name: [],
        email: [],
        password: [],
    })

    const register = async (form: RegisterForm) => {
        try {
            // Get CSRF cookie
            await api.get(`/sanctum/csrf-cookie`, {
                baseURL: import.meta.env.VITE_API_BASE_URL,
            })
            errors.name = []
            errors.email = []
            errors.password = []
            // Make registration request
            await api.post(`/register`, form)
            
            success.value = 'Registration successful!'
            form.name = ''
            form.email = ''
            form.password = ''
            form.password_confirmation = ''
            router.push('/login')
        } catch (err: any) {
            if(err instanceof AxiosError && err.response?.status === 422) {
                errors.name = err.response.data.errors.name
                errors.email = err.response.data.errors.email
                errors.password = err.response.data.errors.password
            } else {
                error.value = err.response?.data?.message || 'Registration failed'
            }
            console.error('Registration error:', err)
        }
    };
    
    const login = async (form: LoginForm, node?: FormKitNode) => {
        try {
            await api.get(`/sanctum/csrf-cookie`, {
                baseURL: import.meta.env.VITE_API_BASE_URL,
            })
            const response = await api.post(`/login`, form)
            
            success.value = 'Login successful!'
            console.log(response.data)

            // Get user
            await getUser();
            router.push('/dashboard')
        } catch (err: any) {
            if(err instanceof AxiosError && err.response?.status === 422) {
                node?.setErrors([], err.response?.data.errors)
            }
            console.error('Login error:', err)
        }
    }
    const getUser = async () => {
        try {
          const response = await api.get('/user');
          user.value = response.data;
          isLoggedIn.value = true;
        } catch (error) {
          console.error(error);
        }
    }
    
    const cleanState = () => {
        user.value = null;
        isLoggedIn.value = false;
        error.value = '';
        success.value = '';
    }
    const logout = async () => {
    try {
        await api.post('/logout');
        cleanState();
        router.push('/login');
    } catch (error) {
        console.error(error);
    }
    }
    return {
        user,
        isLoggedIn,
        register,
        login,
        getUser,
        logout,
        error,
        success,
        form,
        errors,
        cleanState,
    };
}, {
    persist: {
        storage: sessionStorage,
        pick: ['user', 'isLoggedIn'],
      }
})
