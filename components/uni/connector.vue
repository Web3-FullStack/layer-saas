<script setup lang="ts">
const {
  isConnectorOpen,
  currentAccount,
  currentWallet,
  isWrongNetwork,
  forceSwitchChain,
  fromChain,
  listProviders,
  connectOrJump,
  fromWalletAppList,
  fromChainList,
  isLoading,
  currentChain,
} = $(uniConnectorStore());
</script>

<template>
  <div>
    <UButton color="red" v-if="isWrongNetwork" block @click="isConnectorOpen = true"> Switch network </UButton>
    <UButton class="group" v-else-if="currentAccount" color="white" block @click="isConnectorOpen = true">
      <div class="hidden group-hover:block">Change wallet</div>
      <div class="flex-bc space-x-1 group-hover:hidden">
        <UIcon v-if="currentChain?.icon" :name="(currentChain.icon as string)" class="h-5 w-5" />
              <UAvatar v-else-if="currentChain?.avatar" v-bind="(currentChain.avatar as Avatar)" size="2xs" />
        <div>
          {{ shortAddress(currentAccount) }}
        </div>
        <Avatar v-bind="currentWallet" />
      </div>
    </UButton>
    <UButton v-else label="Connect Wallet" block :loading="isLoading" color="primary" @click="isConnectorOpen = true" />

    <UModal v-model="isConnectorOpen" prevent-close>
      <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
          {{ currentAccount ? "Change wallet" : "Connect wallet" }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="isConnectorOpen = false"
          />
        </div>
      </template>
        <div class="flex space-x-2 justify-between items-center">
          <div>Supported wallet list</div>
          <BridgeInputMenu class="w-2/5" :items="fromChainList" v-model="fromChain" placeholder="Select chain" />
        </div>
        <Loading class="space-y-3 py-8" :isLoading="isLoading">
          <div v-if="fromWalletAppList.length === 0" class="text-center text-red-400">Please select chain first.</div>
          <UButton block variant="soft" v-for="item in fromWalletAppList" :key="item.rdns" @click="connectOrJump(item.rdns)">
            <template #leading>
              <UIcon v-if="item?.icon" :name="(item.icon as string)" class="h-5 w-5" />
              <UAvatar v-else-if="item?.avatar" v-bind="(item.avatar as Avatar)" size="2xs" />
            </template>
            <div class="flex-bc w-full">
              <div>
                {{ item.label }}
              </div>
              <div class="flex-bc text-xs" v-if="!item.isInstalled">Click to install <UIcon name="pajamas:external-link" class="h-5 ml-2 w-5" /></div>
            </div>
          </UButton>
        </Loading>
    </UCard>
    </UModal>
  </div>
</template>
