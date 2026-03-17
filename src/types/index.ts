export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  label: string;
}

export interface WorkItem {
  id: string;
  num: string;
  title: string;
  description: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  bgDark: boolean;
}

export interface ProcessStep {
  id: string;
  label: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  stars: number;
}

export interface TrustedLogo {
  id: string;
  name: string;
}
