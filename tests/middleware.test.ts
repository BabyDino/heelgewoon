import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

// Define mock state at module level
const mockDirectusAuth = {
  token: { value: null as string | null },
  user: { value: null as unknown }
}

let mockNavigateToResult: ReturnType<typeof vi.fn>

// Mock useDirectusAuth
mockNuxtImport('useDirectusAuth', () => {
  return () => mockDirectusAuth
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
    mockDirectusAuth.token.value = null
    mockDirectusAuth.user.value = null
    mockNavigateToResult = vi.fn()
  })

  it('should redirect to login when not authenticated', async () => {
    vi.resetModules()
    const authMiddleware = await import('~/middleware/auth')
    const handler = authMiddleware.default

    await handler({}, {})

    expect(mockNavigateToResult).toHaveBeenCalledWith('/login')
  })

  it('should not redirect when authenticated', async () => {
    mockDirectusAuth.token.value = 'test-token'
    mockDirectusAuth.user.value = { id: 'user-1', email: 'test@example.com' }

    vi.resetModules()
    const authMiddleware = await import('~/middleware/auth')
    const handler = authMiddleware.default

    const result = await handler({}, {})

    expect(result).toBeUndefined()
  })
})

describe('guest middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockDirectusAuth.token.value = null
    mockDirectusAuth.user.value = null
    mockNavigateToResult = vi.fn()
  })

  it('should redirect to authenticated when already logged in', async () => {
    mockDirectusAuth.token.value = 'test-token'
    mockDirectusAuth.user.value = { id: 'user-1', email: 'test@example.com' }

    vi.resetModules()
    const guestMiddleware = await import('~/middleware/guest')
    const handler = guestMiddleware.default

    await handler({}, {})

    expect(mockNavigateToResult).toHaveBeenCalledWith('/authenticated')
  })

  it('should not redirect when not authenticated', async () => {
    mockDirectusAuth.token.value = null
    mockDirectusAuth.user.value = null

    vi.resetModules()
    const guestMiddleware = await import('~/middleware/guest')
    const handler = guestMiddleware.default

    const result = await handler({}, {})

    expect(result).toBeUndefined()
  })
})
