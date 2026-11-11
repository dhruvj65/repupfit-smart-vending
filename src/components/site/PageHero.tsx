import { motion } from "motion/react";
import type { ReactNode } from "react";

import { RevealWords } from "./Reveal";

/** Header block for inner pages: giant title over a grid backdrop. */
export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-spotlight" />
      <div className="container relative mx-auto px-5 md:px-8">
        <motion.p
          className="eyebrow mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="h-px w-8 bg-primary" />
          {eyebrow}
        </motion.p>
        <h1 className="text-wordmark max-w-5xl text-5xl md:text-8xl">
          <RevealWords text={title} />
        </h1>
        {children && (
          <motion.div
            className="mt-8 max-w-2xl text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
