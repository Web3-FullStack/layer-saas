<script setup lang="ts">
const { connect, disconnect, address, init, truncatedAddress, isLoading } = $(pwaConnectorStore());

onMounted(async () => {
  await init();
});
</script>

<template>
  <div>
    <UButton v-if="!address" @click="connect" :loading="isLoading"> Connect AO </UButton>
    <div v-else class="flex items-center gap-1">
      {{ truncatedAddress }}
      <UButton @click="disconnect" icon="i-heroicons-x-circle" variant="ghost" color="red" />
    </div>
  </div>
</template>
