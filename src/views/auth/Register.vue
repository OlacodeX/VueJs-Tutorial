<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

// Set axios defaults
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const error = ref('')
const success = ref('')

const register = async () => {
    try {
        // Get CSRF cookie
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`)
        
        // Make registration request
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
            name: 'John Doe',
            email: 'john@doe.com',
            password: 'password',
            password_confirmation: 'password',
        })
        
        success.value = 'Registration successful!'
        console.log(response.data)
    } catch (err: any) {
        error.value = err.response?.data?.message || 'Registration failed'
        console.error('Registration error:', err)
    }
}
</script>

<template>
    <div>
        <h1 class="text-3xl font-bold underline text-red-500">Register</h1>
        <button @click="register" class="px-4 py-2 bg-blue-500 text-white rounded">
            Register
        </button>
        
        <p v-if="error" class="text-red-500">{{ error }}</p>
        <p v-if="success" class="text-green-500">{{ success }}</p>
    </div>
</template>