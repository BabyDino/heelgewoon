<script setup lang="ts">
// Nuxt UI components verified via MCP
definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

const { user, logout, isLoading } = useAuth()
const router = useRouter()

async function handleLogout() {
  logout()
  await router.push('/login')
}
</script>

<template>
  <UContainer class="py-16">
    <UCard class="max-w-2xl mx-auto">
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">
            Welcome
          </h1>
          <UButton
            color="neutral"
            variant="outline"
            :loading="isLoading"
            @click="handleLogout"
          >
            Logout
          </UButton>
        </div>
      </template>

      <div class="space-y-4">
        <p class="text-lg">
          Hello, <strong>{{ user?.email }}</strong>!
        </p>
        <p class="text-muted">
          You are now authenticated and viewing a protected page.
        </p>

        <UAlert
          color="success"
          variant="soft"
          icon="i-lucide-check-circle"
          title="Authentication successful"
          description="You have successfully logged in and are viewing protected content."
        />
      </div>
    </UCard>
  </UContainer>
</template>
