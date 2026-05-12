"use client";

import { useState, useTransition } from "react";
import { submitInquiry, type InquiryResult } from "@/lib/inquiries";

type FieldErrors = Record<string, string[] | undefined>;

const PLATFORMS = [
  { value: "amazon", label: "Amazon" },
  { value: "tiktok-shop", label: "TikTok Shop" },
  { value: "shopify", label: "Shopify" },
  { value: "ebay", label: "eBay" },
  { value: "etsy", label: "Etsy" },
  { value: "other", label: "Other / Multiple" },
];

const SERVICES = [
  { value: "listings", label: "Listing images" },
  { value: "a-plus", label: "Amazon A+ Content" },
  { value: "storefronts", label: "Storefront design" },
  { value: "lifestyle", label: "Lifestyle photography" },
  { value: "social", label: "Social media creatives" },
  { value: "packaging", label: "Packaging & labels" },
  { value: "not-sure", label: "Not sure yet" },
];

const BUDGETS = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000 – $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-plus", label: "$15,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<InquiryResult | null>(null);
  const fieldErrors: FieldErrors =
    result && !result.ok ? result.fieldErrors ?? {} : {};

  if (result?.ok) {
    return (
      <div className="surface-card p-10 text-center">
        <span className="eyebrow">Thank you</span>
        <h2 className="mt-3 text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
          We&rsquo;ve got it.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[color:var(--color-text-mid)]">
          A short reply with a sample direction lands in your inbox inside 24
          hours. If it&rsquo;s urgent, just reply to that email with the word
          &ldquo;urgent&rdquo;.
        </p>
        <button
          type="button"
          className="btn-secondary mt-8"
          onClick={() => setResult(null)}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      action={(formData) =>
        startTransition(async () => setResult(await submitInquiry(formData)))
      }
      className="surface-card p-8 lg:p-10"
      noValidate
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Your name" name="name" error={fieldErrors.name}>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="form-input"
            placeholder="Hassan"
          />
        </Field>
        <Field label="Email" name="email" error={fieldErrors.email}>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="form-input"
            placeholder="you@brand.com"
          />
        </Field>
        <Field
          label="Brand / company"
          name="company"
          optional
          error={fieldErrors.company}
        >
          <input
            type="text"
            name="company"
            autoComplete="organization"
            className="form-input"
            placeholder="Terra Lotus"
          />
        </Field>
        <Field
          label="Primary platform"
          name="platform"
          error={fieldErrors.platform}
        >
          <Select name="platform" options={PLATFORMS} placeholder="Select platform" />
        </Field>
        <Field
          label="What you're looking for"
          name="service"
          error={fieldErrors.service}
        >
          <Select name="service" options={SERVICES} placeholder="Select service" />
        </Field>
        <Field
          label="Project budget"
          name="budget"
          error={fieldErrors.budget}
        >
          <Select name="budget" options={BUDGETS} placeholder="Select range" />
        </Field>
        <Field
          label="Tell us about your products"
          name="message"
          error={fieldErrors.message}
          className="md:col-span-2"
        >
          <textarea
            name="message"
            required
            rows={5}
            className="form-input resize-y"
            placeholder="What you sell, where, who buys it, and what you've struggled with so far."
          />
        </Field>
      </div>

      {result && !result.ok && (
        <p
          className="mt-6 rounded-[var(--radius-sm)] px-4 py-3 text-sm"
          style={{
            background: "rgba(239, 68, 68, 0.08)",
            color: "var(--color-error)",
            border: "1px solid rgba(239, 68, 68, 0.25)",
          }}
        >
          {result.error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={pending}>
          {pending ? "Sending…" : "Send brief"}
        </button>
        <span className="text-xs text-[color:var(--color-text-lo)]">
          We reply within 24 hours, Cairo time.
        </span>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  error,
  optional,
  className,
}: {
  label: string;
  name: string; // accepted for caller clarity; the underlying input owns the actual name attribute
  children: React.ReactNode;
  error?: string[];
  optional?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="flex items-baseline justify-between">
        <span className="text-xs font-[600] uppercase tracking-[0.18em] text-[color:var(--color-text-mid)]">
          {label}
        </span>
        {optional && (
          <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-text-lo)]">
            Optional
          </span>
        )}
      </span>
      <div className="mt-2">{children}</div>
      {error?.[0] && (
        <p className="mt-2 text-xs" style={{ color: "var(--color-error)" }}>
          {error[0]}
        </p>
      )}
    </label>
  );
}

function Select({
  name,
  options,
  placeholder,
}: {
  name: string;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <select name={name} required defaultValue="" className="form-input">
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
