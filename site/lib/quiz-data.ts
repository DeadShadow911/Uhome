export const quizSteps = [
  {
    id: "object",
    question: "Что планируете?",
    options: [
      { value: "apartment", label: "Квартира" },
      { value: "house", label: "Частный дом" },
    ],
  },
  {
    id: "work_type",
    question: "Какой тип работ вам нужен?",
    options: [
      { value: "remont-kvartir", label: "Ремонт квартир" },
      { value: "remont-domov", label: "Ремонт домов" },
      { value: "chernovaya-otdelka", label: "Черновая отделка" },
      { value: "chistovaya-otdelka", label: "Чистовая отделка" },
      { value: "kapitalnyj-remont", label: "Капитальный ремонт" },
    ],
  },
  {
    id: "area",
    question: "Примерная площадь объекта?",
    options: [
      { value: "to-50", label: "До 50 м²" },
      { value: "50-100", label: "50–100 м²" },
      { value: "100-150", label: "100–150 м²" },
      { value: "150-plus", label: "150+ м²" },
    ],
  },
  {
    id: "timeline",
    question: "Когда планируете начать?",
    options: [
      { value: "urgent", label: "Срочно" },
      { value: "month", label: "В течение месяца" },
      { value: "planning", label: "Пока планирую" },
    ],
  },
  {
    id: "budget",
    question: "Ориентировочный бюджет (BYN)?",
    options: [
      { value: "to-5000", label: "До 5 000 BYN" },
      { value: "5000-15000", label: "5 000 – 15 000 BYN" },
      { value: "15000-plus", label: "15 000+ BYN" },
    ],
  },
];

export type QuizAnswers = Record<string, string>;
