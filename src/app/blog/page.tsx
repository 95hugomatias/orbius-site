import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Strategie e consigli per far crescere la tua attività online. Guide pratiche per ristoranti, cliniche e negozi.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-orbius-white mb-4">
              Blog
            </h1>
            <p className="text-orbius-gray300 max-w-xl mx-auto">
              Strategie e consigli per far crescere la tua attività online.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 100}>
              <BlogCard post={post} />
            </FadeIn>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-orbius-gray500 text-center">
            Nessun articolo ancora. Torna presto!
          </p>
        )}
      </div>
    </section>
  );
}
