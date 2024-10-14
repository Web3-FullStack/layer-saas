<script setup lang="ts">
const modal = useModal()
const { connect, isLoading, address } = $(pwaConnectorStore());
watch($$(address), (newAddress) => {
  if(newAddress) {
    modal.close()
  }
})
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
        <UButton
            label="Connect AO"
            :loading="isLoading"
            class="px-6" size="lg" 
            color="primary"
            @click="connect"
          />
      </div>
    </template>
  </UDashboardModal>
</template>
