import { createDataItemSigner } from "@permaweb/aoconnect";
import { ArweaveWebWallet } from "arweave-wallet-connector";
import Arweave from "arweave";

export const pwaConnectorStore = defineStore("pwaConnectorStore", () => {
  const { alertError } = $(notificationStore());
  const { isLogin } = $(supabaseStore());
  const { ensureBind } = $(addressBindStore());
  let address = $ref("");
  let isLoading = $ref(false);
  const signer = $computed(() => {
    if (!address) return false;
    // @ts-ignore
    return createDataItemSigner(wallet);
  });
  const truncatedAddress = $computed(() => {
    if (address) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return "";
  });

  const init = async () => {
    let url = "https://pwa.rwa-wallet.com";
    if(process.env.NODE_ENV === "development"){
      url = "http://localhost:8080";
    }
    const wallet = new ArweaveWebWallet(
      {
        name: "UNI Bridge",
        logo: `${location.origin}/logo.png`,
      },
      {
        state: { url },
      }
    );
    wallet.setUrl(wallet.url);
    wallet.on("disconnect", async () => {
      await disconnect(true);
    });
    // @ts-ignore
    window.wallet = wallet;
  };

  const connect = async () => {
    if (!isLogin) {
      return {
        error: "You need to Auth with X first",
      };
    }
    if (isLoading) return;
    isLoading = true;

    try {
      address = await wallet.connect();
      if(address){
        await ensureBind("ao");
      }
      return true;
    } catch (error) {
      return {
        error: "You rejected connection",
      };
    } finally {
      isLoading = false;
    }
  };

  const disconnect = async (isFromWallet = false) => {
    if (!isFromWallet) {
      await wallet.disconnect();
    }
    address = null;
  };

  const ensurePwaLogin = () => {
    if (!address) {
      alertError("Error", "You need to connect to AO first");
      return false;
    }
    return true;
  };

  const signMessage = async (message: string) => {
    if (!ensurePwaLogin()) {
      return { error: "Not connected to AO" };
    }

    try {
      // @ts-ignore
      const owner = await wallet.getPublicKey()
      // @ts-ignore
      const data = Arweave.utils.stringToBuffer(message);
      // @ts-ignore
      const signature = await wallet.signMessage(data, {
        hashAlgorithm: "SHA-256",
      });

      return {
        owner,
        data: Arweave.utils.bufferTob64Url(data),
        signature: Arweave.utils.bufferTob64Url(signature),
      };
    } catch (error) {
      return { error };
    }
  };

  return $$({
    connect,
    disconnect,
    address,
    init,
    truncatedAddress,
    signer,
    ensurePwaLogin,
    isLoading,
    signMessage,
  });
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(pwaConnectorStore, import.meta.hot));
