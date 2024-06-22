export const authStore = defineStore('authStore', () => {
  const { auth } = $(supabaseStore());
  const { getBrowserWalletInstance, network, address } = $(evmWalletStore());
  const meta = $ref({});

  let isLoading = $ref(false)

  const updateMeta = (key, val) => {
    meta[key] = val;
  };

  const updateRedirectUrl = () => {
    const redirectPath = `${location.origin}${location.pathname}`
    // console.log(`====> redirectPath :`, redirectPath)
    updateMeta('redirectPath', redirectPath)
  }
  // watch on useRoute
  // onMounted(updateRedirectUrl)

  const providerMap = {
    metamask: async () => {
      await getBrowserWalletInstance(network);
    }
  }
  const doLogin = async (provider) => {
    if (isLoading) return
    
    isLoading = true;
    if (providerMap[provider]) {
    await providerMap[provider]()
      isLoading = false
      return
    }

    const redirectTo = `${location.origin}/confirm?to=${meta.redirectPath}`;
    await auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });

    isLoading = false
  };

  const doLogout = async (provider) => {
    console.log(`====> provider :`, provider)
    
  }

  return $$({ doLogin, doLogout, updateMeta, updateRedirectUrl, isLoading, address })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(authStore, import.meta.hot))
