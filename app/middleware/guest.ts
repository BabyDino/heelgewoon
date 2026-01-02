export default defineNuxtRouteMiddleware(() => {
  const { token } = useDirectusToken()
  const user = useDirectusUser()

  // If authenticated, redirect to authenticated page
  if (token.value && user.value) {
    return navigateTo('/authenticated')
  }
})
