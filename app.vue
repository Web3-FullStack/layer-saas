<script setup lang="ts">
const colorMode = useColorMode();

const color = computed(() =>
  colorMode.value === "dark" ? "#111827" : "white"
);

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
    class: "dark",
  },
});

const appConfig = useAppConfig();

const meta = $computed(() => {
  return {
    title: appConfig.title,
    titleTemplate: (titleChunk: any) => {
      return titleChunk
        ? `${titleChunk} - ${appConfig.title}`
        : appConfig.title;
    },
    description: appConfig.description,
    ogTitle: appConfig.title,
    ogDescription: appConfig.description,
    ogImage: appConfig.ogImage,
    twitterImage: appConfig.twitterImage,
    twitterCard: appConfig.twitterCard,
  };
});
useSeoMeta(meta);

const { listProviders } = $(uniConnectorStore());
const { updateRedirectUrl } = $(authStore());

onMounted(() => {
  listProviders();
  updateRedirectUrl();
});

const route = useRoute();
watch(() => route.fullPath, updateRedirectUrl);
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
    <UModals />
  </div>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
