/* =====================================================================
   VERANO — all editable content lives in this file.
   Edit it right on GitHub (pencil icon) and the site updates in ~1 minute.
   ===================================================================== */

window.SITE = {
  email: "hello@verano.agency",        // <- change to your real email
  instagram: "",                        // e.g. "https://instagram.com/yourhandle" (leave "" to hide)
  tiktok: "",                           // e.g. "https://tiktok.com/@yourhandle"
  whatsapp: ""                          // e.g. "https://wa.me/233201234567"
};

/* Add a project by copying one block below. Rules:
   - "slug" must be unique, lowercase, no spaces (use dashes).
   - Images: upload to the /assets folder, then use "assets/your-image.jpg".
   - videoUrl: paste a YouTube (unlisted is fine) or Vimeo link. Leave "" for none.
   - Put the project you want shown biggest FIRST. */

window.PROJECTS = [
  {
    slug: "sample-brand-launch",
    title: "Sample Brand Launch",
    subtitle: "Launch content system",
    category: "Social Media Management",
    client: "Sample Client",
    year: "2026",
    services: ["Social Media Management", "Ad Creation"],
    heroImage: "",                      // e.g. "assets/launch-hero.jpg"
    videoUrl: "",                       // e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX"
    gallery: [],                        // e.g. ["assets/launch-1.jpg", "assets/launch-2.jpg"]
    excerpt: "Replace this with one sentence on what you did for the client.",
    challenge: "What problem did the brand have? Example: great product, but nobody was seeing it online.",
    solution: "What did VERANO do? Example: a shoot, a content system, and a posting and ad plan.",
    results: "What changed? Only add numbers you can prove (reach, sales, followers).",
    content: "## The story\n\nWrite the full case study here. Use blank lines between paragraphs.\n\n### What we delivered\n\n- Shoot and edit\n- Content calendar\n- Ad positioning\n",
    ctaLabel: "Start a project",
    ctaUrl: "",                         // "" = uses your email from SITE above
    seoDescription: "Sample case study by VERANO."
  },
  {
    slug: "sample-event-coverage",
    title: "Sample Event Coverage",
    subtitle: "Photo and video",
    category: "Event Coverage",
    client: "Sample Client",
    year: "2026",
    services: ["Event Coverage"],
    heroImage: "", videoUrl: "", gallery: [],
    excerpt: "Replace this with your event story.",
    challenge: "", solution: "", results: "",
    content: "Write about the event here.",
    ctaLabel: "", ctaUrl: "", seoDescription: ""
  },
  {
    slug: "sample-clipping",
    title: "Sample Clipping Project",
    subtitle: "Raw footage into content that sells",
    category: "Clipping",
    client: "Sample Client",
    year: "2026",
    services: ["Clipping"],
    heroImage: "", videoUrl: "", gallery: [],
    excerpt: "Replace this with what you edited and why it worked.",
    challenge: "", solution: "", results: "",
    content: "Write about the project here.",
    ctaLabel: "", ctaUrl: "", seoDescription: ""
  }
];
