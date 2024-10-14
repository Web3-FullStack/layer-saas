import { serverSupabaseServiceRole, serverSupabaseUser } from "#supabase/server";
import { createPublicClient, http } from "viem";

export default eventHandler(async (event) => {
  const adminClient = serverSupabaseServiceRole(event);
  const {
    network,
    wormholeChainId,
    icon,
    name,
    tokenId,
    targetChain,
    sourceChain,
    tokenType,
    sourceTokenName,
    sourceTokenAddress,
    sourceTokenId,
  } = await readBody(event);

  const isExist = await adminClient
    .from("bridgeTokenWrap")
    .select()
    .eq("targetChain", targetChain)
    .eq("sourceChain", sourceChain)
    .eq("sourceTokenAddress", sourceTokenAddress)
    .eq("sourceTokenId", sourceTokenId);

  if (isExist.data.length > 0) {
    return isExist.data[0];
  }

  const { address, abi } = getContractInfo("UNIBridgeWormhole", network);
  let params = {
    address,
    abi,
    functionName: "tokenIndexMap",
    args: [wormholeChainId, sourceTokenAddress],
  };
  if (tokenType === 3) {
    params = {
      ...params,
      functionName: "erc1155TokenIndexMap",
      args: [wormholeChainId, sourceTokenAddress, sourceTokenId],
    };
  }
  const chain = chainsMap[network];
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  });
  const _tokenId = await publicClient.readContract(params);
  if (_tokenId == 0 || _tokenId != tokenId) {
    return {
      error: "tokenId is not match",
      message: `On chain tokenId ${_tokenId} != ${tokenId}`,
    };
  }

  const data1 = {
    icon,
    name,
    tokenId,
    targetChain,
    sourceChain,
    tokenType,
    sourceTokenAddress,
    sourceTokenId,
    sourceTokenName,
    isWrap: false,
  };
  const data2 = {
    icon,
    name: sourceTokenName,
    sourceTokenName: name,
    tokenId: sourceTokenId,
    sourceTokenId: tokenId,

    targetChain: sourceChain,
    sourceChain: targetChain,
    tokenType,

    sourceTokenAddress: getContractAddress("UNIBridgeWormhole", network),
    isWrap: true,
  };

  const rz1 = await adminClient.from("bridgeTokenWrap").insert(data1);
  const rz2 = await adminClient.from("bridgeTokenWrap").insert(data2);
  return {
    rz1,
    rz2,
  };
});
