// @ts-nocheck
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;

export const pageview = (url: any) => {
	window.gtag('config', GA_MEASUREMENT_ID, {
		page_path: url,
	});
};

export const event = ({ action, category, label, value }) => {
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value,
	});
};
