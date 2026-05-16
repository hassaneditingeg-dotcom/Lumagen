import { z } from "zod";

export const InquirySchema = z.object({
  name: z.string().trim().min(2, "Please share your name."),
  email: z.string().trim().email("Please share a working email."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  platform: z.enum([
    "amazon",
    "tiktok-shop",
    "shopify",
    "ebay",
    "etsy",
    "other",
  ]),
  service: z.enum([
    "listings",
    "a-plus",
    "storefronts",
    "lifestyle",
    "social",
    "packaging",
    "not-sure",
  ]),
  budget: z.enum(["under-1k", "1k-5k", "5k-15k", "15k-plus", "not-sure"]),
  message: z.string().trim().min(10, "Tell us a bit more about your products."),
});

export type InquiryInput = z.infer<typeof InquirySchema>;
