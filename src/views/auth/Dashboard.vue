<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.isLoggedIn) authStore.getUser();
})
</script>

<template>
  <h1 class="text-2xl font-bold text-slate-200">Dashboard</h1>
  <div class="flex items-center justify-between">
    <h2 class="text-lg font-bold text-slate-200">Welcome back, {{ authStore.user?.name }}</h2>
    <p class="text-sm text-slate-200">{{ authStore.user?.email }}</p>
    <button class="bg-red-500 text-white px-4 py-2 rounded-md" @click="authStore.logout">Logout</button>
  </div>
</template>