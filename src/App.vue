<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  
  <div class="w-full">
    <header>
      <div class="dark:bg-slate-950 bg-slate-700">
        <nav class="flex items-center justify-between p-4">
          <div>
            <RouterLink class="text-slate-200" to="/">Home</RouterLink>
            <RouterLink class="text-slate-200" to="/dashboard">Dashboard</RouterLink>
          </div>
          <div class="flex space-x-2">
            <RouterLink class="text-slate-200" to="/login">Login</RouterLink>
            <RouterLink class="text-slate-200" to="/register">Register</RouterLink>
          </div>
        </nav>
      </div>
    </header>
    <div class="mb-6">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

</style>
