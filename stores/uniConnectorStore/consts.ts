import arbToken from "~/assets/tokenlists/arb.json";
import avaxToken from "~/assets/tokenlists/avax.json";
import bnbToken from "~/assets/tokenlists/bnb.json";
import bscToken from "~/assets/tokenlists/bsc.json";
import ethToken from "~/assets/tokenlists/eth.json";
import btcToken from "~/assets/tokenlists/btc.json";
import ltcToken from "~/assets/tokenlists/ltc.json";
import bchToken from "~/assets/tokenlists/bch.json";
import dotToken from "~/assets/tokenlists/dot.json";
import dashToken from "~/assets/tokenlists/dash.json";
import kujiToken from "~/assets/tokenlists/kuji.json";
import mayaToken from "~/assets/tokenlists/maya.json";
import thorToken from "~/assets/tokenlists/thor.json";
import {
  acala,
  avalancheFuji,
  celoAlfajores,
  moonbaseAlpha,
  hardhat,
  avalanche,
  arbitrum,
  celo,
  dogechain,
  polygon,
  bsc,
  opBNB,
  mainnet,
  polygonAmoy,
} from "viem/chains";

let _allChainList = [
  {
    key: "arbitrum",
    icon: "token-branded:arbi",
    ...arbitrum,
  },
  {
    key: "acala",
    avatar: {
      src: "https://acala.network/assets/Acala%20Gradient-tyIktH2a.png",
    },
    ...acala,
  },
  {
    key: "polygon",
    icon: "token-branded:polygon-pos",
    ...polygon,
  },
  {
    key: "polygonAmoy",
    icon: "token-branded:polygon-pos",
    ...polygonAmoy,
  },
  {
    key: "dogechain",
    avatar: {
      src: "https://ugc.production.linktr.ee/tPCVQbdjQrCpobdIcJZp_ZZ28y10j9t75pLGN?io=true&size=avatar-v3_0",
    },
    ...dogechain,
  },
  {
    key: "hardhat",
    icon: "logos:hardhat-icon",
    ...hardhat,
  },
  {
    key: "moonbaseAlpha",
    icon: "token-branded:moonbeam",
    ...moonbaseAlpha,
  },
  {
    key: "ao",
    label: "Arweave",
    icon: "token:ar",
  },
  {
    key: "avalanche",
    icon: "token-branded:avax",
    ...avalanche,
  },
  {
    key: "avalancheFuji",
    icon: "token-branded:avax",
    ...avalancheFuji,
  },
  {
    key: "alfajores",
    icon: "token-branded:celo",
    ...celoAlfajores,
  },
  {
    key: "celo",
    icon: "token-branded:celo",
    ...celo,
  },
  {
    key: "bsc",
    icon: "token-branded:binance-smart-chain",
    ...bsc,
  },
  {
    key: "bnb",
    icon: "cryptocurrency-color:bnb",
    ...opBNB,
  },
  {
    key: "eth",
    icon: "token-branded:eth",
    ...mainnet,
  },
  {
    key: "btc",
    label: "BTC",
    icon: "token-branded:btc",
  },
  {
    key: "bch",
    label: "BCH",
    icon: "token-branded:bch",
  },
  {
    id: "dot",
    key: "dot",
    label: "DOT",
    icon: "token-branded:polkadot",
  },
  {
    key: "dash",
    label: "DASH",
    icon: "token-branded:dash",
  },
  {
    key: "kuji",
    label: "KUJI",
    icon: "token-branded:kujira",
  },
  {
    key: "ltc",
    label: "LTC",
    icon: "token-branded:ltc",
  },
  {
    key: "maya",
    label: "MAYA",
    avatar: {
      src: "https://storage.googleapis.com/token-list-swapkit-dev/images/maya.cacao.png",
    },
  },
  {
    key: "thor",
    label: "THOR",
    icon: "token-branded:thor",
  },
];

_allChainList = useMap(_allChainList, (item) => {
  return {
    ...item,
    label: item.name || item.label,
  };
});
_allChainList = useSortBy(_allChainList, "id");

export const allChainList = _allChainList;

export const allWalletList = [
  {
    rdns: "arconnect",
    label: "ArConnect",
    avatar: {
      src: "https://www.arconnect.io/_next/image?url=%2Flogo.png&w=640&q=75",
    },
    url: "https://www.arconnect.io/",
    tags: ["ar"],
  },
  {
    rdns: "io.metamask",
    label: "MetaMask",
    icon: "logos:metamask-icon",
    url: "https://metamask.io/",
    tags: ["evm"],
  },
  {
    rdns: "io.metamask.flask",
    label: "MetaMask Flask",
    avatar: {
      src: "/assets/logo/metamask-flask.png",
    },
    url: "https://docs.metamask.io/snaps/get-started/install-flask/",
    tags: ["evm"],
  },
];

export const erc20ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const erc721ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const allTokenMapForSwapkit = {
  arbitrum: arbToken,
  avalanche: avaxToken,
  bsc: bscToken,
  eth: ethToken,
  btc: btcToken,
  ltc: ltcToken,
  bch: bchToken,
  dot: dotToken,
  dash: dashToken,
  kuji: kujiToken,
  maya: mayaToken,
  thor: thorToken,
};

export const allTokenMapForWormhole2 = {
  avalancheFuji: [
    // native
    {
      address: "",
      identifier: "AVAX",
      decimals: 18,
      label: "AVAX",
      icon: "token-branded:avax",
    },
    // ERC20
    {
      address: "bridge-contract-address-on-avalancheFuji",
      tokenId: "the id in this ERC1155 contract",
      tokenType: "ERC20",
      identifier: "wCELO",
      decimals: 18,
      label: "wCELO",
      icon: "token-branded:celo",
    },
    // ERC721 (source NFT)
    {
      address: "CryptoPunksAddressOnAvaxFuji",
      tokenId: "nftTokenId",
      tokenType: "ERC721",
      identifier: "CryptoPunks",
      decimals: 1,
      label: "CryptoPunks",
      avatar: {
        src: "https://s.nfte.so/asset/collection/featured/SIPGAWJPYHJAGSVGQIXWOKPHREVQFDSL.jpg?x-oss-process=image/resize,m_fill,w_300,h_300,type_6/ignore-error,1",
      },
    },
  ],
  alfajores: [
    {
      address: "",
      identifier: "CELO",
      decimals: 18,
      label: "CELO",
      icon: "token-branded:celo",
      targetChains: ["avalancheFuji"],
      //   function sendCrossChainMessage(
      //     uint16 targetChain: avalancheFuji's id on wormhole,
      //     address targetAddress: unibridgeContractAddressOnAvalancheFuji,
      //     address receiver,
      //     address tokenAddress: 0x0 here, as it is celo native token,
      //     uint32 tokenAmount: 1 * 10**18,
      //     uint32 tokenId: 0
      // )
    },
    {
      address: "bridge-contract-address-on-celoAlfajores",
      tokenId: "the id in this ERC1155 contract",
      tokenType: "ERC20",
      identifier: "wAVAX",
      decimals: 18,
      label: "wAVAX",
      icon: "token-branded:avax",
    },
    // ERC721 (wNFT)
    {
      address: "CryptoPunksAddressOnAvaxFuji",
      tokenId: "nftTokenId",
      tokenType: "ERC721",
      identifier: "wCryptoPunks",
      decimals: 1,
      label: "wCryptoPunks",
      avatar: {
        src: "https://s.nfte.so/asset/collection/featured/SIPGAWJPYHJAGSVGQIXWOKPHREVQFDSL.jpg?x-oss-process=image/resize,m_fill,w_300,h_300,type_6/ignore-error,1",
      },
      // source meta
      sourceChain: "avalancheFuji",
      sourceAddress: "",
      sourceTokenId: "",
    },
  ],
};
