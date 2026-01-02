// Nuxt UI components verified via MCP
export interface AuthUser {
  id: string
  email: string
  first_name?: string
  last_name?: string
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
}

export function useAuth() {
  const config = useRuntimeConfig()
  const token = useCookie('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax'
  })
  const refreshToken = useCookie('auth_refresh_token', {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: 'lax'
  })
  const user = useState<AuthUser | null>('auth_user', () => null)
  const isLoading = useState('auth_loading', () => false)
  const error = useState<string | null>('auth_error', () => null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const directusUrl = computed(() => config.public.directusUrl || 'http://localhost:8055')

  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<{
        data: {
          access_token: string
          refresh_token: string
          expires: number
        }
      }>(`${directusUrl.value}/auth/login`, {
        method: 'POST',
        body: {
          email,
          password
        }
      })

      token.value = response.data.access_token
      refreshToken.value = response.data.refresh_token

      // Fetch user data after successful login
      await fetchUser()

      return true
    } catch (err: unknown) {
      const e = err as { data?: { errors?: Array<{ message?: string }> }, message?: string }
      error.value = e.data?.errors?.[0]?.message || e.message || 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function fetchUser(): Promise<void> {
    if (!token.value) {
      user.value = null
      return
    }

    try {
      const response = await $fetch<{
        data: AuthUser
      }>(`${directusUrl.value}/users/me`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      user.value = response.data
    } catch {
      // Token might be expired, try to refresh
      const refreshed = await refresh()
      if (!refreshed) {
        logout()
      }
    }
  }

  async function refresh(): Promise<boolean> {
    if (!refreshToken.value) {
      return false
    }

    try {
      const response = await $fetch<{
        data: {
          access_token: string
          refresh_token: string
          expires: number
        }
      }>(`${directusUrl.value}/auth/refresh`, {
        method: 'POST',
        body: {
          refresh_token: refreshToken.value,
          mode: 'json'
        }
      })

      token.value = response.data.access_token
      refreshToken.value = response.data.refresh_token

      await fetchUser()
      return true
    } catch {
      return false
    }
  }

  function logout(): void {
    token.value = null
    refreshToken.value = null
    user.value = null
    error.value = null
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    isLoading: readonly(isLoading),
    error: readonly(error),
    login,
    logout,
    fetchUser,
    refresh
  }
}
