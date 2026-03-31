export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return
  const userStore = useUserStore()
  if (!userStore.onboardingDone && to.path !== '/onboarding') {
    return navigateTo('/onboarding')
  }
  if (userStore.onboardingDone && to.path === '/onboarding') {
    return navigateTo('/')
  }
})
