import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Coins, Truck, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import kioskImg from "@/assets/gym-kiosk.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { SITE } from "@/content/site";
import {
  partnerMailto,
  partnerSchema,
  VENUE_TYPES,
  type PartnerInput,
  type PartnerValues,
} from "@/lib/partner-schema";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Become a partner — Put a RepUpFit kiosk in your gym or venue" },
      {
        name: "description",
        content:
          "RepUpFit installs, stocks and maintains a smart protein shake kiosk in your gym, studio or mall — and you earn a share of every drink.",
      },
      { property: "og:title", content: "Partner with RepUpFit — zero-hassle shake kiosks" },
      {
        property: "og:description",
        content: "We install, stock and maintain the machine. You earn from every drink sold.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PartnersPage,
});

const BENEFITS = [
  {
    icon: Truck,
    title: "Free installation",
    text: "We deliver, set up and connect the kiosk — you just need a power socket and a little floor space.",
  },
  {
    icon: Wrench,
    title: "We run it",
    text: "Restocking, cleaning, servicing and remote monitoring are all on us.",
  },
  {
    icon: Coins,
    title: "You earn",
    text: "A share of every drink sold, paid monthly, with zero upfront cost.",
  },
];

const STEPS = [
  { title: "Tell us about your venue", text: "Fill in the form — it takes two minutes." },
  { title: "Site check", text: "We visit, pick the best spot and recommend a model." },
  { title: "Installation", text: "Your kiosk is delivered, connected and stocked." },
  { title: "Members refuel", text: "Shakes start selling and you start earning." },
];

function PartnersPage() {
  return (
    <>
      <PageHero eyebrow="For gyms & venues" title="Put a RepUpFit in your club">
        Give members a fresh shake the second they finish training. We handle everything — you earn
        a share of every drink.
      </PageHero>

      <section className="container mx-auto px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-4 md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 0.07}
              className="rounded-3xl border border-border bg-card p-8"
            >
              <b.icon className="size-9 text-primary" strokeWidth={1.6} />
              <h2 className="mt-6 text-xl font-bold uppercase">{b.title}</h2>
              <p className="mt-3 text-muted-foreground">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container mx-auto grid gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2">
          <div>
            <SectionHeading index="01" label="How it works" title="Live in four steps" />
            <ol className="mt-10 space-y-4">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <li className="flex gap-5 rounded-2xl border border-border bg-background p-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold uppercase">{s.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-10 overflow-hidden rounded-3xl border border-border">
              <img
                src={kioskImg}
                alt="RepUpFit kiosk installed beside a gym floor"
                width={1600}
                height={1008}
                loading="lazy"
                className="h-64 w-full object-cover md:h-80"
              />
            </Reveal>
          </div>
          <div id="enquiry">
            <SectionHeading index="02" label="Get in touch" title="Request a kiosk" />
            <Reveal delay={0.1}>
              <PartnerForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-5 py-20 md:px-8 md:py-28">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="text-2xl font-bold uppercase">Not sure which machine fits?</h2>
            <p className="mt-2 text-muted-foreground">
              Compare our three kiosk models and their specs.
            </p>
          </div>
          <Button asChild variant="outline-light" size="xl">
            <Link to="/machines">
              Compare machines <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}

function PartnerForm() {
  const [sent, setSent] = useState<PartnerValues | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartnerInput, unknown, PartnerValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: { name: "", email: "", phone: "", venue: "", message: "" },
  });

  const onSubmit = (values: PartnerValues) => {
    window.location.href = partnerMailto(SITE.email, values);
    setSent(values);
    toast.success("Your email app is opening with your enquiry ready to send.");
    reset();
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-10 rounded-3xl border border-primary/50 bg-background p-8"
        role="status"
      >
        <CheckCircle2 className="size-10 text-primary" />
        <h3 className="mt-5 text-2xl font-bold uppercase">
          Almost there, {sent.name.split(" ")[0]}
        </h3>
        <p className="mt-3 text-muted-foreground">
          Your email app should have opened with your enquiry for {sent.venue}. Hit send and we'll
          reply within two working days. If nothing opened, email us at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            {SITE.email}
          </a>
          .
        </p>
        <Button
          type="button"
          variant="outline-light"
          size="lg"
          className="mt-6"
          onClick={() => setSent(null)}
        >
          Send another enquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 grid gap-5 sm:grid-cols-2"
      aria-label="Partner enquiry"
    >
      <Field label="Your name" htmlFor="name" error={errors.name?.message}>
        <input
          id="name"
          autoComplete="name"
          className={inputCls(!!errors.name)}
          {...register("name")}
        />
      </Field>
      <Field label="Email" htmlFor="email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={inputCls(!!errors.email)}
          {...register("email")}
        />
      </Field>
      <Field label="Phone (optional)" htmlFor="phone" error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          className={inputCls(!!errors.phone)}
          {...register("phone")}
        />
      </Field>
      <Field label="Venue name" htmlFor="venue" error={errors.venue?.message}>
        <input
          id="venue"
          autoComplete="organization"
          className={inputCls(!!errors.venue)}
          {...register("venue")}
        />
      </Field>
      <Field label="Venue type" htmlFor="venueType" error={errors.venueType?.message}>
        <select
          id="venueType"
          defaultValue=""
          className={inputCls(!!errors.venueType)}
          {...register("venueType")}
        >
          <option value="" disabled>
            Choose one
          </option>
          {VENUE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Daily visitors" htmlFor="visitors" error={errors.visitors?.message}>
        <input
          id="visitors"
          type="number"
          inputMode="numeric"
          min={0}
          className={inputCls(!!errors.visitors)}
          {...register("visitors")}
        />
      </Field>
      <Field
        label="Anything else? (optional)"
        htmlFor="message"
        error={errors.message?.message}
        className="sm:col-span-2"
      >
        <textarea
          id="message"
          rows={4}
          className={cn(inputCls(!!errors.message), "h-auto py-3")}
          {...register("message")}
        />
      </Field>
      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="volt"
          size="xl"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          Send enquiry <ArrowRight />
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Sending opens your email app with your details filled in.
        </p>
      </div>
    </form>
  );
}

function inputCls(invalid: boolean) {
  return cn(
    "h-12 w-full rounded-xl border bg-background px-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40",
    invalid ? "border-destructive" : "border-input",
  );
}

function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
