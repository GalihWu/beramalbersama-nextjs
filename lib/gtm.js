export const trackConversion = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'custom_event',
      category: 'form_submission',
      action: 'submit',
      label: 'sign_up',
      value: 1,
    });
  };
  