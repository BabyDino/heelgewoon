export default defineNuxtRouteMiddleware(() => {
  const { token, user } = useDirectusAuth()

  // If authenticated, redirect to authenticated page
  if (token.value && user.value) {
    return navigateTo('/authenticated')
  }
})
