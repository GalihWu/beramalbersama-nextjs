// utils/gtmEvents.js
import TagManager from "react-gtm-module";

export const sendAddToCartEvent = (value, program, uuid) => {
  TagManager.dataLayer({
    dataLayer: {
      event: "addToCart",
      value: value,
      currency: "IDR",
      productName: program,
      uuid: uuid,
    },
  });
};
