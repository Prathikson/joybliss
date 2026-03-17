import { PageShell } from "@/components/layout/PageShell";

export const metadata = { title: "Terms of Service" };

const sections = [
  { title: "Acceptance of Terms", body: "By booking an appointment or using our website, you agree to these Terms of Service. If you do not agree, please do not use our services." },
  { title: "Booking & Deposits", body: "All appointments require a non-refundable deposit of $100–$200 depending on the session length. The deposit is applied toward your final session cost. Deposits are forfeited if you cancel within 48 hours of your appointment or fail to attend." },
  { title: "Age Requirements", body: "You must be 18 years or older to receive a tattoo at Spectre Ink. Valid government-issued photo ID is required at every appointment. We will not tattoo minors under any circumstances." },
  { title: "Health & Safety", body: "You are responsible for disclosing any medical conditions, allergies, or medications that may affect tattooing. We reserve the right to refuse service if we believe tattooing poses a health risk." },
  { title: "Artwork Ownership", body: "Custom designs created by Spectre Ink remain the intellectual property of the studio. You are granted a personal, non-commercial licence to wear and photograph the work. Reproduction or resale of designs is not permitted without written consent." },
  { title: "Rescheduling", body: "We require at least 72 hours notice to reschedule an appointment without forfeiting your deposit. Rescheduling is available once per booking at no charge; subsequent changes incur a $50 rescheduling fee." },
  { title: "Satisfaction & Touch-Ups", body: "One complimentary touch-up session is included within 6 weeks of your appointment. Touch-ups requested after this period are chargeable at our standard rates." },
  { title: "Limitation of Liability", body: "To the fullest extent permitted by law, Spectre Ink is not liable for any indirect, incidental, or consequential damages arising from our services. Our total liability shall not exceed the amount paid for the specific service." },
  { title: "Governing Law", body: "These terms are governed by the laws of Alberta, Canada. Any disputes shall be resolved in the courts of Alberta." },
  { title: "Cookie Policy", body: "We use only essential cookies for site functionality (theme preference, session state). We do not use advertising or tracking cookies. See our Privacy Policy for full details.", id: "cookies" },
];

export default function TermsPage() {
  return (
    <PageShell>
      <div className="px-6 md:px-8 py-16 max-w-3xl">
        <span className="section-label">Legal</span>
        <h1 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.04, color: "var(--ink-fg)", marginTop: "16px", marginBottom: "12px" }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: "12px", fontWeight: 300, color: "var(--ink-fg3)", marginBottom: "48px" }}>Last updated: January 2026</p>
        <div style={{ borderTop: "1px solid var(--ink-border)" }}>
          {sections.map((s, i) => (
            <div key={i} id={s.id} className="pt-10 pb-10" style={{ borderBottom: "1px solid var(--ink-border)" }}>
              <h2 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "17px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--ink-fg)", marginBottom: "12px" }}>{s.title}</h2>
              <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--ink-fg2)", lineHeight: 1.8 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
