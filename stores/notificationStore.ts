import alertModal from "@/components/modal/alert.vue";
import authWithXModal from "@/components/modal/authWithX.vue";
import connectAOModal from "@/components/modal/connectAO.vue";
import bindAddressModal from "@/components/modal/bindAddress.vue";
import faqModal from "@/components/modal/faq.vue";

const modalMap = {
  authWithXModal,
  connectAOModal,
  bindAddressModal,
  faqModal,
};

export const notificationStore = defineStore("notificationStore", () => {
  const toast = useToast();
  const modal = useModal();

  const addSuccess = (title: string, description?: string) => {
    toast.add({ title, description, icon: "heroicons:check-solid" });
  };

  const alertError = (title: string, description?: string) => {
    modal.open(alertModal, {
      title,
      description,
    });
  };
  const alertWithModal = (
    modalName: string | Component,
    title: string,
    description?: string,
    params?: any
  ) => {
    if (typeof modalName === "string") {
      if (!modalMap[modalName]) {
        addError("Error", `Modal ${modalName} not found`);
        return;
      }
      modalName = modalMap[modalName];
    }
    modal.open(modalName, {
      title,
      description,
      ...params,
    });
  };

  const addError = (title: string, description?: string) => {
    toast.add({
      title,
      description,
      icon: "heroicons:x-mark-20-solid",
      color: "red",
    });
  };
  const addWarning = (title: string, description?: string) => {
    toast.add({
      title,
      description,
      icon: "heroicons:exclamation-triangle",
      color: "amber",
    });
  };

  return $$({
    alertError,
    addSuccess,
    addError,
    addWarning,
    modal,
    alertWithModal,
  });
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(notificationStore, import.meta.hot));
