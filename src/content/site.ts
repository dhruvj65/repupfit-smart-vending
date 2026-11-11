/**
 * Site-wide brand and contact details. Values marked PLACEHOLDER should be
 * replaced with the real business details before launch.
 */
export const SITE = {
  name: "RepUpFit",
  tagline: "Fresh sports shakes, mixed on demand where you train.",
  // PLACEHOLDER contact details
  email: "hello@repupfit.com",
  phone: "+1 (555) 014-2200",
  phoneHref: "tel:+15550142200",
  whatsapp: "https://wa.me/15550142200",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "Facebook", href: "https://facebook.com" },
  ],
  // PLACEHOLDER pricing
  priceRange: "€2.50 – €3.50",
} as const;

export const NAV_LINKS = [
  { to: "/flavours", label: "Flavours" },
  { to: "/machines", label: "Machines" },
  { to: "/faq", label: "FAQ" },
] as const;
