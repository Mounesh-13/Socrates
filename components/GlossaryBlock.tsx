"use client";

import { motion } from "framer-motion";
import { GlossaryItem } from "@/types/schema";
import { BookMarked } from "lucide-react";

interface GlossaryBlockProps {
  items: GlossaryItem[];
}

export function GlossaryBlock({ items }: GlossaryBlockProps) {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="flex items-center space-x-4 mb-12 opacity-50 uppercase tracking-[0.2em] font-mono">
        <BookMarked className="w-5 h-5" />
        <h3 className="text-xl font-bold">Lexicon of Knowledge</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group"
          >
            <h4 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">
              {item.term}
            </h4>
            <p className="text-sm opacity-60 leading-relaxed border-l-2 border-white/5 pl-4 group-hover:border-purple-500/30 transition-all">
              {item.definition}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
