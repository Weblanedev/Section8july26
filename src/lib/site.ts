export const siteConfig = {
  name: "Section Eight",
  title: "Section Eight - Modern Tech Products for Nigeria",
  shortTitle: "Section Eight",
  description:
    "Shop premium and budget-friendly tech products in Nigeria. Phones, laptops, accessories, gaming gear and more. Secured payment at checkout.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://sectioneight.ng",
  ogImageAlt: "Section Eight - Nigeria's smartest tech products marketplace",
};

/** Verified company contact details (contact page, footer, promos) */
export const companyContact = {
  email: "operations@sectioneight.ng",
  phoneTel: "+2349096361527",
  phoneDisplay: "+234 (0) 9096 3615 27",
  addressLines: [
    "12, Thomas Olaniyan Street,",
    "Anthony Village, Lagos State,",
    "Nigeria",
  ],
  addressShort: "12, Thomas Olaniyan Street, Anthony Village, Lagos",
  policyLastUpdated: "November 5, 2025",
  supportHours: "Monday - Friday, 9:00 AM - 6:00 PM WAT",
};

export function absoluteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return path ? `${base}${path.startsWith("/") ? path : `/${path}`}` : base;
}
