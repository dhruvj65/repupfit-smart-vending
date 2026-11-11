export type FaqItem = { q: string; a: string };
export type FaqGroup = { title: string; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Buying a drink",
    items: [
      {
        q: "How can I pay?",
        a: "Every machine accepts contactless bank cards, Apple Pay, Google Pay and QR-code payments. No cash, no app download required.",
      },
      {
        q: "Do I need to bring my own shaker?",
        a: "No. Each machine stocks sealed cups and lids, so your shake is poured, mixed and ready to grab. On the JK91 you can also use your own shaker bottle if you prefer.",
      },
      {
        q: "How long does a shake take?",
        a: "Around 40 seconds from tapping your card to picking up your drink.",
      },
      {
        q: "My contactless payment was declined — what now?",
        a: "Your bank may have hit its contactless limit. Make one purchase anywhere with your PIN and contactless payments will work again.",
      },
    ],
  },
  {
    title: "The drinks",
    items: [
      {
        q: "Are the shakes made with water or milk?",
        a: "Always filtered, chilled water. Some protein powders naturally contain milk derivatives, so if you avoid dairy choose our plant protein.",
      },
      {
        q: "Is there a plant-based option?",
        a: "Yes — our pea and rice protein blend is fully plant-based and available in every machine.",
      },
      {
        q: "Where do the ingredients come from?",
        a: "We only use certified sports nutrition from established brands, and every batch is stored sealed inside the machine.",
      },
      {
        q: "Are the machines hygienic?",
        a: "Yes. The mixing head is cleaned automatically — on the JK91 with high-temperature, high-pressure water after every single cup — and our team services each kiosk regularly.",
      },
    ],
  },
  {
    title: "For venues",
    items: [
      {
        q: "What does it cost to host a kiosk?",
        a: "Nothing upfront. We install, stock and maintain the machine, and you earn a share of every drink sold.",
      },
      {
        q: "What does the machine need?",
        a: "A standard power socket, roughly a square metre of floor space and a Wi-Fi or 4G signal. The JK91 can run from a tap connection or a water bottle pump.",
      },
      {
        q: "Which model is right for my venue?",
        a: "Busy clubs usually go for the JK91 or Pro 8; boutique studios and tight spaces suit the Compact 7. We'll recommend one after a quick site check.",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        q: "The machine isn't working. Who do I contact?",
        a: "Message our support team on WhatsApp or call the number printed on the machine. Tell us which venue you're at and, if you can, send a photo — we'll fix it fast.",
      },
      {
        q: "Can I get a refund?",
        a: "If a drink wasn't dispensed correctly, contact support with the time and location of your purchase and we'll refund you.",
      },
    ],
  },
];

export const FAQ_ALL: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items);
