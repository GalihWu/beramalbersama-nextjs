// utils/gtmEvents.js
import TagManager from 'react-gtm-module';

export const GTMAddEvent = ({ event }) => {
  console.log(event);
  console.log(TagManager);
  TagManager.dataLayer({
    dataLayer: {
      event: event,
    },
  });
};
