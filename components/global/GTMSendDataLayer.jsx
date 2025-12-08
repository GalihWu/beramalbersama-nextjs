// utils/gtmEvents.js
import TagManager from "react-gtm-module";

export const GTMSendDataLayer = (value, uuid) => {
  TagManager.dataLayer({
    dataLayer: {
      value: value,
      uuid: uuid,
      currency: "IDR",
    },
  });
};
