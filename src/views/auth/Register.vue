<script setup lang="ts">
import { useAuthStore } from '@/store/auth'

const { error, success, form, errors, register } = useAuthStore()


</script>

<template>
    <div class="w-full p-8 border border-gray-300 rounded-lg shadow-lg bg-white mt-6">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
        
        <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
        <p v-if="success" class="text-green-500 mt-4 text-center">{{ success }}</p>
      
      <form @submit.prevent="register(form)">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" v-model="form.name" class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800" />
          <template v-if="errors.name?.length > 0">
            <span v-for="error in errors.name" :key="error" class="text-red-500 mt-1 text-sm">{{ error }}</span>
          </template>
        </div>
        
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="form.email" class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800" />
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
        
        <div class="mb-6">
          <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="form.password_confirmation" class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800" />
        </div>
        
        <button type="submit" class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          Register
        </button>
      </form>
    </div>
</template>