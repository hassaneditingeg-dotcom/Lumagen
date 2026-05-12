import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  // Until Phase 4 wires Supabase auth, redirect signed-out visitors to /login.
  redirect("/login");
}
