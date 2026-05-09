"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedTopicsProps {
  topics: string[];
}

export function RelatedTopics({ topics }: RelatedTopicsProps) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      <h3 className="text-2xl font-bold mb-12 opacity-50 uppercase tracking-widest">
        Continue the Journey
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.8,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
            viewport={{ once: true }}
          >
            <Link
              href={`/topic/${encodeURIComponent(topic.toLowerCase().replace(/ /g, "-"))}`}
              className="group relative block"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-between p-8 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-primary/30 group-hover:-translate-y-1 transition-all">
                <span className="text-xl font-bold tracking-tight">{topic}</span>
                <div className="p-2 rounded-full bg-white/0 group-hover:bg-primary/10 transition-colors">
                  <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform group-hover:text-primary" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
