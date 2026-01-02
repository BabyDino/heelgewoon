// Using nuxt-directus plugin for authentication
export interface AuthUser {
  id: string
  email: string
  first_name?: string
  last_name?: string
}

export function useAuth() {
  const { login: directusLogin, logout: directusLogout, user: directusUser, token } = useDirectusAuth()
  const isLoading = useState('auth_loading', () => false)
  const error = useState<string | null>('auth_error', () => null)

  const user = computed<AuthUser | null>(() => {
    if (!directusUser.value) return null
    return {
      id: directusUser.value.id,
      email: directusUser.value.email,
      first_name: directusUser.value.first_name,
      last_name: directusUser.value.last_name
    }
  })

  const isAuthenticated = computed(() => !!token.value && !!directusUser.value)

  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      await directusLogin({ email, password })
      return true
    } catch (err: unknown) {
      const e = err as { data?: { errors?: Array<{ message?: string }> }, message?: string }
      error.value = e.data?.errors?.[0]?.message || e.message || 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function logout(): Promise<void> {
    try {
      await directusLogout()
    } catch {
      // Ignore logout errors
    }
    error.value = null
  }

  async function fetchUser(): Promise<void> {
    // User is automatically fetched by nuxt-directus
    // This is a no-op for compatibility
  }

  async function refresh(): Promise<boolean> {
    // Token refresh is handled automatically by nuxt-directus with autoRefresh: true
    return !!token.value
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading: readonly(isLoading),
    error: readonly(error),
    login,
    logout,
    fetchUser,
    refresh
  }
}
