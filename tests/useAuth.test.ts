import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

// Mock useDirectusAuth
const mockDirectusAuth = {
  login: vi.fn(),
  logout: vi.fn(),
  user: { value: null as unknown },
  token: { value: null as string | null }
}

mockNuxtImport('useDirectusAuth', () => {
  return () => mockDirectusAuth
})

// Mock useState
const mockLoadingState = { value: false }
const mockErrorState = { value: null as string | null }
mockNuxtImport('useState', () => {
  return (key: string, init?: () => unknown) => {
    if (key === 'auth_loading') return mockLoadingState
    if (key === 'auth_error') return mockErrorState
    return { value: init?.() ?? null }
  }
})

// Mock readonly and computed
mockNuxtImport('readonly', () => {
  return <T>(value: T) => value
})

mockNuxtImport('computed', () => {
  return <T>(fn: () => T) => ({ value: fn() })
})

describe('useAuth composable with nuxt-directus', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockDirectusAuth.token.value = null
    mockDirectusAuth.user.value = null
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
    mockDirectusAuth.login.mockResolvedValueOnce(undefined)
    mockDirectusAuth.user.value = {
      id: 'user-1',
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User'
    }
    mockDirectusAuth.token.value = 'test-token'

    const { useAuth } = await import('~/composables/useAuth')
    const { login } = useAuth()

    const success = await login('test@example.com', 'password123')

    expect(success).toBe(true)
    expect(mockDirectusAuth.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })

  it('should handle login failure', async () => {
    mockDirectusAuth.login.mockRejectedValueOnce({
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
    mockDirectusAuth.token.value = 'test-token'
    mockDirectusAuth.user.value = { id: 'user-1', email: 'test@example.com' }
    mockDirectusAuth.logout.mockResolvedValueOnce(undefined)

    const { useAuth } = await import('~/composables/useAuth')
    const { logout } = useAuth()

    await logout()

    expect(mockDirectusAuth.logout).toHaveBeenCalled()
  })
})
