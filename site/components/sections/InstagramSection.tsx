"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type InstagramPost = {
  id: string;
  caption?: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

export function InstagramSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [useEmbed, setUseEmbed] = useState(false);
  const embedId = process.env.NEXT_PUBLIC_INSTAGRAM_EMBED_ID || "35dcb758-3f4d-4565-88ab-ecd28dfbdc3b";
  const instagramUrl = siteConfig.socials.instagram;

  useEffect(() => {
    if (embedId) {
      setUseEmbed(true);
      setLoading(false);
      return;
    }

    fetch("/api/instagram")
      .then((res) => res.json())
      .then((data) => {
        if (data.items?.length) {
          setPosts(data.items);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [embedId]);

  // Сторонний виджет (Elfsight и др.)
  if (embedId) {
    return (
      <section className="bg-background py-10 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
              Наш Instagram
            </h2>
            <p className="mt-3 text-text-muted">
              Последние посты и проекты
            </p>
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-cta hover:underline"
              >
                <Instagram className="size-5" />
                Подписаться
              </a>
            )}
          </motion.div>

          <div className="min-h-[300px]">
            <div
              className={`elfsight-app-${embedId}`}
              data-elfsight-app-lazy
            />
          </div>

          <Script
            src="https://elfsightcdn.com/platform.js"
            strategy="lazyOnload"
          />
        </div>
      </section>
    );
  }

  // Fallback: CTA без ленты
  if (error || (!loading && posts.length === 0)) {
    return (
      <section className="bg-primary py-12 text-white sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <Instagram className="mx-auto size-12 text-white/80" />
          <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
            Наш Instagram
          </h2>
          <p className="mt-2 max-w-md mx-auto text-white/80">
            Следите за нашими проектами и новостями в Instagram
          </p>
          {instagramUrl ? (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary hover:bg-white/90"
            >
              <Instagram className="size-5" />
              Подписаться
            </a>
          ) : null}
        </div>
      </section>
    );
  }

  // Загрузка
  if (loading) {
    return (
      <section className="bg-background py-10 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
              Наш Instagram
            </h2>
            <p className="mt-3 text-text-muted">Загрузка…</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-lg bg-primary/10"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Лента из API
  return (
    <section className="bg-background py-10 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-end"
        >
          <div>
            <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
              Наш Instagram
            </h2>
            <p className="mt-2 text-text-muted">
              Последние посты и проекты
            </p>
          </div>
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-cta hover:underline"
            >
              <Instagram className="size-5" />
              Подписаться
              <ExternalLink className="size-4" />
            </a>
          )}
        </motion.div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
          {posts.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-primary/5"
            >
              <Image
                src={
                  post.media_type === "VIDEO" && post.thumbnail_url
                    ? post.thumbnail_url
                    : post.media_url
                }
                alt={post.caption?.slice(0, 100) ?? "Instagram post"}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                <Instagram className="size-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
