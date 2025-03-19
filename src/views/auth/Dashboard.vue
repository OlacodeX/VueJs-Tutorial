<script setup lang="ts">
import api from '@/lib/axios';
import { ref } from 'vue';
import type { User } from '@/types';
import router from '@/router';
// User can be of type user interface or null by default
const user = ref<User | null>(null);

const getUser = async () => {
  try {
    const response = await api.get('/user');
    user.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

const logout = async () => {
  try {
    await api.post('/logout');
    user.value = null;
    router.push('/login');
  } catch (error) {
    console.error(error);
  }
}

getUser();
</script>

<template>
  <h1 class="text-2xl font-bold text-slate-200">Dashboard</h1>
  <div class="flex items-center justify-between">
    <h2 class="text-lg font-bold text-slate-200">Welcome back, {{ user?.name }}</h2>
    <p class="text-sm text-slate-200">{{ user?.email }}</p>
    <button class="bg-red-500 text-white px-4 py-2 rounded-md" @click="logout">Logout</button>
  </div>
</template>