import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group rounded-xl border border-orbius-gray700/25 bg-orbius-navy2 overflow-hidden transition-all duration-300 hover:border-orbius-gold/30">
        {/* Image placeholder */}
        <div className="aspect-video bg-orbius-navy3 flex items-center justify-center">
          <span className="text-orbius-gray500 text-sm">Immagine</span>
        </div>

        <div className="p-6">
          {/* Category badge */}
          <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-orbius-gold bg-orbius-gold/10 px-3 py-1 rounded-full mb-3">
            {post.category}
          </span>

          {/* Title */}
          <h3 className="text-lg font-extrabold tracking-tight text-orbius-white mb-2 group-hover:text-orbius-gold transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-orbius-gray300 text-sm leading-relaxed mb-4 line-clamp-2">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-orbius-gray500 text-xs">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString("it-IT", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readingTime} di lettura
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
