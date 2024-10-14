<script setup lang="ts">
const modal = useModal();
const { isLoading, doLogin } = $(authStore());
</script>

<template>
  <UDashboardModal
    icon="i-heroicons-exclamation-circle"
    :ui="{
      icon: { base: 'text-red-500 dark:text-red-400' },
      header: { base: 'mt-4', inner: 'items-center' },
    }"
  >
    <template #footer>
      <div class="flex justify-center w-full py-4">
        <UButton
          label="Auth with X"
          :loading="isLoading"
          class="px-6"
          size="lg"
          color="primary"
          @click="doLogin('twitter')"
        />
      </div>
    </template>
  </UDashboardModal>
</template>
