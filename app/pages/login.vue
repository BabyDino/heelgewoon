<script setup lang="ts">
// Nuxt UI components verified via MCP
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'default',
  middleware: ['guest']
})

const { login, isLoading, error } = useAuth()
const router = useRouter()

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
  password: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const success = await login(event.data.email, event.data.password)
  if (success) {
    await router.push('/authenticated')
  }
}
</script>

<template>
  <UContainer class="flex items-center justify-center min-h-screen">
    <UCard class="w-full max-w-md">
      <template #header>
        <h1 class="text-2xl font-bold text-center">
          Login
        </h1>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Email"
          name="email"
        >
          <UInput
            v-model="state.email"
            type="email"
            placeholder="Enter your email"
            icon="i-lucide-mail"
            :disabled="isLoading"
          />
        </UFormField>

        <UFormField
          label="Password"
          name="password"
        >
          <UInput
            v-model="state.password"
            type="password"
            placeholder="Enter your password"
            icon="i-lucide-lock"
            :disabled="isLoading"
          />
        </UFormField>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          icon="i-lucide-alert-circle"
          :title="error"
        />

        <UButton
          type="submit"
          block
          :loading="isLoading"
          :disabled="isLoading"
        >
          Sign In
        </UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>
