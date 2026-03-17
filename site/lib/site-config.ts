export const siteConfig = {
  siteUrl: "https://uhome.by",
  phone: "+375 44 761 3442",
  email: "uhomegrodno@gmail.com",
  address: "г. Гродно, ул. Примерная, 1",
  schedule: "Пн–Пт: 9:00–18:00, Сб: 10:00–15:00",
  socials: {
    telegram: "https://t.me/uhomegrodno",
    whatsapp: "https://wa.me/375447613442",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },
  formspree: {
    contacts: process.env.NEXT_PUBLIC_FORMSPREE_CONTACTS || "",
    cta: process.env.NEXT_PUBLIC_FORMSPREE_CTA || "",
    quiz: process.env.NEXT_PUBLIC_FORMSPREE_QUIZ || "",
    calculator: process.env.NEXT_PUBLIC_FORMSPREE_CALCULATOR || process.env.NEXT_PUBLIC_FORMSPREE_CTA || "",
  },
  stats: {
    yearsExperience: 12,
    projectsCount: 70,
    warrantyYears: 2,
    warrantyLabel: "2 года",
  },
} as const;
