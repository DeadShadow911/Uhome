"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function ContactsForm() {
  const [submitted, setSubmitted] = useState(false);

  const formAction = siteConfig.formspree.contacts
    ? `https://formspree.io/f/${siteConfig.formspree.contacts}`
    : "#";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!siteConfig.formspree.contacts) {
      setSubmitted(true);
      return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);
    const response = await fetch(formAction, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    if (response.ok) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
        <p className="font-medium text-primary">Заявка отправлена!</p>
        <p className="mt-1 text-sm text-text-muted">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <input type="hidden" name="_subject" value="UHome: Заявка с страницы Контакты" />
      <input
        type="text"
        name="name"
        placeholder="Имя"
        required
        className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Телефон"
        required
        className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3"
      />
      <textarea
        name="message"
        placeholder="Сообщение"
        rows={4}
        className="w-full min-h-[120px] rounded-lg border border-primary/20 bg-background px-4 py-3"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-accent py-3 font-medium text-white hover:bg-accent/90"
      >
        Отправить
      </button>
    </form>
  );
}
