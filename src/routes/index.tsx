import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeEuro,
  Blend,
  Clock3,
  CreditCard,
  Languages,
  Sparkles,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import athleteImg from "@/assets/athlete-shake.jpg";
import kioskImg from "@/assets/gym-kiosk.jpg";
import { CountUp } from "@/components/site/CountUp";
import { Marquee } from "@/components/site/Marquee";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { HeroScene } from "@/components/three/LazyScenes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DRINKS, TOTAL_FLAVOURS } from "@/content/drinks";
import { FAQ_ALL } from "@/content/faq";
import { MACHINES } from "@/content/machines";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RepUpFit — Fresh protein shakes from smart vending kiosks" },
      {
        name: "description",
        content:
          "Grab a freshly mixed protein shake, collagen, BCAA or isotonic drink at your gym or mall. Tap to pay, no shaker needed.",
      },
      { property: "og:title", content: "RepUpFit — A full fitness bar in one kiosk" },
      {
        property: "og:description",
        content: "Freshly mixed sports shakes at your gym. Tap to pay, no shaker needed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const FEATURES = [
  { icon: Blend, title: "Smooth-mix tech", text: "A high-speed vortex mixer blends every shake completely — zero clumps, every time." },
  { icon: Clock3, title: "Open when you are", text: "Available for as long as your gym or mall is open, early mornings included." },
  { icon: CreditCard, title: "Tap & go", text: "Contactless cards, Apple Pay, Google Pay or QR code. Done in seconds." },
  { icon: Sparkles, title: `${TOTAL_FLAVOURS}+ flavours`, text: "From double chocolate to cola lime — there's a favourite for every session." },
  { icon: BadgeEuro, title: SITE.priceRange, text: "Gym-bar quality at a price that makes sense after every workout." },
  { icon: Languages, title: "Easy interface", text: "A clean, multilingual touchscreen that anyone can use first time." },
];

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={["Fresh mixed", "Tap to pay", "No shaker needed", "Certified brands", "Ready in 40 seconds"]} />
      <Features />
      <Statement />
      <DrinksPreview />
      <Stats />
      <MachineTeaser />
      <FaqPreview />
      <PartnerCta />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-spotlight" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25 [mask-image:radial-gradient(60%_60%_at_60%_40%,black,transparent)]" />
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-fade-bottom" />

      <motion.div style={{ opacity: fade }} className="container relative mx-auto flex min-h-[100svh] flex-col justify-between px-5 pb-10 pt-32 md:px-8">
        <div className="max-w-xl">
          <motion.p
            className="eyebrow mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="size-2 animate-pulse-glow rounded-full bg-primary" />
            Smart sports-nutrition kiosks
          </motion.p>
          <h1 className="text-balance text-4xl font-bold uppercase leading-[1.02] md:text-6xl">
            <RevealWords text="A whole fitness bar in one machine" />
          </h1>
          <motion.p
            className="mt-6 max-w-md text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Protein, collagen, BCAA and isotonic drinks — freshly mixed in seconds at your gym or mall. Leave the
            shaker at home.
          </motion.p>
          <motion.div
            className="pointer-events-auto mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <Button asChild variant="volt" size="xl">
              <Link to="/machines">
                Meet the machines <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link to="/flavours">See flavours</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div style={{ y: wordY }} aria-hidden className="pointer-events-none select-none">
          <motion.div
            className="text-wordmark text-[17vw] md:text-[15.5vw]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            RepUp<span className="text-volt-gradient">Fit</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Features() {
  return (
    <section className="container mx-auto px-5 py-24 md:px-8 md:py-36">
      <SectionHeading
        index="01"
        label="Why RepUpFit"
        title="Your post-workout shake, three taps away"
        description="We put certified sports nutrition inside a smart kiosk so you can refuel the second your session ends."
      />
      <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.06} className="group relative bg-background p-8 transition-colors duration-500 hover:bg-surface md:p-10">
            <f.icon className="size-9 text-primary transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg]" strokeWidth={1.6} />
            <h3 className="mt-8 text-xl font-bold uppercase">{f.title}</h3>
            <p className="mt-3 text-muted-foreground">{f.text}</p>
            <span className="absolute right-8 top-8 font-display text-sm text-muted-foreground/50">0{i + 1}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textX = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border bg-surface py-24 md:py-32">
      <motion.p style={{ x: textX }} aria-hidden className="pointer-events-none whitespace-nowrap text-wordmark text-outline text-[14vw]">
        Train · Refuel · Repeat · Train · Refuel
      </motion.p>
      <div className="container mx-auto mt-10 grid items-center gap-12 px-5 md:grid-cols-2 md:px-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card">
          <motion.img
            src={athleteImg}
            alt="Athlete holding a RepUpFit shake after training"
            width={1280}
            height={1600}
            loading="lazy"
            style={{ y: imgY, scale: 1.2 }}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <SectionHeading
            index="02"
            label="The idea"
            title="No more powder in your gym bag"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground">
              Measuring scoops, rinsing shakers, forgetting your tub at home — we fixed all of it. Walk up to the
              kiosk, pick a drink, tap your card and take a perfectly mixed shake straight to the locker room.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 space-y-4">
              {["Mixed with filtered, chilled water", "Sealed cup and lid included", "Brands you already trust"].map((t) => (
                <li key={t} className="flex items-center gap-4 border-b border-border pb-4 font-semibold">
                  <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
                    <ArrowRight className="size-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DrinksPreview() {
  return (
    <section className="container mx-auto px-5 py-24 md:px-8 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading index="03" label="The menu" title="Five drinks, endless goals" />
        <Reveal>
          <Button asChild variant="outline-light" size="xl">
            <Link to="/flavours">
              Explore flavours <ArrowUpRight />
            </Link>
          </Button>
        </Reveal>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {DRINKS.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.07}>
            <Link
              to="/flavours"
              search={{ drink: d.id }}
              className="group relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/60"
            >
              <div className="flex -space-x-2">
                {d.flavours.slice(0, 4).map((f) => (
                  <span key={f.name} className="size-8 rounded-full border-2 border-card" style={{ backgroundColor: f.color }} />
                ))}
              </div>
              <div>
                <p className="eyebrow">{d.protein}</p>
                <h3 className="mt-2 text-2xl font-bold uppercase leading-tight">{d.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.short}</p>
                <p className="mt-5 flex items-center gap-2 text-sm font-bold text-primary">
                  {d.flavours.length} flavours
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: MACHINES.length, suffix: "", label: "Kiosk models" },
    { value: TOTAL_FLAVOURS, suffix: "", label: "Flavours on the menu" },
    { value: 40, suffix: "s", label: "From tap to shake" },
    { value: 0, suffix: "", label: "Shakers to wash" },
  ];
  return (
    <section className="border-y border-border bg-primary text-primary-foreground">
      <div className="container mx-auto grid grid-cols-2 gap-px px-5 md:grid-cols-4 md:px-8">
        {stats.map((s) => (
          <div key={s.label} className="py-12 md:py-16">
            <p className="font-display text-5xl font-extrabold md:text-7xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-widest opacity-75">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MachineTeaser() {
  return (
    <section className="container mx-auto px-5 py-24 md:px-8 md:py-36">
      <Reveal className="group relative overflow-hidden rounded-[2rem] border border-border">
        <img
          src={kioskImg}
          alt="RepUpFit kiosk installed in a modern gym"
          width={1600}
          height={1008}
          loading="lazy"
          className="h-[520px] w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 md:h-[640px]"
        />
        <div className="absolute inset-0 bg-fade-bottom" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-6 p-8 md:flex-row md:items-end md:p-12">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">04 — Our machines</p>
            <h2 className="text-3xl font-bold uppercase leading-tight md:text-5xl">Built for busy gym floors</h2>
            <p className="mt-4 text-muted-foreground">
              Three kiosk models — including the new 32-inch JK91 — one obsession: a perfect shake in under a minute. Spin them around in 3D.
            </p>
          </div>
          <Button asChild variant="volt" size="xl">
            <Link to="/machines">
              Meet the machines <ArrowRight />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

function FaqPreview() {
  return (
    <section className="container mx-auto grid gap-12 px-5 pb-24 md:grid-cols-[1fr_1.4fr] md:px-8 md:pb-36">
      <div>
        <SectionHeading index="05" label="FAQ" title="Good to know" />
        <Reveal delay={0.2}>
          <Button asChild variant="outline-light" size="xl" className="mt-8">
            <Link to="/faq">All questions</Link>
          </Button>
        </Reveal>
      </div>
      <Reveal>
        <Accordion type="single" collapsible className="border-t border-border">
          {FAQ_ALL.slice(0, 4).map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="py-6 text-left font-display text-lg font-bold hover:no-underline md:text-xl">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

export function PartnerCta() {
  return (
    <section className="container mx-auto px-5 pb-24 md:px-8 md:pb-36">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-volt-gradient p-10 text-primary-foreground md:p-16">
        <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] opacity-70">For gyms & venues</p>
            <h2 className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">
              Put a RepUpFit in your club
            </h2>
            <p className="mt-5 max-w-lg text-lg font-medium opacity-80">
              We install, stock and maintain the machine. You earn a share of every drink — zero hassle.
            </p>
          </div>
          <Link
            to="/partners"
            className="group inline-flex h-16 items-center gap-3 rounded-full bg-primary-foreground px-8 font-bold text-primary transition-transform duration-300 hover:-translate-y-1"
          >
            Become a partner
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
