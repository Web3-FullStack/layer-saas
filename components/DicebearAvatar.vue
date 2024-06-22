<script setup lang="ts">
const { seed } = $defineProps<{
  seed: string
}>()

const { getAvatar } = $(dicebearStore())
</script>
<template>
  <UAvatar :src="getAvatar(seed)" v-bind="$attrs" />
</template>