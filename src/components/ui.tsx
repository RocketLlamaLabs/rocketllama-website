import type { ComponentProps, ReactNode } from "react";

// Small set of brand-styled primitives used across the admin area.

const buttonVariants = {
  primary: "bg-blue text-white hover:bg-action-hover",
  secondary: "border-[1.5px] border-navy text-navy hover:bg-mist",
  ghost: "text-navy hover:bg-mist",
  danger: "border-[1.5px] border-error text-error hover:bg-error/5",
} as const;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: keyof typeof buttonVariants }) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-60 ${buttonVariants[variant]} ${className}`}
      {...props}
    />
  );
}

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return (
    <input
      className={`min-h-11 w-full rounded-md border border-border bg-white px-3 text-base text-navy placeholder:text-muted/70 ${className}`}
      {...props}
    />
  );
}

export function Textarea({
  className = "",
  ...props
}: ComponentProps<"textarea">) {
  return (
    <textarea
      className={`w-full rounded-md border border-border bg-white px-3 py-2 text-base text-navy placeholder:text-muted/70 ${className}`}
      {...props}
    />
  );
}

export function Select({ className = "", ...props }: ComponentProps<"select">) {
  return (
    <select
      className={`min-h-11 w-full rounded-md border border-border bg-white px-3 text-base text-navy ${className}`}
      {...props}
    />
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-semibold">
        {label}
      </label>
      {children}
      {hint ? <p className="text-sm text-muted">{hint}</p> : null}
    </div>
  );
}

export function Card({
  className = "",
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={`rounded-lg border border-divider bg-white p-6 shadow-sm ${className}`}
      {...props}
    />
  );
}

export function Alert({
  tone,
  children,
}: {
  tone: "error" | "success";
  children: ReactNode;
}) {
  const styles =
    tone === "error"
      ? "border-error/40 bg-error/5 text-error"
      : "border-divider bg-mist text-navy";
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-md border px-3 py-2 text-sm ${styles}`}
    >
      {children}
    </p>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13px] font-bold tracking-[0.08em] text-blue uppercase font-display">
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  actions,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="mt-1 text-[32px] leading-10 font-bold">{title}</h1>
        {lead ? <p className="mt-2 max-w-[68ch] text-lg leading-7">{lead}</p> : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
