<script setup lang="ts">
const appConfig = useAppConfig();
const { isLoading, doLogin, address, doLogout } = $(authStore());
const { isLogin } = $(supabaseStore());
</script>

<template>
  <UHeader :links="appConfig.links">
    <template #logo>
      <div
        class="flex text-rainbow animate-pulse text-2xl justify-center items-center"
      >
        {{ appConfig.title }}
        <UBadge
          :label="appConfig.titleBadge"
          variant="subtle"
          class="mb-0.5 ml-2"
        />
      </div>
    </template>

    <template #right>
      <Loading :isLoading="isLoading" >
        <div class="flex-bc space-x-2">
          <PwaConnector v-if="isLogin && appConfig.pwaConnector" />
          <UniConnector v-if="isLogin" />
          <UButton
            v-if="!isLogin"
            label="Auth with X"
            :loading="isLoading"
            color="gray"
            @click="doLogin('twitter')"
          />
        </div>
      </Loading>
      <UserDropdown v-if="isLogin"/>
    </template>
  </UHeader>
</template>
