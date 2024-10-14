<script setup lang="ts">
const route = useRoute();
const currentPath = $computed(() => route.path.split("/")[2]);
const clients = $computed(() => {
  return [
    {
      id: "swapkit",
      isCurrent: "swapkit" === currentPath,
      name: "SwapKit Bridge",
      imageUrl: "https://cdn.discordapp.com/icons/1018989809353633913/36164831be4d4a52a92787c49f343a3b.webp?size=128",
    },
    {
      id: "wormhole",
      isCurrent: "wormhole" === currentPath,
      name: "Wormhole Bridge",
      imageUrl: "https://avatars.githubusercontent.com/u/110117883?s=200&v=4",
    },
  ];
});
</script>
<template>
  <div>
    <ul role="list" class="grid gap-x-6 gap-y-8 grid-cols-1 lg:grid-cols-2 xl:gap-x-8">
      <li v-for="client in clients" :key="client.id" :class="['border rounded-xl border-gray-700 overflow-hidden']">
        <NuxtLink :to="`/bridge/${client.id}`" class="block">
          <div
            :class="['border-b flex  border-gray-900/5 p-6 gap-x-4 items-center hover:bg-gray-700', client.isCurrent ? 'bg-gray-700' : 'bg-gray-900']"
          >
            <img :src="client.imageUrl" :alt="client.name" class="bg-black rounded-lg flex-none object-cover h-12 ring-1 ring-gray-900/10 w-12" />
            <div class="font-medium text-sm text-gray-100 leading-6">{{ client.name }}</div>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <div v-if="currentPath === ''" class="font-bold text-center py-10">Please select a bridge to continue.</div>
  </div>
</template>
