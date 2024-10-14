<script setup lang="ts">
const modal = useModal()
</script>

<template>
  <UDashboardModal
    icon="i-heroicons-exclamation-circle"
    :ui="{
      icon: { base: 'text-red-500 dark:text-red-400' },
      header: { base: 'mt-4' }
    }"
  >
    <template #footer>
      <div class="flex justify-center w-full py-4">
        <UButton class="px-6" size="lg" color="white" label="OK" @click="modal.close" />
      </div>
    </template>
  </UDashboardModal>
</template>
