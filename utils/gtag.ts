// export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-0EWD6WDSBY'
export const GA_TRACKING_ID_PRODUCTION = 'G-7LRDKCTDGQ'
export const GA_TRACKING_ID_DEV = 'G-DS42L7MYPV'
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION' ? GA_TRACKING_ID_PRODUCTION : GA_TRACKING_ID_DEV
export const pageView = (url: URL) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url
  });
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value
  });
};
