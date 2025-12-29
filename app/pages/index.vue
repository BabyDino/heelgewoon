<template>
  <UContainer class="min-h-screen flex items-center justify-center">
    <div class="text-center space-y-8 py-16">
      <div class="space-y-4">
        <h1 class="text-5xl font-bold text-gray-900 dark:text-white">
          Welcome to Heelgewoon
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A clean Nuxt 4 + Nuxt UI landing page
        </p>
      </div>
      
      <div class="flex gap-4 justify-center">
        <UButton size="xl" color="primary">
          Get Started
        </UButton>
        <UButton size="xl" color="gray" variant="outline">
          Learn More
        </UButton>
      </div>
      
      <div class="pt-8">
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Built with Modern Tools</h3>
          </template>
          
          <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>✨ Nuxt 4 - The latest version of the Vue framework</p>
            <p>🎨 Nuxt UI - Beautiful, accessible components</p>
            <p>⚡️ Fast, modern, and production-ready</p>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
useHead({
  title: 'Heelgewoon - Landing Page',
  meta: [
    { name: 'description', content: 'A clean Nuxt 4 + Nuxt UI landing page' }
  ]
})
</script>
