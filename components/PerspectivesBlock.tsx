"use client";

import { motion } from "framer-motion";
import { Perspective } from "@/types/schema";
import { ArrowLeftRight, CheckCircle2 } from "lucide-react";

interface PerspectivesBlockProps {
  left: Perspective;
  right: Perspective;
}

export function PerspectivesBlock({ left, right }: PerspectivesBlockProps) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-center space-x-4 mb-16 opacity-30 uppercase tracking-[0.3em] font-mono text-xs">
        <div className="h-px w-12 bg-white/20" />
        <span>Dual Perspectives</span>
        <ArrowLeftRight className="w-4 h-4" />
        <div className="h-px w-12 bg-white/20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Perspective */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-10 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors"
        >
          <h3 className="text-2xl font-bold mb-8 text-purple-400">{left.title}</h3>
          <ul className="space-y-6">
            {left.points.map((point, i) => (
              <li key={i} className="flex items-start space-x-4">
                <CheckCircle2 className="w-5 h-5 text-purple-500/40 mt-1 flex-shrink-0" />
                <p className="text-sm opacity-70 leading-relaxed">{point}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Perspective */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-10 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors"
        >
          <h3 className="text-2xl font-bold mb-8 text-blue-400">{right.title}</h3>
          <ul className="space-y-6">
            {right.points.map((point, i) => (
              <li key={i} className="flex items-start space-x-4">
                <CheckCircle2 className="w-5 h-5 text-blue-500/40 mt-1 flex-shrink-0" />
                <p className="text-sm opacity-70 leading-relaxed">{point}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
