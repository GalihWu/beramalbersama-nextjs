// utils/gtmEvents.js
import TagManager from "react-gtm-module";

export const sendPurchaseEvent = (value, program, uuid) => {
  TagManager.dataLayer({
    dataLayer: {
      event: "purchase",
      value: value,
      purchase: value,
      uuid: uuid,
      productName: program,
      currency: "IDR",
    },
  });
};
