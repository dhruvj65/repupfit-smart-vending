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
        a: "No. Each machine stocks sealed cups and lids, so your shake is poured, mixed and ready to grab.",
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
