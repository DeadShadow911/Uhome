import { reviews } from "@/lib/mock-data";
import { Star } from "lucide-react";

export default function OtzyvyPage() {
  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl lg:text-5xl">
          Отзывы
        </h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          Отзывы наших клиентов о проделанной работе
        </p>

        <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-xl border border-primary/10 bg-white p-4 shadow-md sm:p-6"
            >
              <div className="flex gap-1 text-accent">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-primary">&ldquo;{review.text}&rdquo;</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
                  {review.author
                    .split(" ")
                    .map((s) => s[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-primary">{review.author}</p>
                  <p className="text-sm text-text-muted">{review.type}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
