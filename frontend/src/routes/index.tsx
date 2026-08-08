import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "./__root";
import { ArrowRight, Zap, Shield, Layers, Sparkles, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Reveal } from "../components/reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Modern App — Refined Design System" },
      { name: "description", content: "A modern full-stack app showcasing a cohesive theme, spacing, typography, and dark mode." },
      { property: "og:title", content: "Modern App — Refined Design System" },
      { property: "og:description", content: "A modern full-stack app showcasing a cohesive theme, spacing, typography, and dark mode." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Modern App</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground sm:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#design" className="transition-colors hover:text-foreground">Design</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal delay={0}>
              <Badge variant="accent" className="mb-8">
                <span className="mr-2 inline-flex h-1.5 w-1.5 rounded-full bg-accent-foreground" />
                New design system ready
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
                A frontend that feels{" "}
                <span className="gradient-text">cohesive and premium.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance">
                Consistent spacing, refined typography, and a dark mode that actually works. Built
                with semantic tokens so every component stays in harmony.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button variant="premium" size="lg">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">View the system</Button>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mx-auto mt-12 flex max-w-md items-center gap-2 rounded-2xl border border-border bg-surface p-2 shadow-sm">
                <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button className="shrink-0">Subscribe</Button>
              </div>
            </Reveal>
          </div>

          {/* Decorative gradient orbs */}
          <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        </section>

        {/* Features */}
        <section id="features" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-16 text-center">
              <Badge variant="outline" className="mb-4">Features</Badge>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Designed for consistency
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Every surface, color, and spacing value is defined as a token and shared across the app.
              </p>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Zap, title: "Semantic tokens", description: "Backgrounds, foregrounds, borders, and accents all resolve from a single source of truth." },
                { icon: Layers, title: "Consistent spacing", description: "A compact 4-based scale keeps every layout rhythm predictable and balanced." },
                { icon: Shield, title: "Dark mode ready", description: "Light and dark palettes are paired for contrast and accessibility out of the box." },
                { icon: Sparkles, title: "Typography pair", description: "Inter for body text and Space Grotesk for display type create a clean hierarchy." },
                { icon: Zap, title: "Smooth transitions", description: "Color, shadow, and transform transitions are built into interactive surfaces." },
                { icon: Layers, title: "Elevation system", description: "Shadows and surface layers communicate depth without relying on harsh borders." },
              ].map((feature, index) => (
                <Reveal key={feature.title} delay={0.05 * index}>
                  <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Design tokens showcase */}
        <section id="design" className="border-y border-border bg-surface px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-12">
              <Badge variant="outline" className="mb-4">Tokens</Badge>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Token palette preview</h2>
              <p className="mt-2 text-muted-foreground">A quick reference of the semantic colors and surface states in use.</p>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Background", className: "bg-background text-foreground" },
                { label: "Surface", className: "bg-surface text-surface-foreground" },
                { label: "Primary", className: "bg-primary text-primary-foreground" },
                { label: "Accent", className: "bg-accent text-accent-foreground" },
                { label: "Secondary", className: "bg-secondary text-secondary-foreground" },
                { label: "Muted", className: "bg-muted text-muted-foreground" },
                { label: "Destructive", className: "bg-destructive text-destructive-foreground" },
                { label: "Border", className: "border-2 border-border bg-background text-foreground" },
              ].map((token, index) => (
                <Reveal key={token.label} delay={0.05 * index}>
                  <TokenCard label={token.label} className={token.className} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-primary to-accent p-px">
            <div className="rounded-3xl bg-card p-10 text-center sm:p-16">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Ready to build?</h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Start adding components that use these tokens. The theme will keep them consistent automatically.
              </p>
              <Button variant="premium" size="lg" className="mt-8">
                Start building
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display font-semibold text-foreground">Modern App</span>
          </div>
          <p className="text-sm text-muted-foreground">Built with a modern design system and dark mode.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function TokenCard({ label, className }: { label: string; className: string }) {
  return (
    <div className={`flex h-28 items-end rounded-2xl border border-border p-4 shadow-sm transition-transform duration-300 hover:scale-[1.02] ${className}`}>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
