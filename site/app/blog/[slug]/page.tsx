import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/mock-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | UHome Блог`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <article className="container mx-auto px-4 sm:px-6">
        <nav className="mb-8 text-sm text-text-muted">
          <Link href="/" className="hover:text-accent">Главная</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-accent">Блог</Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{post.title}</span>
        </nav>

        <div className="mx-auto max-w-3xl">
          <span className="text-sm font-medium text-accent">{post.category}</span>
          <h1 className="mt-2 font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            {post.title}
          </h1>
          <time className="mt-4 block text-text-muted">{post.date}</time>

          <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-primary mt-12 max-w-none">
            <p className="text-lg text-text-muted">{post.excerpt}</p>
            {post.content?.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "mt-6 text-primary" : "mt-4 text-primary"}>
                {paragraph}
              </p>
            ))}
            <p className="mt-6 text-primary">
              Свяжитесь с нами для бесплатной консультации и расчёта стоимости работ в Гродно.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
