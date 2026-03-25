import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, User, ChevronRight } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import FadeIn from "@/components/FadeIn";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "it_IT",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <article className="py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <FadeIn>
          <nav className="flex items-center gap-2 text-orbius-gray500 text-sm mb-8">
            <Link href="/blog" className="hover:text-orbius-gold transition-colors">
              Blog
            </Link>
            <ChevronRight size={14} />
            <span className="text-orbius-gold">{post.category}</span>
          </nav>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={100}>
          <div className="mb-12">
            <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-orbius-gold bg-orbius-gold/10 px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orbius-white leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-orbius-gray500 text-sm">
              <span className="flex items-center gap-1">
                <User size={14} />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {post.readingTime} di lettura
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Content */}
        <FadeIn delay={200}>
          <div className="prose">
            <MDXRemote source={post.content} />
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={300}>
          <div className="mt-16 rounded-xl border border-orbius-gold/20 bg-orbius-navy2 p-8 text-center">
            <h3 className="text-xl font-extrabold text-orbius-white mb-3">
              Ti è piaciuto questo articolo?
            </h3>
            <p className="text-orbius-gray300 text-sm mb-6">
              Scopri come possiamo aiutare la tua attività a crescere sui social media.
            </p>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 bg-orbius-gold text-orbius-navy px-6 py-3 rounded-xl font-bold hover:bg-orbius-goldLight transition-colors"
            >
              Contattaci
            </Link>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
