export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, fetchUser, token } = useAuth()

  // If we have a token but no user loaded, try to fetch user
  if (token.value && !isAuthenticated.value) {
    await fetchUser()
  }

  // If still not authenticated, redirect to login
  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
