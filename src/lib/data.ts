import type {
  NavItem, Service, WorkItem, ShowcaseItem, ProcessStep, Testimonial, TrustedLogo
} from "@/types";

export const navItems: NavItem[] = [
  { label: "Portfolio", href: "#hero" },
  { label: "Services", href: "#what-we-do" },
  { label: "Gallery", href: "#showcase" },
  { label: "Our Process", href: "#process" },
];

export const services: Service[] = [
  { id: "fine-line", label: "Fine Line" },
  { id: "blackwork", label: "Blackwork" },
  { id: "geometric", label: "Geometric" },
  { id: "realism", label: "Realism" },
  { id: "neo-trad", label: "Neo-Trad" },
  { id: "watercolor", label: "Watercolor" },
  { id: "cover-up", label: "Cover-Up" },
  { id: "minimalist", label: "Minimalist" },
];

export const workItems: WorkItem[] = [
  {
    id: "01",
    num: "01",
    title: "Custom Tattoo Design",
    description:
      "Every piece begins with a conversation. We craft original artwork tailored to your vision, body placement, and skin tone — no flash sheets, no copies.",
  },
  {
    id: "02",
    num: "02",
    title: "Fine Line & Blackwork",
    description:
      "Precision single-needle fine line work and bold, timeless blackwork. Styles that age with grace and stay sharp for years.",
  },
  {
    id: "03",
    num: "03",
    title: "Cover-Up & Reworks",
    description:
      "Breathing new life into old ink. Whether it's a full cover-up or a refinement, we transform what was into what should be.",
  },
  {
    id: "04",
    num: "04",
    title: "Consultation & Aftercare",
    description:
      "Your journey extends beyond the chair. Thorough aftercare guidance and follow-up consultations ensure your piece heals beautifully.",
  },
];

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "fine-line",
    title: "Fine Line Mastery",
    subtitle: "Single needle precision work · 4 sessions",
    tag: "Fine Line",
    bgDark: true,
  },
  {
    id: "blackwork",
    title: "Blackwork Collection",
    subtitle: "Bold geometric & ornamental · Various sizes",
    tag: "Blackwork",
    bgDark: false,
  },
];

export const processSteps: ProcessStep[] = [
  { id: "1", label: "Consultation" },
  { id: "2", label: "Custom Design" },
  { id: "3", label: "Placement Review" },
  { id: "4", label: "Tattoo Session" },
  { id: "5", label: "Aftercare Guide" },
  { id: "6", label: "Healing Check" },
  { id: "7", label: "Touch-Up" },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "I've been to a dozen studios across Canada. Nothing compares to the attention to detail and artistry here. My sleeve is a conversation piece everywhere I go.",
    name: "Jordan M.",
    role: "Full Sleeve · Edmonton",
    initials: "JM",
    stars: 5,
  },
  {
    id: "2",
    quote:
      "The fine line work is extraordinary. Six months later and it still looks freshly done. The artist's precision is something else entirely — worth every penny.",
    name: "Sofia R.",
    role: "Fine Line · Calgary",
    initials: "SR",
    stars: 5,
  },
  {
    id: "3",
    quote:
      "Covered an old tattoo I'd been hiding for ten years. They turned it into something I'm genuinely proud of. The transformation was unbelievable.",
    name: "Tyler K.",
    role: "Cover-Up · Vancouver",
    initials: "TK",
    stars: 5,
  },
];

export const trustedLogos: TrustedLogo[] = [
  { id: "1", name: "Vogue Living" },
  { id: "2", name: "INK Magazine" },
  { id: "3", name: "Hypebeast" },
  { id: "4", name: "Complex CA" },
];
