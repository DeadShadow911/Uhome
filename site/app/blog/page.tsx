import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Блог о ремонте квартир в Гродно | UHome",
  description: "Полезные статьи о ремонте, ценах, сроках и выборе материалов. Советы от специалистов UHome в Гродно.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl lg:text-5xl">
          Блог
        </h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          Статьи о ремонте квартир в Гродно: цены, сроки, выбор подрядчика и материалов
        </p>

        <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6">
                <span className="text-xs font-medium text-accent">{post.category}</span>
                <h2 className="mt-2 font-heading text-lg font-semibold text-primary group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-text-muted line-clamp-2">{post.excerpt}</p>
                <time className="mt-4 block text-xs text-text-muted">{post.date}</time>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
