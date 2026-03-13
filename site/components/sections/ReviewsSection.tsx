"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/mock-data";
import "swiper/css";
import "swiper/css/pagination";

export function ReviewsSection() {
  return (
    <section className="py-10 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Отзывы наших клиентов
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-text-muted">
            Реальные истории о проделанной работе
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 6000 }}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1.05}
          breakpoints={{
            640: { spaceBetween: 24, slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="reviews-swiper -mx-4 px-4 pb-4 sm:mx-0 sm:px-0"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex h-full flex-col rounded-xl border border-primary/10 bg-white p-4 shadow-md sm:p-6"
              >
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="size-5 fill-current" />
                  ))}
                </div>
                <Quote className="mt-4 size-10 text-primary/10" />
                <p className="mt-4 flex-1 text-sm text-primary">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
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
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
