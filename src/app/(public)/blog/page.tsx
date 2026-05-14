"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft, BookOpen } from "lucide-react";
import { getBlogPosts } from "@/lib/mockApi";
import type { BlogPost } from "@/lib/types";


export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getBlogPosts().then((d) => { setPosts(d); setLoading(false); }); }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">المدونة التعليمية</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">مقالات ونصائح لتحسين تجربة التعلم</p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{[1, 2, 3].map((i) => (<div key={i} className="bg-white rounded-3xl border border-slate-200 h-96 animate-pulse"><div className="h-52 bg-slate-100 rounded-t-3xl" /><div className="p-6 space-y-3"><div className="h-4 bg-slate-100 rounded w-3/4" /><div className="h-4 bg-slate-100 rounded w-1/2" /></div></div>))}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="h-52 relative overflow-hidden">
                  <Image src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width={400} height={250} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-primary-700">{post.category}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-primary-600 transition-colors">{post.title}</h2>
                  <p className="text-sm text-slate-500 mb-4 flex-1 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Image src={post.authorAvatar} alt={post.author} width={28} height={28} className="rounded-full bg-slate-100" style={{ width: "28px", height: "28px" }} />
                      <span className="text-xs font-medium text-slate-600">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400"><Clock   className="w-4 h-4 shrink-0"/>{post.readTime}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
