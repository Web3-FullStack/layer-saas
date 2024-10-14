<script setup lang="ts">
const modal = useModal();
defineProps<{
  items: {
    label: string;
    content: string;
  }[];
}>();

</script>

<template>
  <UDashboardModal
    icon="material-symbols:book-3-rounded"
    :ui="{
      title: 'text-2xl',
      icon: { base: 'text-blue-500 dark:text-blue-400' },
      header: { base: 'mt-4', inner: 'items-center' },
    }"
  >
    <div class="px-2 pt-4">
      <ULandingFAQ :items="items" multiple />
    </div>
  </UDashboardModal>
</template>
