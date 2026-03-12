"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function ArticleLeadForm({ subject = "UHome: Заявка со статьи блога" }: { subject?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formId = siteConfig.formspree.contacts || siteConfig.formspree.cta;
  const formAction = formId ? `https://formspree.io/f/${formId}` : "#";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formId) {
      setSubmitted(true);
      return;
    }
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("_subject", subject);
    const response = await fetch(formAction, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    setIsSubmitting(false);
    if (response.ok) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm p-6 text-center">
        <p className="font-medium text-white">Заявка отправлена!</p>
        <p className="mt-1 text-sm text-white/80">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_subject" value={subject} />
      <input
        type="text"
        name="name"
        placeholder="Имя"
        required
        className="w-full min-h-[48px] rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 transition-colors focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Телефон"
        required
        className="w-full min-h-[48px] rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 transition-colors focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
      <textarea
        name="message"
        placeholder="Опишите задачу или задайте вопрос"
        rows={3}
        className="w-full min-h-[80px] rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 resize-none transition-colors focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-white py-3.5 font-medium text-primary shadow-lg transition-all hover:bg-white/95 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {isSubmitting ? "Отправка…" : "Отправить заявку"}
      </button>
    </form>
  );
}
