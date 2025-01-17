"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

interface BlogPreviewProps {
  posts: BlogPost[];
}

export const BlogPreview = ({ posts }: BlogPreviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={300}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 text-xs font-medium bg-blue-500/90 text-white rounded-full">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-neutral-300 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">{post.date}</span>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                Read More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Hover Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,163,255,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
};
