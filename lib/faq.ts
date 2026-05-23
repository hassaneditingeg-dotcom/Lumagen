/**
 * FAQ source-of-truth. Imported by both the FAQ client component
 * (for rendering) and the home page's JSON-LD FAQPage schema (server).
 * Lives in lib/ so it's not bound to either the client or server boundary.
 */
export const FAQ_DATA: { question: string; answer: string }[] = [
  {
    question: "How fast is the turnaround?",
    answer:
      "Qualified briefs usually receive a sample direction within 48 hours. Focused full sets (listing carousel, A+ Content, or social pack) commonly land in 5–9 working days after direction approval, including two revision rounds.",
  },
  {
    question: "Which platforms do you support?",
    answer:
      "Amazon (US and global), TikTok Shop, Shopify, eBay, Etsy, and Walmart Marketplace. We export every deliverable at each platform's required dimensions out of the box.",
  },
  {
    question: "How does the AI imagery actually work?",
    answer:
      "We pair trained creative direction with the latest generation models. You bring product references and brand assets — we shape the prompts, composite, retouch, and deliver finished imagery. The output looks like a high-end shoot, not a first-draft AI render.",
  },
  {
    question: "What if I need revisions?",
    answer:
      "Every package includes two revision rounds. Additional rounds are billed at $80 each. We track revision feedback in a shared brief so nothing gets lost.",
  },
  {
    question: "Do you handle Amazon A+ Content?",
    answer:
      "Yes — Premium and standard A+ module sets, all mobile-optimized, exported at Amazon's required dimensions (970×600, 1464×600, etc.). See the A+ Content service for module options.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Project-based, not subscription-based. Every brief gets a tailored quote path after fit review, scoped to your SKU mix and platforms. Each core package includes two revision rounds, source files, and platform-specific exports. Volume discounts start at 10+ SKU lines.",
  },
  {
    question: "Can you match my existing brand guidelines?",
    answer:
      "Yes — that's the default workflow. Send your brand guide, palette, type system, and any existing photography. We design the new imagery as a coherent extension of what you already have, not a parallel aesthetic.",
  },
  {
    question: "Do you work internationally?",
    answer:
      "Yes. We work with brands worldwide, with the bulk of clients selling on Amazon US, TikTok Shop US, and Shopify. All communication is in English and timezone-flexible.",
  },
];
