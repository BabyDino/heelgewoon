export default defineNuxtRouteMiddleware(() => {
  const { token, user } = useDirectusAuth()

  // If not authenticated, redirect to login
  if (!token.value || !user.value) {
    return navigateTo('/login')
  }
})
