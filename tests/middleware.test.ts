import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

// Define mock state at module level
const mockAuthState = {
  isAuthenticated: { value: false },
  token: { value: null as string | null },
  fetchUser: vi.fn()
}

let mockNavigateToResult: ReturnType<typeof vi.fn>

// Mock the useAuth composable
mockNuxtImport('useAuth', () => {
  return () => mockAuthState
})

// Mock navigateTo - using a factory pattern
mockNuxtImport('navigateTo', () => {
  return (path: string) => {
    if (!mockNavigateToResult) {
      mockNavigateToResult = vi.fn()
    }
    mockNavigateToResult(path)
    return path
  }
})

// Mock defineNuxtRouteMiddleware
mockNuxtImport('defineNuxtRouteMiddleware', () => {
  return (handler: (to: unknown, from: unknown) => unknown) => handler
})

describe('auth middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthState.isAuthenticated.value = false
    mockAuthState.token.value = null
    mockNavigateToResult = vi.fn()
  })

  it('should redirect to login when not authenticated', async () => {
    vi.resetModules()
    const authMiddleware = await import('~/middleware/auth')
    const handler = authMiddleware.default

    await handler({}, {})

    // Verify the redirect happened to login
    expect(mockNavigateToResult).toHaveBeenCalledWith('/login')
  })

  it('should not redirect when authenticated', async () => {
    mockAuthState.isAuthenticated.value = true
    mockAuthState.token.value = 'test-token'

    vi.resetModules()
    const authMiddleware = await import('~/middleware/auth')
    const handler = authMiddleware.default

    const result = await handler({}, {})

    // Result should be undefined (no redirect)
    expect(result).toBeUndefined()
  })

  it('should fetch user if token exists but not authenticated', async () => {
    mockAuthState.token.value = 'test-token'
    mockAuthState.isAuthenticated.value = false
    mockAuthState.fetchUser.mockResolvedValueOnce(undefined)

    vi.resetModules()
    const authMiddleware = await import('~/middleware/auth')
    const handler = authMiddleware.default

    await handler({}, {})

    expect(mockAuthState.fetchUser).toHaveBeenCalled()
  })
})

describe('guest middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthState.isAuthenticated.value = false
    mockAuthState.token.value = null
    mockNavigateToResult = vi.fn()
  })

  it('should redirect to authenticated when already logged in', async () => {
    mockAuthState.isAuthenticated.value = true
    mockAuthState.token.value = 'test-token'

    vi.resetModules()
    const guestMiddleware = await import('~/middleware/guest')
    const handler = guestMiddleware.default

    await handler({}, {})

    expect(mockNavigateToResult).toHaveBeenCalledWith('/authenticated')
  })

  it('should not redirect when not authenticated', async () => {
    mockAuthState.isAuthenticated.value = false
    mockAuthState.token.value = null

    vi.resetModules()
    const guestMiddleware = await import('~/middleware/guest')
    const handler = guestMiddleware.default

    const result = await handler({}, {})

    expect(result).toBeUndefined()
  })
})
