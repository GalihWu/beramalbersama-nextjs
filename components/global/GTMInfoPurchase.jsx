// utils/gtmEvents.js
import TagManager from "react-gtm-module";

export const GTMInfoPurchase = (value, uuid) => {
  TagManager.dataLayer({
    dataLayer: {
      event: "purchasePage",
      value: value,
      purchase: value,
      uuid: uuid,
      currency: "IDR",
    },
  });
};
