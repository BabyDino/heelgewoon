import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

// Mock $fetch
const mockFetch = vi.fn()
vi.stubGlobal('$fetch', mockFetch)

// Mock useCookie
const mockCookieValue = { value: null as string | null }
mockNuxtImport('useCookie', () => {
  return () => mockCookieValue
})

// Mock useState
const mockUserState = { value: null as unknown }
const mockLoadingState = { value: false }
const mockErrorState = { value: null as string | null }
mockNuxtImport('useState', () => {
  return (key: string, init?: () => unknown) => {
    if (key === 'auth_user') return mockUserState
    if (key === 'auth_loading') return mockLoadingState
    if (key === 'auth_error') return mockErrorState
    return { value: init?.() ?? null }
  }
})

// Mock useRuntimeConfig
mockNuxtImport('useRuntimeConfig', () => {
  return () => ({
    public: {
      directusUrl: 'http://localhost:8055'
    }
  })
})

// Mock readonly and computed
mockNuxtImport('readonly', () => {
  return <T>(value: T) => value
})

mockNuxtImport('computed', () => {
  return <T>(fn: () => T) => ({ value: fn() })
})

describe('useAuth composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCookieValue.value = null
    mockUserState.value = null
    mockLoadingState.value = false
    mockErrorState.value = null
  })

  it('should initialize with no authenticated user', async () => {
    const { useAuth } = await import('~/composables/useAuth')
    const { isAuthenticated, user } = useAuth()

    expect(isAuthenticated.value).toBe(false)
    expect(user.value).toBe(null)
  })

  it('should login successfully with valid credentials', async () => {
    mockFetch
      .mockResolvedValueOnce({
        data: {
          access_token: 'test-access-token',
          refresh_token: 'test-refresh-token',
          expires: 900000
        }
      })
      .mockResolvedValueOnce({
        data: {
          id: 'user-1',
          email: 'test@example.com',
          first_name: 'Test',
          last_name: 'User'
        }
      })

    const { useAuth } = await import('~/composables/useAuth')
    const { login } = useAuth()

    const success = await login('test@example.com', 'password123')

    expect(success).toBe(true)
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8055/auth/login',
      expect.objectContaining({
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      })
    )
  })

  it('should handle login failure', async () => {
    mockFetch.mockRejectedValueOnce({
      data: {
        errors: [{ message: 'Invalid credentials' }]
      }
    })

    const { useAuth } = await import('~/composables/useAuth')
    const { login, error } = useAuth()

    const success = await login('wrong@example.com', 'wrongpassword')

    expect(success).toBe(false)
    expect(error.value).toBe('Invalid credentials')
  })

  it('should logout and clear state', async () => {
    mockCookieValue.value = 'test-token'
    mockUserState.value = { id: 'user-1', email: 'test@example.com' }

    const { useAuth } = await import('~/composables/useAuth')
    const { logout, user, token } = useAuth()

    logout()

    expect(token.value).toBe(null)
    expect(user.value).toBe(null)
  })
})
