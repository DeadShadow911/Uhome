"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/mock-data";

export function BlogSection() {
  return (
    <section className="bg-background py-10 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Блог
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-text-muted">
            Полезные статьи о ремонте и отделке
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">{post.category}</span>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-primary group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted line-clamp-2">{post.excerpt}</p>
                  <time className="mt-4 block text-xs text-text-muted">{post.date}</time>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Button asChild variant="secondary">
            <Link href="/blog">Читать блог</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
