import { PageShell } from "@/components/layout/PageShell";
import { siteConfig } from "@/lib/seo";

export const metadata = { title: "Privacy Policy" };

const sections = [
  { title: "Information We Collect", body: "We collect information you provide directly — name, email, phone number, and tattoo details when booking a consultation or submitting a contact form. We also collect basic analytics data (page views, session duration) through anonymised tools that do not track individual users." },
  { title: "How We Use Your Information", body: "Your information is used solely to respond to your enquiries, schedule appointments, and send you relevant booking confirmations. We do not sell, rent, or share your personal data with third parties for marketing purposes." },
  { title: "Cookies", body: "Our website uses essential cookies to maintain session state and remember your theme preference (light/dark mode). We do not use tracking or advertising cookies. You may disable cookies in your browser settings without affecting core site functionality." },
  { title: "Data Retention", body: "We retain your information for as long as necessary to provide our services. Enquiry data is kept for 24 months. You may request deletion of your data at any time by emailing us." },
  { title: "Your Rights", body: "Under PIPEDA (Canada) and applicable provincial privacy law, you have the right to access, correct, or delete your personal information. To exercise these rights, contact us at the email below. We will respond within 30 days." },
  { title: "Security", body: "We use industry-standard security measures including HTTPS encryption and secure form handling. No method of transmission over the internet is 100% secure; however, we strive to protect your data using commercially reasonable means." },
  { title: "Third-Party Services", body: "Our website may link to third-party platforms (Instagram, Google Maps, Apple Maps). These services have their own privacy policies, which we encourage you to review. We are not responsible for the privacy practices of external sites." },
  { title: "Contact", body: `For privacy-related enquiries, contact us at ${siteConfig.studio.email} or ${siteConfig.studio.phone}.` },
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="px-6 md:px-8 py-16 max-w-3xl">
        <span className="section-label">Legal</span>
        <h1 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.04, color: "var(--ink-fg)", marginTop: "16px", marginBottom: "12px" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "12px", fontWeight: 300, color: "var(--ink-fg3)", marginBottom: "48px" }}>Last updated: January 2026</p>
        <div className="space-y-10" style={{ borderTop: "1px solid var(--ink-border)" }}>
          {sections.map((s, i) => (
            <div key={i} className="pt-10" style={{ borderTop: i > 0 ? "1px solid var(--ink-border)" : "none" }}>
              <h2 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "17px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--ink-fg)", marginBottom: "12px" }}>{s.title}</h2>
              <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--ink-fg2)", lineHeight: 1.8 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
