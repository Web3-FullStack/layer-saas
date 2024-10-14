export const authStore = defineStore("authStore", () => {
  const { auth } = $(supabaseStore());
  const { login, network, address, logout, providers } = $(uniConnectorStore());
  const meta = $ref({});

  let isLoading = $ref(false);

  const updateMeta = (key, val) => {
    meta[key] = val;
  };

  const updateRedirectUrl = () => {
    updateMeta("redirectPath", location.href);
  };
  // watch on useRoute
  const route = useRoute();
  watch(route, () => {
    updateRedirectUrl();
  });
  // onMounted(updateRedirectUrl)

  const providerMap = {
    metamask: {
      login,
      logout,
    },
  };
  const doLogin = async (provider) => {
    if (isLoading) return;

    isLoading = true;
    if (providerMap[provider]) {
      await providerMap[provider].login(network);
      isLoading = false;
      return;
    }

    const redirectTo = `${location.origin}/confirm?to=${meta.redirectPath}`;
    await auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });

    setTimeout(() => {
      isLoading = false;
    }, 5000);
  };

  const doLogout = async (provider) => {
    if (isLoading) return;
    isLoading = true;
    await auth.signOut();
    if (providerMap[provider]) {
      await providerMap[provider].logout();
    }
    // Add this line to redirect to the home page after logout
    navigateTo("/");
    isLoading = false;
  };

  return $$({
    doLogin,
    doLogout,
    updateMeta,
    updateRedirectUrl,
    isLoading,
    address,
  });
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(authStore, import.meta.hot));
