<script setup lang="ts">
const { isLoading, status } = $defineProps<{
  isLoading: boolean;
  status?: string | boolean;
}>();

const statusText = $computed(() => {
  if (status === false) return '';
  return status || 'Loading...';
});
</script>

<template>
  <div v-bind="$attrs">
    <div v-if="isLoading" class="flex-cc space-x-2">
      <UIcon name="eos-icons:loading" class="h-5 w-5" />
      <span>{{ statusText }}</span>
    </div>
    <slot v-else />
  </div>
</template>
