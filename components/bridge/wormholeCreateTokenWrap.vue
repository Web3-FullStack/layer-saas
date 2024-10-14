<script setup lang="ts">
const { chainArr, tokenTypeArr } = $(wormholeStore());
const { addSuccess } = $(notificationStore());
const { writeContractByName, fromChain, fromChainList } = $(uniConnectorStore());

const route = useRoute();

let sourceChain = $ref({});
const wormholeChainId = $computed(() => {
  return chainArr[sourceChain?.key];
});

let icon = $ref("");
let name = $ref("");
let tokenType = $ref(0);
let tokenAddress = $ref("");
let sourceChainTokenId = $ref("");
let sourceTokenName = $ref("");
watch(
  () => route.query.token + sourceChain?.key + fromChain?.key,
  () => {
    if (!sourceChain?.key) {
      return;
    }
    switch (route.query.token) {
      case "native":
        icon = "token-branded:avax";
        name = "wAVAX";
        tokenType = 4;
        // tokenAddress = getContractAddress("MockERC20", sourceChain?.key);
        break;
      case "erc20":
        icon = "token-branded:bifi";
        name = "wBIFI";
        tokenType = 1;
        tokenAddress = getContractAddress("MockERC20", sourceChain?.key);
        break;
      case "erc721":
        icon = "https://bafybeic7ormpinhhzw4o5sb7ulkqdm6z6kf57kgnjtf2r7zaxvayq5megm.ipfs.dweb.link/5";
        sourceTokenName = "WuKongNFTCelo";
        name = "wWukongNFTCelo";
        tokenType = 2;
        tokenAddress = getContractAddress("MockERC721", sourceChain?.key);
        break;
      case "erc1155":
        icon = "https://i.nfte.ai/ia/l1/14226/5492323907260393758_2125713998.avif";
        name = "wMAYC";
        tokenType = 3;
        tokenAddress = getContractAddress("MockERC1155", sourceChain?.key);
        sourceChainTokenId = 1;
        break;
      default:
        icon = "token-branded:avax";
        name = "wAVAX";
        tokenType = 4;
        break;
    }
  },
  { immediate: true }
);

let isLoading = $ref(false);
const doSubmit = async () => {
  if (isLoading) return;
  isLoading = true;
  // submit onChain
  const _tokenType = tokenType === 4 ? 0 : tokenType;
  if (_tokenType === 0) {
    tokenAddress = "0x0000000000000000000000000000000000000000";
    sourceChainTokenId = 0;
  }
  if (_tokenType === 1 || _tokenType === 2) {
    sourceChainTokenId = 0;
  }
  const { tx, result } = await writeContractByName("UNIBridgeWormhole", "createTokenWrap", [
    name,
    _tokenType,
    wormholeChainId,
    tokenAddress,
    sourceChainTokenId,
  ]);
  const tokenId = parseInt(result.toString());
  // const tokenId = 1;
  console.log(`====> tx, result :`, tx, result, tokenId);

  const data = {
    wormholeChainId,
    network: fromChain.key,
    icon,
    name,
    sourceTokenName,
    tokenId,
    targetChain: fromChain.key,
    sourceChain: sourceChain?.key,
    tokenType: _tokenType,
    sourceTokenAddress: tokenAddress,
    sourceTokenId: sourceChainTokenId,
  };
  const rz = await postRequest("/api/token", data);
  console.log(`====> rz :`, data, rz);
  // submit to api server
  isLoading = false;
};

const bridgeAddress = $computed(() => {
  const key = sourceChain?.key;
  if (!key) return "";
  const { address } = getContractInfo("UNIBridgeWormhole", key);
  return address;
});
let isLoadingUpdate = $ref(false);
const doSubmitUpdateBridgeMap = async () => {
  if (isLoadingUpdate) return;
  isLoadingUpdate = true;
  const chainId = chainArr[sourceChain?.key];
  const rz = await writeContractByName("UNIBridgeWormhole", "updateBridgeAddressMap", [chainId, bridgeAddress]);
  if (rz) {
    addSuccess("Update Bridge address success");
  }
  isLoadingUpdate = false;
};
</script>

<template>
  <div>
    <div class="rounded-lg space-y-4 bg-gray-700 mt-10 min-w-80 p-6 py-10">
      <div class="text-center text-xl">Connect Status</div>
      <div class="flex-bc space-x-8">
        <BridgeInputMenu :items="fromChainList" v-model="fromChain" placeholder="Select chain" />
        <UniConnector class="flex-1" />
      </div>
    </div>
    <div class="rounded-lg space-y-4 bg-gray-700 mt-10 min-w-80 p-6 py-10">
      <div class="text-center text-xl">Create Token Wrap (Admin only)</div>
      <div class="space-y-2">
        <div class="flex-bc space-x-8">
          <div class="text-sm w-1/4">Source Chain</div>
          <BridgeInputMenu :items="fromChainList" v-model="sourceChain" placeholder="Select chain" class="flex-1" />
        </div>
        <div class="flex-bc space-x-8">
          <div class="text-sm w-1/4">Source Token Name</div>
          <UInput v-model="sourceTokenName" block class="flex-1" />
        </div>
        <div class="flex-bc space-x-8">
          <div class="text-sm w-1/4">Token Type</div>
          <UInputMenu class="flex-1" v-model="tokenType" :options="tokenTypeArr" value-attribute="id" option-attribute="name" />
        </div>
        <div class="flex-bc space-x-8">
          <div class="text-sm w-1/4">Token Icon</div>
          <UInput v-model="icon" block class="flex-1" />
        </div>
        <div class="flex-bc space-x-8">
          <div class="text-sm w-1/4">Token Name</div>
          <UInput v-model="name" block class="flex-1" />
        </div>

        <div class="flex-bc space-x-8">
          <div class="text-sm w-1/4">Token Address</div>
          <UInput v-model="tokenAddress" block class="flex-1" />
        </div>
        <div class="flex-bc space-x-8">
          <div class="text-sm w-1/4">Token ID</div>
          <UInput v-model="sourceChainTokenId" block class="flex-1" />
        </div>
      </div>
      <UButton block :loading="isLoading" size="md" @click="doSubmit">Submit</UButton>
      <div class="text-center pt-2 text-gray-400">
        Contract <a href="https://x.com/starkevm99" target="_blank" class="text-red-400">StarkEVM99</a> to add route
      </div>
    </div>

    <div class="rounded-lg space-y-4 bg-gray-700 mt-10 min-w-80 p-6 py-10">
      <div class="text-center text-xl">Update Bridge Map</div>
      <div class="flex-bc space-x-8">
        <div class="text-sm w-1/4">Source Chain</div>
        <BridgeInputMenu :items="fromChainList" v-model="sourceChain" placeholder="Select chain" class="flex-1" />
      </div>
      <div class="flex-bc space-x-8">
        <div class="text-sm w-1/4">Bridge Address on Source Chain</div>
        <UInput v-model="bridgeAddress" block class="flex-1" />
      </div>
      <UButton block :loading="isLoadingUpdate" size="md" @click="doSubmitUpdateBridgeMap">Submit</UButton>
    </div>
  </div>
</template>
