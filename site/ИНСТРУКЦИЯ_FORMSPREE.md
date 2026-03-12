# Настройка отправки форм на uhomegrodno@gmail.com

Все заявки с сайта (Контакты, «Заказать звонок», Квиз, калькулятор) будут приходить на **uhomegrodno@gmail.com** через Formspree.

---

## Шаг 1: Регистрация на Formspree

1. Откройте [formspree.io](https://formspree.io)
2. Нажмите **Get Started** или **Sign Up**
3. Войдите через Google или зарегистрируйтесь по email

---

## Шаг 2: Создание формы

1. В личном кабинете нажмите **+ New Form**
2. Заполните:
   - **Form name:** UHome — заявки с сайта
   - **Email:** `uhomegrodno@gmail.com` ← сюда будут приходить все заявки
3. Нажмите **Create Form**

---

## Шаг 3: Копирование ID формы

После создания откроется страница формы. В адресной строке будет URL вида:

```
https://formspree.io/f/xyzabcde
```

Скопируйте часть **после** `/f/` — например, `xyzabcde`. Это ID формы.

---

## Шаг 4: Локальная настройка (для разработки)

1. В папке `site` создайте файл `.env.local` (если его ещё нет)
2. Добавьте (подставьте свой ID вместо `ВАШ_ID_ФОРМЫ`):

```
NEXT_PUBLIC_FORMSPREE_CONTACTS=ВАШ_ID_ФОРМЫ
NEXT_PUBLIC_FORMSPREE_CTA=ВАШ_ID_ФОРМЫ
NEXT_PUBLIC_FORMSPREE_QUIZ=ВАШ_ID_ФОРМЫ
NEXT_PUBLIC_FORMSPREE_CALCULATOR=ВАШ_ID_ФОРМЫ
```

**Можно использовать один и тот же ID** для всех трёх переменных — Formspree различает заявки по полю `_subject` в письмах.

---

## Шаг 5: Настройка на Vercel (для продакшена)

1. Зайдите на [vercel.com/dashboard](https://vercel.com/dashboard)
2. Откройте проект **uhome**
3. Перейдите в **Settings** → **Environment Variables**
4. Добавьте переменные (подставьте свой ID):

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_FORMSPREE_CONTACTS` | ВАШ_ID_ФОРМЫ | Production, Preview, Development |
| `NEXT_PUBLIC_FORMSPREE_CTA` | ВАШ_ID_ФОРМЫ | Production, Preview, Development |
| `NEXT_PUBLIC_FORMSPREE_QUIZ` | ВАШ_ID_ФОРМЫ | Production, Preview, Development |
| `NEXT_PUBLIC_FORMSPREE_CALCULATOR` | ВАШ_ID_ФОРМЫ | Production, Preview, Development |

5. Сохраните
6. **Settings** → **General** → **Redeploy** (или дождитесь следующего деплоя)

---

## Как будут выглядеть письма

В теме письма будет указано, откуда пришла заявка:

| Форма | Тема письма |
|-------|-------------|
| Страница Контакты | UHome: Заявка с страницы Контакты |
| «Заказать звонок» (главная) | UHome: Заявка с главной страницы |
| Квиз | UHome: Заявка из квиза |
| Калькулятор (точная смета) | UHome: Запрос точной сметы из калькулятора |

---

## Бесплатный тариф Formspree

- **50 заявок в месяц** — бесплатно
- Если нужно больше — есть платные планы от $10/мес

---

## Проверка работы

1. Откройте свой сайт (локально или на Vercel)
2. Заполните и отправьте любую форму
3. Проверьте почту **uhomegrodno@gmail.com**
4. Заявка должна прийти в течение минуты
