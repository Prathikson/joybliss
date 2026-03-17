// ── Centralised SEO Configuration ──

export const siteConfig = {
  name: "Joy Bliss",
  tagline: "Tattoo Studio · Edmonton",
  description:
    "Custom tattoo artistry in Edmonton. Fine line, blackwork, geometric, realism — every piece designed and applied with precision. Book your consultation today.",
  url: "https://spectreink.ca",
  locale: "en_CA",
  type: "website" as const,

  keywords: [
    "tattoo studio Edmonton",
    "custom tattoo Edmonton",
    "Edmonton tattoo artist",
    "fine line tattoo Edmonton",
    "blackwork tattoo Edmonton",
    "geometric tattoo Edmonton",
    "realism tattoo Edmonton",
    "tattoo shop Edmonton Alberta",
    "best tattoo artist Edmonton",
    "Joy Bliss",
    "Joy Bliss tattoo Edmonton",
    "tattoo consultation Edmonton",
    "custom tattoo design Edmonton",
  ],

  studio: {
    address: "10120 104 Ave NW, Edmonton, AB T5J 0H8",
    phone: "+1 (780) 555-0190",
    email: "hello@spectreink.ca",
    hours: "Tue–Sat 11am–7pm",
    instagram: "https://instagram.com/spectreink",
    tiktok: "https://tiktok.com/@spectreink",
  },

  og: {
    image: "/og-image.jpg",
    imageAlt: "Joy Bliss Tattoo Studio — Custom Tattoo Art in Edmonton",
    twitterHandle: "@spectreink",
    twitterCard: "summary_large_image" as const,
  },

  schema: {
    type: "TattooParlor",
    priceRange: "$$–$$$",
  },

  // ── Per-page SEO ──
  pages: {
    home: {
      title: "Joy Bliss | Custom Tattoo Studio in Edmonton",
      description:
        "Edmonton's premier custom tattoo studio. Specialising in fine line, blackwork, geometric, and realism. Consultations available — book yours today.",
      keywords: [
        "tattoo studio Edmonton",
        "custom tattoo Edmonton",
        "Edmonton tattoo shop",
        "fine line tattoo Edmonton",
        "blackwork Edmonton",
        "Joy Bliss tattoo",
      ],
    },
    artist: {
      title: "Our Artist | Joy Bliss Edmonton Tattoo Studio",
      description:
        "Meet the artist behind Joy Bliss. Rooted in fine line and blackwork, every tattoo is a collaboration — from first sketch to final session in Edmonton, AB.",
      keywords: [
        "Edmonton tattoo artist",
        "tattoo artist Edmonton Alberta",
        "fine line tattoo artist Edmonton",
        "blackwork tattoo artist Edmonton",
        "custom tattoo artist Edmonton",
        "professional tattoo artist Edmonton",
        "tattoo artist portfolio Edmonton",
        "Joy Bliss artist",
      ],
      og: {
        image: "/og-artist.jpg",
        imageAlt: "Joy Bliss Tattoo Artist — Edmonton Alberta",
      },
    },
    services: {
      title: "Tattoo Services | Joy Bliss Edmonton",
      description:
        "From fine line portraits to bold blackwork and geometric pieces — explore the full range of custom tattoo services at Joy Bliss in Edmonton, Alberta.",
      keywords: [
        "tattoo services Edmonton",
        "fine line tattoo Edmonton",
        "blackwork tattoo Edmonton",
        "geometric tattoo Edmonton",
        "realism tattoo Edmonton",
        "portrait tattoo Edmonton",
        "custom tattoo design Edmonton",
        "tattoo pricing Edmonton",
        "tattoo consultation Edmonton",
        "Joy Bliss services",
      ],
      og: {
        image: "/og-services.jpg",
        imageAlt: "Tattoo Services at Joy Bliss Edmonton",
      },
    },
    gallery: {
      title: "Tattoo Gallery | Joy Bliss Edmonton",
      description:
        "Browse the Joy Bliss portfolio — fine line, blackwork, geometric, and realism tattoos. Every piece custom-designed for clients in Edmonton and beyond.",
      keywords: [
        "tattoo gallery Edmonton",
        "tattoo portfolio Edmonton",
        "fine line tattoo portfolio",
        "blackwork tattoo portfolio Edmonton",
        "best tattoo work Edmonton",
        "Edmonton tattoo examples",
        "custom tattoo gallery Alberta",
        "Joy Bliss gallery",
      ],
      og: {
        image: "/og-gallery.jpg",
        imageAlt: "Joy Bliss Tattoo Portfolio — Edmonton Alberta",
      },
    },
    contact: {
      title: "Book a Tattoo Consultation | Joy Bliss Edmonton",
      description:
        "Ready to start your tattoo? Book a consultation with Joy Bliss in Edmonton. Walk-ins welcome Tue–Sat. Reach out via email, phone, or Instagram.",
      keywords: [
        "book tattoo Edmonton",
        "tattoo consultation Edmonton",
        "tattoo appointment Edmonton",
        "Edmonton tattoo studio contact",
        "walk-in tattoo Edmonton",
        "Joy Bliss contact",
        "Joy Bliss booking",
        "tattoo booking Edmonton Alberta",
      ],
      og: {
        image: "/og-contact.jpg",
        imageAlt: "Book a Tattoo Consultation — Joy Bliss Edmonton",
      },
    },
  },
};

export type SiteConfig = typeof siteConfig;