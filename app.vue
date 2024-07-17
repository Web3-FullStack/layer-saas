<script setup lang="ts">
const colorMode = useColorMode();

const color = computed(() => (colorMode.value === "dark" ? "#111827" : "white"));

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

const appConfig = useAppConfig();

const meta = $computed(() => {
  return {
    title: appConfig.title,
    description: appConfig.description,
    ogTitle: appConfig.title,
    ogDescription: appConfig.description,
    ogImage: appConfig.ogImage,
    twitterImage: appConfig.twitterImage,
    twitterCard: appConfig.twitterCard,
  };
});
useSeoMeta(meta);

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/vue";

import { mainnet, arbitrum } from "viem/chains";
import { reconnect } from "@wagmi/core";

// 1. Your WalletConnect Cloud project ID
const projectId = "3aac1e1bee93fa177294ad00d1defc96";

// 2. Create a metadata object
const metadata = {
  name: "HelloRWA",
  description: "RWA-Wallet.com",
  url: "https://rwa-wallet.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum];
const wagmiOptions = {
  ssr: true,
};
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ...wagmiOptions, // Optional - Override createConfig parameters
});

reconnect(config);
// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});
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
