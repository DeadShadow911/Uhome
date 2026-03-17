"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { usePhoneValidation } from "@/components/forms/PhoneInput";
import { trackGAEvent, trackYMGoal, trackFBEvent } from "@/components/analytics/Analytics";

export function ArticleLeadForm({ subject = "UHome: Заявка со статьи блога" }: { subject?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { phoneError, setPhoneError, validatePhone } = usePhoneValidation();

  const formId = siteConfig.formspree.contacts || siteConfig.formspree.cta;
  const formAction = formId ? `https://formspree.io/f/${formId}` : "#";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value ?? "";
    if (!validatePhone(phone)) return;
    if (!formId) {
      setSubmitted(true);
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData(form);
    formData.set("_subject", subject);
    const response = await fetch(formAction, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    setIsSubmitting(false);
    if (response.ok) {
      trackGAEvent("generate_lead", { method: "blog" });
      trackYMGoal("blog_lead");
      trackFBEvent("Lead", { content_name: "blog" });
      setSubmitted(true);
    }
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
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="+375 (33) 123 45 67"
          required
          className={`w-full min-h-[48px] rounded-xl border px-4 py-3 text-white placeholder:text-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 ${
            phoneError ? "border-red-400 bg-red-900/20 focus:border-red-400" : "border-white/25 bg-white/10 focus:border-white/40 focus:bg-white/15"
          }`}
          onFocus={() => setPhoneError(null)}
        />
        {phoneError && <p className="mt-1.5 text-sm text-red-300">{phoneError}</p>}
      </div>
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
