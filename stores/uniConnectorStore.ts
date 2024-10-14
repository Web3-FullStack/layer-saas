import {
  createWalletClient,
  custom,
  publicActions,
  createPublicClient,
  http,
} from "viem";
import "./uniConnectorStore/types";
import {
  erc20ABI,
  erc721ABI,
  allTokenMapForSwapkit,
  allChainList,
  allWalletList,
} from "./uniConnectorStore/consts";

export const uniConnectorStore = defineStore("uniConnectorStore", () => {
  const { addError } = $(notificationStore());
  const allTokenMapForWormhole = $ref({});
  let isLoading = $ref(false);
  let isConnectorOpen = $ref(false);
  let isAddressBookOpen = $ref(false);
  let isConnected = $ref(false);
  let providers = $ref([]);
  let currentChainId = $ref("");
  let currentAccount = $ref("");
  let currentWallet = $ref("");
  let walletClient = $ref();
  let currentRdns = $(useLocalStorage("uni-current-rdns", ""));
  let fromChainId = $(useLocalStorage("uni-from-chain-id", 0));

  let currentPath = $ref("");
  const wormholeChainsKeyArr = [
    "moonbaseAlpha",
    "hardhat",
    "acala",
    "celo",
    "polygon",
    "polygonAmoy",
  ];

  // from
  const fromChainList = $computed(() => {
    switch (currentPath) {
      case "swapkit":
        return [...allChainList].filter(
          (item) => !wormholeChainsKeyArr.includes(item.key)
        );
      default:
        return [...allChainList].filter((item) =>
          wormholeChainsKeyArr.includes(item.key)
        );
    }

    return [];
  });
  let fromChain = $ref();
  let fromWalletApp = $ref();
  const fromTokenList = $computed(() => {
    switch (currentPath) {
      case "swapkit":
        return allTokenMapForSwapkit[fromChain?.key] || [];
      case "wormhole":
        let items = allTokenMapForWormhole[fromChain?.key] || [];
        if (toChain?.key) {
          items = items.filter((item) => item.targetChain === toChain?.key);
          console.log(`====> items :`, items, toChain.key);
          return items;
        }
        console.log(`====> items :`, items);
        return items;
    }

    return [];
  });
  let fromToken = $ref({});
  let fromTokenBalance = $ref(0);
  let fromAmount = $ref(0);

  const setMaxAmount = () => {
    fromAmount = formatUnits(
      fromTokenBalance,
      fromToken.decimals,
      fromToken.decimals
    );
  };
  let isLoadingFromTokenBalance = $ref(false);
  watch(
    () => fromChain?.key,
    async () => {
      // console.log(`====> fromChain :`, fromChain);
      // fromToken = {};
      fromTokenBalance = 0;
      // fromAmount = 0
      if (fromChain?.key && !allTokenMapForWormhole[fromChain?.key]) {
        const query = {
          sourceChain: fromChain?.key,
        };
        const rz = await getRequest("/api/token", query);
        allTokenMapForWormhole[fromChain?.key] = (rz.items || []).map(
          (item) => {
            const tmp = useOmit(useClone(item), ["icon"]);
            tmp["label"] = item.sourceTokenName;
            if (item.icon.startsWith("http")) {
              tmp["avatar"] = {
                src: item.icon,
              };
            } else {
              tmp["icon"] = item.icon;
            }
            return tmp;
          }
        );
      }
    },
    { immediate: true }
  );

  const isWrongNetwork = $computed(() => {
    if (!fromChain) return false;
    return fromChain.id !== currentChainId;
  });

  const currentChain = $computed(() => {
    return allChainList.find((item) => item.id === currentChainId);
  });
  const network = $computed(() => {
    return currentChain?.key;
  });

  const doLoadFromTokenBalance = async () => {
    fromTokenBalance = 0;
    isLoadingFromTokenBalance = true;

    if (fromToken.isWrap) {
      // wrap native
      console.log(`====> isWrap fromToken :`, fromToken);
      fromTokenBalance = await readContractByName(
        "UNIBridgeWormhole",
        "balanceOf",
        [currentAccount, fromToken.sourceTokenId]
      );
      console.log(`====> fromTokenBalance :`, fromTokenBalance);
    } else {
      switch (fromToken.tokenType) {
        case 0:
          fromTokenBalance = await walletClient.getBalance({
            address: currentAccount,
          });
          break;
        case 1: // ERC20
          fromTokenBalance = await walletClient.readContract({
            address: fromToken.sourceTokenAddress,
            functionName: "balanceOf",
            abi: erc20ABI,
            args: [currentAccount],
          });
          break;
      }
    }

    isLoadingFromTokenBalance = false;
  };

  const fromWalletAppList = $computed(() => {
    if (!fromChain) {
      return [];
    }

    let tag = "evm";
    let walletAppMap = {};

    if (fromChain.key === "ao") {
      tag = "ar";
    }

    walletAppMap = useKeyBy(
      useFilter(allWalletList, (wallet) => {
        return wallet.tags.includes(tag);
      }),
      "rdns"
    );

    useForEach(providers, ({ provider, info }) => {
      if (!walletAppMap[info.rdns]) return;
      walletAppMap[info.rdns].isInstalled = true;
      walletAppMap[info.rdns].provider = provider;
    });
    return useSortBy(walletAppMap, "id");
  });

  const toChainList = $computed(() => {
    switch (currentPath) {
      case "swapkit":
        return [...allChainList].filter(
          (item) => !wormholeChainsKeyArr.includes(item.key)
        );
      case "wormhole":
        return [...fromChainList].filter((item) => fromChain?.key !== item.key);
    }
    return [];
  });

  let toChain = $ref();
  const toTokenList = $computed(() => {
    switch (currentPath) {
      case "swapkit":
        return allTokenMapForSwapkit[toChain?.key] || [];
      case "wormhole":
        // TODO: list the assets current wallet has
        return allTokenMapForWormhole[toChain?.key] || [];
    }

    return [];
  });
  let toToken = $ref({});
  let toAmount = $ref(0);
  let toTokenBalance = $ref(0);

  watchEffect(async () => {
    if (isWrongNetwork) {
      fromToken = {};
      // fromTokenList = []
      return;
    }
    if (isEmpty(fromToken)) return;

    await doLoadFromTokenBalance();
  });

  watch($$(currentPath), () => {
    fromChain = null;
    fromToken = {};
    toChain = null;
    toToken = {};
  });

  function listProviders() {
    if (providers.length > 0) return;
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      if (providers.map((p) => p.info.uuid).includes(event.detail.info.uuid))
        return;

      providers = [...providers, event.detail];
      const { rdns } = event.detail.info;

      // if (currentRdns === rdns && fromChainId !== 0) {
      //   fromChain = fromChainList.find((item) => item.id === fromChainId);
      //   console.log(`====> currentRdns :`, currentRdns);
      //   connectOrJump(currentRdns);
      // }
    }

    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    // Notify event listeners and other parts of the dapp that a provider is requested.
    window.dispatchEvent(new Event("eip6963:requestProvider"));
  }

  const forceSwitchChain = async (chain, provider) => {
    if (!provider) {
      isConnectorOpen = true;
      return false;
    }
    isLoading = true;
    let error = "";
    const chainId = `0x${chain.id.toString(16)}`;

    try {
      await provider // Or window.ethereum if you don't support EIP-6963.
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          const data = {
            chainId,
            chainName: chain.name,
            nativeCurrency: { ...chain.nativeCurrency },
            rpcUrls: [useGet(chain, "rpcUrls.default.http[0]")],
            blockExplorerUrls: [useGet(chain, "blockExplorers.default.url")],
          };
          await provider // Or window.ethereum if you don't support EIP-6963.
            .request({
              method: "wallet_addEthereumChain",
              params: [data],
            });
        } catch (errMsg) {
          error = errMsg;
        }
      } else {
        error = switchError;
      }
    }
    isLoading = false;
    if (error) {
      addError(error.message);
      return false;
    }
    return true;
  };
  // Connect to the selected provider using eth_requestAccounts.
  const connectWithProvider = async (
    wallet: EIP6963AnnounceProviderEvent["detail"]
  ) => {
    try {
      const accounts = await wallet.provider.request({
        method: "eth_requestAccounts",
      });
      const chainId = await wallet.provider.request({ method: "eth_chainId" });
      wallet.provider.on("chainChanged", (chainId) => {
        currentChainId = Number(chainId);
      });
      currentChainId = Number(chainId);
      if (currentChainId !== fromChain?.id) {
        const rz = await forceSwitchChain(fromChain, wallet.provider);
        if (!rz) {
          return;
        }
      }
      currentAccount = accounts[0];
      currentWallet = wallet;
      isConnectorOpen = false;
      walletClient = createWalletClient({
        account: currentAccount,
        chain: fromChain,
        transport: custom(wallet.provider),
      }).extend(publicActions);
      return true;
    } catch (error) {
      // TODO: show error message to user
      console.error("Failed to connect to provider:", error);
      return false;
    }
  };

  const connectOrJump = async (rdns) => {
    const walletAppMap = useKeyBy(fromWalletAppList, "rdns");
    if (walletAppMap[rdns]?.isInstalled) {
      const rz = connectWithProvider(walletAppMap[rdns]);
      if (rz) {
        currentRdns = rdns;
        fromChainId = fromChain?.id;
      }
      return;
    }
    // do jump
    const url = walletAppMap[rdns]?.url;
    if (url) {
      window.open(url, "_blank");
    }
  };

  let toAddress = $(
    useLocalStorage("uni-toAddress", "", { initOnMounted: true })
  );

  const swapDirection = () => {
    [fromToken, toToken] = [toToken, fromToken];
    [fromChain, toChain] = [toChain, fromChain];
    [fromAmount, toAmount] = [toAmount, fromAmount];
  };

  const writeContract = async (
    address,
    abi,
    functionName,
    args,
    value = 0n
  ) => {
    try {
      const params = {
        address,
        abi,
        functionName,
        args,
        value,
      };
      console.log(`====> params :`, params);
      const { request, result } = await walletClient.simulateContract(params);
      const hash = await walletClient.writeContract(request);
      const tx = await walletClient.waitForTransactionReceipt({
        hash,
      });
      if (tx.status !== "success") {
        throw new Error("tx error");
      }
      return {
        tx,
        result,
      };
    } catch (err) {
      console.log(`====> err :`, err);
      throw new Error(err);
    }
  };

  const writeContractByName = async (name, functionName, args, value = 0n) => {
    if (!fromChain?.key || fromChain.id !== walletClient.chain.id) {
      const rz = await forceSwitchChain(fromChain, walletClient);
      if (!rz) {
        addError("Failed to switch chain.");
      }
      return false;
    }
    const { address, abi } = getContractInfo(name, walletClient.chain.name);
    return writeContract(address, abi, functionName, args, value);
  };

  const readContractByName = async (
    name,
    functionName,
    args,
    network = false
  ) => {
    if (!network) {
      network = walletClient.chain.key;
    }
    const chain = chainsMap[network];
    const publicClient = createPublicClient({
      chain,
      transport: http(),
    });

    const { address, abi } = getContractInfo(name, network);
    const params = {
      address,
      abi,
      functionName,
      args,
    };
    // console.log(`====> params :`, params);

    try {
      const data = await publicClient.readContract(params);
      return data;
    } catch (err) {
      console.log(`====> err :`, err);
      throw new Error(err);
    }
  };

  const ensureAllowance = async (erc20Name, spenderName, amount) => {
    try {
      const spender = getContractAddress(spenderName, network);
      const rz = await readContractByName(erc20Name, "allowance", [
        currentAccount,
        spender,
      ]);
      const rz2 = await readContractByName(erc20Name, "balanceOf", [
        currentAccount,
      ]);
      if (rz < amount) {
        await writeContractByName(erc20Name, "approve", [spender, amount]);
      }
    } catch (err) {
      console.log(`====> err :`, err);
      throw new Error(err);
    }
  };

  const txLink = (hash, _network) => {
    if (!_network) {
      _network = network;
    }
    const chain = chainsMap[_network];
    return chain.blockExplorers.default.url + "/tx/" + hash;
  };

  return $$({
    txLink,
    ensureAllowance,
    writeContractByName,
    readContractByName,
    swapDirection,
    toAddress,
    isLoading,
    currentChain,
    currentChainId,
    network,
    forceSwitchChain,
    setMaxAmount,
    fromAmount,
    isWrongNetwork,
    currentAccount,
    currentWallet,
    toTokenList,
    toToken,
    listProviders,
    doLoadFromTokenBalance,
    writeContract,
    connectOrJump,
    providers,
    isConnected,
    walletClient,
    erc20ABI,
    erc721ABI,
    currentPath,
    isConnectorOpen,
    isAddressBookOpen,
    fromChainList,
    toChain,
    toChainList,
    fromWalletAppList,
    toAmount,
    isLoadingFromTokenBalance,
    toTokenBalance,
    fromChain,
    fromWalletApp,
    fromTokenList,
    fromToken,
    fromTokenBalance,
  });
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(uniConnectorStore, import.meta.hot));
