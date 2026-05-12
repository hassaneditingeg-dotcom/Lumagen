import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Section({
  className,
  spacing = "default",
  ...props
}: HTMLAttributes<HTMLElement> & {
  spacing?: "tight" | "default" | "loose";
}) {
  return (
    <section
      className={cn(
        "relative px-6",
        spacing === "tight" && "py-16 lg:py-20",
        spacing === "default" && "py-24 lg:py-32",
        spacing === "loose" && "py-32 lg:py-40",
        className,
      )}
      {...props}
    />
  );
}
