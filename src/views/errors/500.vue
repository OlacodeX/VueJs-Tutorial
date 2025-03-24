<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-slate-800 dark:text-slate-200">500</h1>
      <h2 class="text-2xl font-semibold text-slate-700 dark:text-slate-300 mt-4">Internal Server Error</h2>
      <p class="text-slate-600 dark:text-slate-400 mt-2">Oops! Something went wrong on our end.</p>
      <RouterLink 
        to="/" 
        class="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Return Home
      </RouterLink>
    </div>
  </div>
</template>

