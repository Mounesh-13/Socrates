"use client";

import { motion } from "framer-motion";

interface StatsGridProps {
  items: { label: string; value: string }[];
}

export function StatsGrid({ items }: StatsGridProps) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="text-sm font-mono opacity-50 uppercase tracking-widest mb-2">
              {item.label}
            </div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight">
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
