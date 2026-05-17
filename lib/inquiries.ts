"use server";

import { promises as fs } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { InquirySchema } from "./inquiry-schema";
import { getSupabaseServer, isSupabaseConfigured } from "./supabase/server";

export type InquiryResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * Persist a contact-form inquiry. Writes to Supabase when configured;
 * otherwise falls back to a local JSON log so the form is functional in
 * dev / pre-Supabase.
 */
export async function submitInquiry(formData: FormData): Promise<InquiryResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    platform: formData.get("platform"),
    service: formData.get("service"),
    budget: formData.get("budget"),
    message: formData.get("message"),
  };

  const parsed = InquirySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const inquiry = {
    ...parsed.data,
    created_at: new Date().toISOString(),
    source: "lumagen.ai/contact",
  };

  if (isSupabaseConfigured()) {
    const supabase = await getSupabaseServer();
    if (supabase) {
      const { error } = await supabase.from("inquiries").insert(inquiry);
      if (error) {
        console.error("[inquiry] supabase insert failed", error);
        return {
          ok: false,
          error: "Something went wrong on our side. Please email us at hello@lumagen.ai.",
        };
      }
      return { ok: true };
    }
  }

  // Fallback: append to /tmp/lumagen-inquiries.json so we don't lose
  // submissions during local dev before Supabase is wired.
  try {
    const path = join(tmpdir(), "lumagen-inquiries.json");
    let existing: unknown[] = [];
    try {
      const raw = await fs.readFile(path, "utf-8");
      existing = JSON.parse(raw);
    } catch {
      // file doesn't exist yet — that's fine
    }
    existing.push(inquiry);
    await fs.writeFile(path, JSON.stringify(existing, null, 2), "utf-8");
    console.log(`[inquiry] appended to ${path} (Supabase not configured)`);
  } catch (err) {
    console.error("[inquiry] local log failed", err);
  }

  return { ok: true };
}
