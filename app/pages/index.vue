<template>
  <UContainer>
    <div class="py-16 text-center">
      <h1 class="text-4xl font-bold mb-4">
        Hello World
      </h1>
      <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
        Welcome to Heelgewoon! This is your starter template.
      </p>
      <UCard class="max-w-2xl mx-auto text-left">
        <template #header>
          <h2 class="text-xl font-semibold">
            Getting Started
          </h2>
        </template>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div class="flex gap-2">
          <UButton to="/login">
            Login
          </UButton>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
