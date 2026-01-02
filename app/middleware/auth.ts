export default defineNuxtRouteMiddleware(() => {
  const { token } = useDirectusToken()
  const user = useDirectusUser()

  // If not authenticated, redirect to login
  if (!token.value || !user.value) {
    return navigateTo('/login')
  }
})
