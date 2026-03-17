"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trackGAEvent, trackYMGoal, trackFBEvent } from "@/components/analytics/Analytics";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuizStep } from "./QuizStep";
import { quizSteps, type QuizAnswers } from "@/lib/quiz-data";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { usePhoneValidation } from "@/components/forms/PhoneInput";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TOTAL_STEPS = 6;
const QUIZ_STEPS_COUNT = 5;

export function QuizDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { phoneError, setPhoneError, validatePhone } = usePhoneValidation();

  const formId = siteConfig.formspree.quiz || siteConfig.formspree.cta;
  const formAction = formId ? `https://formspree.io/f/${formId}` : "#";

  const currentStepData = quizSteps[step - 1];
  const currentAnswer = currentStepData ? answers[currentStepData.id] : undefined;
  const canProceed = step <= QUIZ_STEPS_COUNT ? !!currentAnswer : false;

  const handleSelect = (value: string) => {
    if (currentStepData) {
      setAnswers((prev) => ({ ...prev, [currentStepData.id]: value }));
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value ?? "";
    if (!validatePhone(phone)) return;
    if (!formId) {
      setSubmitted(true);
      setOpen(false);
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData(form);

    formData.set("_subject", "UHome: Заявка из квиза");
    Object.entries(answers).forEach(([key, value]) => {
      formData.set(key, value);
    });

    const response = await fetch(formAction, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    setIsSubmitting(false);
    if (response.ok) {
      setSubmitted(true);
      trackGAEvent("generate_lead", { method: "quiz" });
      trackYMGoal("quiz_submit");
      trackFBEvent("Lead", { content_name: "quiz" });
      setTimeout(() => {
        setOpen(false);
        setStep(1);
        setAnswers({});
        setSubmitted(false);
      }, 2000);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      trackGAEvent("quiz_start", { method: "hero" });
    }
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setAnswers({});
        setSubmitted(false);
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg" showClose={!submitted}>
        <DialogHeader className="pr-8">
          <DialogTitle className="font-heading text-xl sm:text-2xl">
            Подберём решение за минуту
          </DialogTitle>
        </DialogHeader>

        {/* Progress */}
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i + 1 <= step ? "bg-primary" : "bg-primary/20"
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center"
            >
              <p className="font-medium text-primary">Спасибо!</p>
              <p className="mt-1 text-sm text-text-muted">
                Мы свяжемся с вами в течение 15 минут для предварительного разговора.
              </p>
            </motion.div>
          ) : step <= QUIZ_STEPS_COUNT && currentStepData ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <QuizStep
                question={currentStepData.question}
                options={currentStepData.options}
                selected={currentAnswer}
                onSelect={handleSelect}
              />
            </motion.div>
          ) : (
            <motion.form
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <h3 className="font-heading text-lg font-semibold text-primary sm:text-xl">
                Оставьте контакт для звонка
              </h3>
              <input
                type="text"
                name="name"
                placeholder="Имя"
                required
                className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
              />
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+375 (33) 123 45 67"
                  required
                  className={cn(
                    "w-full min-h-[48px] rounded-lg border px-4 py-3 text-primary",
                    phoneError ? "border-red-500 bg-red-50" : "border-primary/20 bg-background"
                  )}
                  onFocus={() => setPhoneError(null)}
                />
                {phoneError && <p className="mt-1.5 text-sm text-red-600">{phoneError}</p>}
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Получить расчёт"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        {!submitted && (
          <div className="flex justify-between gap-4 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleBack}
              disabled={step <= 1}
              className="gap-1"
            >
              <ChevronLeft className="size-4" />
              Назад
            </Button>
            {step <= QUIZ_STEPS_COUNT ? (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
                disabled={!canProceed}
                className="gap-1"
              >
                Далее
                <ChevronRight className="size-4" />
              </Button>
            ) : null}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
