<script setup lang="ts">
const user = useSupabaseUser();

const route = useRoute();
const { supabase } = $(supabaseStore());

useHead({
  title: "Auth Succeed!",
});
definePageMeta({
  layout: "blank-h-full",
  description: `World's first RWA Wallet: The ability to Tokenize real-world assets, Unleash the boundary of Web3 and Bring all human into metaverse.`,
});

const redirectUrl = $computed(() => {
  let to = route.query.to;
  if (to === undefined) return "/";

  to = to.replace("https://www.rwa-wallet.com", "");
  to = to.replace("https://dev.rwa-wallet.com", "");
  to = to.replace("http://localhost:3000", "");
  return to;
});

watch(
  user,
  () => {
    if (!user.value) return;
    console.log("watch");
    navigateTo(redirectUrl, { external: true });
  },
  { immediate: true }
);

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT" || event === "USER_DELETED") {
      // delete cookies on sign out
      const expires = new Date(0).toUTCString();
      document.cookie = `sb-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
      document.cookie = `sb-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;

      // Add this condition to redirect to home page if there's no 'to' parameter
      if (route.query.to === undefined) {
        navigateTo("/");
      }
    } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      const maxAge = 100 * 365 * 24 * 60 * 60; // 1 year, (but the Supabase token probably expires before then)
      document.cookie = `sb-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      document.cookie = `sb-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
    }

    if (route.query.to !== undefined) {
      console.log("onAuthStateChange");
      navigateTo(redirectUrl, { external: true });
    }
  });
});
</script>

<template>
  <UPageError
    :status="302"
    name="Redirecting..."
    message="We are redirecting you to the page you auth from, please wait..."
    :clearButton="{
      label: 'If it does not work, click here',
      to: redirectUrl,
      trailingIcon: 'line-md:loading-loop',
    }"
  />
</template>
