// Single source of truth for business facts. Values come from docs/brief.md section 2.
// DEMO: Coquina Stoneworks is fictional (see "Demo mode" in CLAUDE.md).

export const site = {
  name: "Coquina Stoneworks",
  legalName: "Coquina Stoneworks LLC",
  tagline: "Patios, outdoor kitchens, retaining walls and pool decks, built for Florida weather since 2014.",
  phone: "+19045550142", // E.164, fictional 555-01xx range
  email: "hello@example.com",
  address: null,
  serviceAreaOnly: true,
  region: "St. Johns County, FL",
  areas: [
    "St. Augustine",
    "St. Augustine Beach",
    "Ponte Vedra Beach",
    "Nocatee",
    "World Golf Village",
    "Fruit Cove",
  ],
  hours: [
    { days: "Mon–Fri", open: "07:00", close: "17:30" },
    { days: "Sat", open: null, close: null, note: "By appointment" },
  ],
  hoursText: "Mon–Fri 7:00 am–5:30 pm · Sat by appointment",
  founded: 2014,
  insured: true,
  license: null,
  warranty: "5-year workmanship warranty on every hardscape we install.",
  rating: { value: 4.9, count: 86, isSample: true },
  social: { facebook: null, instagram: null },
  studio: { name: "Perennial Studio" },
} as const;

/** "+19045550142" -> "(904) 555-0142" */
export function formatPhone(e164: string): string {
  const d = e164.replace(/\D/g, "").slice(-10);
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export const phoneDisplay = formatPhone(site.phone);
export const phoneHref = `tel:${site.phone}`;

/** Main navigation, used by the header, mobile menu and footer. */
export const nav = [
  { label: "Services", href: "/services/" },
  { label: "Projects", href: "/projects/" },
  { label: "Our story", href: "/about/" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const quoteHref = "/contact/";
