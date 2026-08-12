"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const links = [
  { label: "Platform", href: "#technology" },
  { label: "Research", href: "#technology" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Company", href: "#about" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-panel-border/60 bg-deep-ink/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <a href="#" className="font-display text-lg font-semibold tracking-tight text-foreground">
          Veyra<span className="text-bio">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>

        <Button href="#cta" variant="secondary" className="!px-5 !py-2.5">
          Talk to us
        </Button>
      </div>
    </motion.header>
  );
}