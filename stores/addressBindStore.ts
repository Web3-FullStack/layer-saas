export const addressBindStore = defineStore("addressBindStore", () => {
  const { alertError, addError, alertWithModal } = $(notificationStore());
  const {signMessage: arSignMessage, address} = $(pwaConnectorStore())
  const networkMap = $computed(() => ({
    'ao': arSignMessage,
  }))

  const ensureBind = async (network: string) => {
    const isBinded = getLsItem(`binded-${network}-${address}`)
    if(isBinded){
      return true
    }
    const rz = await getRequest("/api/me/bindAddress", { network });
    if (rz.error) {
      alertWithModal(
        "bindAddressModal",
        "Sign message",
        "Please sign the message below to bind your address",
        { network, address }
      );
      return false;
    }
    return true;
  };

  const doBind = async (network: string, message: string) => {
    if(!networkMap[network]){
      addError("Error", `Network not supported: ${network}`)
      return false
    }
    const signedMessage = await networkMap[network](message)
    if(signedMessage.error){
      addError("Error", `Failed to sign message: ${signedMessage.error}`)
      return false
    }
    const rz = await postRequest("/api/me/bindAddress", {
      network,
      signedMessage,
    });

    if (rz.error) {
      addError(
        "Error",
        "Failed to bind address with error: " + rz.error
      );
      return false;
    }
    setLsItem(`binded-${network}-${address}`, 'yes')
    return true
  };

  return $$({ ensureBind, doBind });
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(addressBindStore, import.meta.hot));
