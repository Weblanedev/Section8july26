import type { ReactNode } from "react";

interface PolicyLayoutProps {
  title: string;
  children: ReactNode;
}

export default function PolicyLayout({ title, children }: PolicyLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">{title}</h1>
      <div className="card p-8 md:p-10 space-y-8 text-muted leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function PolicySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-primary mb-4">{title}</h2>
      {children}
    </section>
  );
}

export function PolicySubheading({ children }: { children: ReactNode }) {
  return <h3 className="text-xl font-semibold text-primary mb-3">{children}</h3>;
}

export function PolicyList({
  ordered,
  children,
}: {
  ordered?: boolean;
  children: ReactNode;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={`${ordered ? "list-decimal" : "list-disc"} pl-6 space-y-2 mb-4`}
    >
      {children}
    </Tag>
  );
}

export function PolicyLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className="text-accent hover:underline">
      {children}
    </a>
  );
}
