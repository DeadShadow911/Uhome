import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/mock-data";
import { siteConfig } from "@/lib/site-config";
import type { BlogContentBlock } from "@/lib/mock-data";
import { ArticleLeadForm } from "@/components/forms/ArticleLeadForm";
import { PhoneLink } from "@/components/ui/PhoneLink";

function ArticleContent({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <div className="mt-6 space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={block.text.toLowerCase().replace(/[^a-zа-яё0-9]+/g, "-").replace(/-$/g, "")}
                className="mt-12 mb-4 font-heading text-xl font-bold text-primary border-b border-primary/10 pb-2"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 mb-3 font-heading text-lg font-semibold text-primary">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-primary leading-relaxed">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc list-inside space-y-1 text-primary ml-2">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal list-inside space-y-2 text-primary ml-2">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            );
          case "box":
            return (
              <div
                key={i}
                className={`rounded-r-lg border-l-4 p-4 my-4 ${
                  block.variant === "warning"
                    ? "bg-amber-50/80 border-amber-500 text-primary"
                    : "bg-primary/5 border-primary/30 text-primary"
                }`}
              >
                <p className="m-0">{block.text}</p>
              </div>
            );
          default:
            return null;
        }
      })}
      <div className="mt-12 relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary via-[#141414] to-[#1a1a1a] p-6 shadow-[0_8px_30px_rgba(10,10,10,0.25)] sm:p-8 text-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} aria-hidden />
        <div className="relative">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2 tracking-tight">Оставьте заявку на ремонт</h3>
          <p className="text-white/90 text-base text-center mb-6">Бесплатный выезд и смета за 2 рабочих дня</p>
          <div className="max-w-md mx-auto">
            <ArticleLeadForm subject="UHome: Заявка со статьи «Ремонт квартиры в Гродно»" />
          </div>
          <p className="mt-6 text-center text-white/80 text-sm">
            Или позвоните: <PhoneLink href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} location="blog" className="font-medium text-white hover:underline">{siteConfig.phone}</PhoneLink>
            {" · "}
            <Link href="/kalkulyator" className="font-medium text-white hover:underline">Быстрый расчёт</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const url = `/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: ["ремонт Гродно", "ремонт квартир Гродно"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: { canonical: url },
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
            {post.contentBlocks ? (
              <ArticleContent blocks={post.contentBlocks} />
            ) : (
              <>
                {post.content?.map((paragraph, i) => (
                  <p key={i} className={i === 0 ? "mt-6 text-primary" : "mt-4 text-primary"}>
                    {paragraph}
                  </p>
                ))}
                <p className="mt-6 text-primary">
                  Свяжитесь с нами для бесплатной консультации и расчёта стоимости работ в Гродно.
                </p>
              </>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
