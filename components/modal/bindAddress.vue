<script setup lang="ts">
const { network, address } = $defineProps<{
  network: string;
  address: string;
}>();
const modal = useModal();
const { doBind } = $(addressBindStore());
const message = $computed(() => {
  const url = `${window.location.origin}`;
  return `Please sign this message to bind your address to your account. \nNetwork: ${network} \nAddress: ${address}\nUrl: ${url}`;
});

let isLoading = $ref(false);
const doSign = async () => {
  if(isLoading) return
  isLoading = true;
  const rz = await doBind(network, message);
  isLoading = false;
  if(rz){
    modal.close()
  }
};
</script>

<template>
  <UDashboardModal
    icon="i-heroicons-exclamation-circle"
    :ui="{
      icon: { base: 'text-red-500 dark:text-red-400' },
      header: { base: 'mt-4' },
    }"
  >
    <div class="px-10 pt-6">
      <UTextarea
          autoresize
          disabled
          padded
          color="green" 
          v-model="message"
        />
    </div>
    <template #footer>
      <div class="flex justify-center w-full py-4">
        <UButton
          label="Sign message"
          :loading="isLoading"
          class="px-6"
          size="lg"
          color="primary"
          @click="doSign"
        />
      </div>
    </template>
  </UDashboardModal>
</template>
