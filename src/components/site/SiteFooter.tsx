import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { NAV_LINKS, SITE } from "@/content/site";

import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      <div className="container mx-auto grid gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-muted-foreground">{SITE.tagline}</p>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="font-semibold transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/partners" className="font-semibold transition-colors hover:text-primary">
                Become a partner
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Support</p>
          <ul className="space-y-3">
            <li>
              <a href={SITE.phoneHref} className="font-semibold transition-colors hover:text-primary">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="font-semibold transition-colors hover:text-primary">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold transition-colors hover:text-primary">
                WhatsApp <ArrowUpRight className="size-4" />
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-4">
            {SITE.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none px-5 text-wordmark text-outline text-[18vw] leading-none opacity-60 md:px-8">
        RepUpFit
      </div>

      <div className="container mx-auto flex flex-col justify-between gap-2 border-t border-border px-5 py-6 text-sm text-muted-foreground md:flex-row md:px-8">
        <p>© {new Date().getFullYear()} RepUpFit. All rights reserved.</p>
        <p>Sports nutrition, served smarter.</p>
      </div>
    </footer>
  );
}
