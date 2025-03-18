<script setup lang="ts">
import api from '@/lib/axios'
import { AxiosError } from 'axios'
import { ref, reactive } from 'vue'

const error = ref('')
const success = ref('')

interface LoginForm {
    email: string
    password: string
}

const form = reactive<LoginForm>({
    email: '',
    password: '',
});
const errors = reactive({
    email: [],
    password: [],
})

const login = async (form: LoginForm) => {
    try {
        // Get CSRF cookie
        await api.get(`/sanctum/csrf-cookie`, {
            baseURL: import.meta.env.VITE_API_BASE_URL,
        })
        errors.email = []
        errors.password = []
        // Make registration request
        const response = await api.post(`/login`, form)
        
        success.value = 'Login successful!'
        console.log(response.data)
    } catch (err: any) {
        if(err instanceof AxiosError && err.response?.status === 422) {
            errors.email = err.response.data.errors.email
            errors.password = err.response.data.errors.password
        } else {
            error.value = err.response?.data?.message || 'Login failed'
        }
        console.error('Login error:', err)
    }
}
</script>

<template>
    <div class="w-full p-8 border border-gray-300 rounded-lg shadow-lg bg-white mt-6">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
        
        <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
        <p v-if="success" class="text-green-500 mt-4 text-center">{{ success }}</p>
      
      <form @submit.prevent="login(form)">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="text" id="email" v-model="form.email" class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800" />
          <template v-if="errors.email?.length > 0">
            <span v-for="error in errors.email" :key="error" class="text-red-500 mt-1 text-sm">{{ error }}</span>
          </template>
        </div>
        
        
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="form.password" class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800" />
          <template v-if="errors.password?.length > 0">
            <span v-for="error in errors.password" :key="error" class="text-red-500 mt-1 text-sm">{{ error }}</span>
          </template>
        </div>
        <button type="submit" class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          Login
        </button>
      </form>
    </div>
</template>