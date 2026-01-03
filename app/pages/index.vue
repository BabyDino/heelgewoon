<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 lg:py-32">
      <UContainer>
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-5xl lg:text-6xl font-bold mb-6">
            Lorem ipsum dolor sit amet consectetur
          </h1>
          <p class="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
          <div class="flex gap-4 justify-center">
            <UButton size="lg" to="/login">
              Get Started
            </UButton>
            <UButton size="lg" variant="outline" to="#features">
              Learn More
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-gray-50 dark:bg-gray-900">
      <UContainer>
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">
            Excepteur sint occaecat
          </h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <UCard>
            <div class="text-center">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-lucide-zap" class="w-6 h-6 text-primary-500" />
              </div>
              <h3 class="text-lg font-semibold mb-2">Lorem Ipsum</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm">
                Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-lucide-shield" class="w-6 h-6 text-primary-500" />
              </div>
              <h3 class="text-lg font-semibold mb-2">Dolor Sit Amet</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm">
                Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-lucide-chart-bar" class="w-6 h-6 text-primary-500" />
              </div>
              <h3 class="text-lg font-semibold mb-2">Adipiscing Elit</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm">
                Nisi ut aliquip ex ea commodo consequat duis aute irure dolor.
              </p>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-lucide-users" class="w-6 h-6 text-primary-500" />
              </div>
              <h3 class="text-lg font-semibold mb-2">Tempor Incididunt</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm">
                Reprehenderit in voluptate velit esse cillum dolore eu fugiat.
              </p>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20">
      <UContainer>
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Freemium -->
          <UCard class="text-center">
            <div class="py-4">
              <h3 class="text-xl font-semibold mb-2">Freemium</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Lorem ipsum dolor sit amet
              </p>
              <div class="mb-6">
                <span class="text-4xl font-bold">€0</span>
                <span class="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul class="text-left space-y-3 mb-8">
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Consectetur adipiscing</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Sed do eiusmod tempor</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Up to 5 members</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-x" class="w-5 h-5 text-gray-300 dark:text-gray-600" />
                  <span class="text-sm text-gray-400">Ut enim ad minim</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-x" class="w-5 h-5 text-gray-300 dark:text-gray-600" />
                  <span class="text-sm text-gray-400">Priority support</span>
                </li>
              </ul>
              <UButton variant="outline" block to="/login">
                Get Started
              </UButton>
            </div>
          </UCard>

          <!-- Pro -->
          <UCard class="text-center border-2 border-primary-500 relative">
            <UBadge class="absolute -top-3 left-1/2 -translate-x-1/2" color="primary">
              Popular
            </UBadge>
            <div class="py-4">
              <h3 class="text-xl font-semibold mb-2">Pro</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Duis aute irure dolor
              </p>
              <div class="mb-2">
                <span class="text-4xl font-bold">€1</span>
                <span class="text-gray-500 dark:text-gray-400">/member</span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                + payment processing fee
              </p>
              <ul class="text-left space-y-3 mb-8">
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Everything in Freemium</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Unlimited members</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Ut enim ad minim veniam</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Quis nostrud exercitation</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Priority support</span>
                </li>
              </ul>
              <UButton block to="/login">
                Get Started
              </UButton>
            </div>
          </UCard>

          <!-- Enterprise -->
          <UCard class="text-center">
            <div class="py-4">
              <h3 class="text-xl font-semibold mb-2">Enterprise</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Excepteur sint occaecat
              </p>
              <div class="mb-6">
                <span class="text-4xl font-bold">Custom</span>
              </div>
              <ul class="text-left space-y-3 mb-8">
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Everything in Pro</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Cupidatat non proident</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Sunt in culpa qui officia</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Dedicated account manager</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                  <span class="text-sm">Custom integrations</span>
                </li>
              </ul>
              <UButton variant="outline" block to="/login">
                Contact Sales
              </UButton>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary-500 dark:bg-primary-600">
      <UContainer>
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
            Sed ut perspiciatis unde omnis
          </h2>
          <p class="text-lg text-primary-100 mb-8">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.
          </p>
          <UButton size="lg" color="white" to="/login">
            Get Started Today
          </UButton>
        </div>
      </UContainer>
    </section>
  </div>
</template>
