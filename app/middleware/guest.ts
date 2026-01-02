export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, fetchUser, token } = useAuth()

  // If we have a token but no user loaded, try to fetch user
  if (token.value && !isAuthenticated.value) {
    await fetchUser()
  }

  // If authenticated, redirect to authenticated page
  if (isAuthenticated.value) {
    return navigateTo('/authenticated')
  }
})
