import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_ALL, FAQ_GROUPS } from "@/content/faq";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — RepUpFit payments, drinks, venues and support" },
      {
        name: "description",
        content:
          "Answers about paying at a RepUpFit kiosk, what's in the shakes, hosting a machine at your venue and getting support.",
      },
      { property: "og:title", content: "RepUpFit FAQ — good to know" },
      {
        property: "og:description",
        content: "Everything about paying, the drinks, hosting a kiosk and support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ALL.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Good to know">
        Quick answers about buying a drink, what's inside and hosting a kiosk. Still stuck? Our team is one message
        away.
      </PageHero>

      <section className="container mx-auto grid gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[240px_1fr]">
        <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col">
            {FAQ_GROUPS.map((g) => (
              <li key={g.title}>
                <a
                  href={`#${slug(g.title)}`}
                  className="block rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground lg:rounded-xl"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-16">
          {FAQ_GROUPS.map((g) => (
            <Reveal key={g.title}>
              <section id={slug(g.title)} className="scroll-mt-28">
                <h2 className="text-2xl font-bold uppercase md:text-3xl">{g.title}</h2>
                <Accordion type="single" collapsible className="mt-6 border-t border-border">
                  {g.items.map((item) => (
                    <AccordionItem key={item.q} value={item.q}>
                      <AccordionTrigger className="py-6 text-left font-display text-lg font-bold hover:no-underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container mx-auto px-5 py-20 md:px-8 md:py-24">
          <h2 className="text-3xl font-bold uppercase md:text-4xl">Still have a question?</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: MessageCircle, label: "WhatsApp", value: "Message support", href: SITE.whatsapp, external: true },
              { icon: Phone, label: "Call us", value: SITE.phone, href: SITE.phoneHref, external: false },
              { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, external: false },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex h-full items-center justify-between gap-4 rounded-3xl border border-border bg-background p-6 transition-colors hover:border-primary"
                >
                  <span className="flex items-center gap-4">
                    <c.icon className="size-6 text-primary" />
                    <span>
                      <span className="eyebrow block">{c.label}</span>
                      <span className="mt-1 block font-semibold">{c.value}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
                </a>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-muted-foreground">
            Run a gym or venue?{" "}
            <Link to="/partners" className="font-semibold text-primary underline-offset-4 hover:underline">
              Find out about hosting a kiosk
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
