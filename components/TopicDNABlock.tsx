"use client";

import { motion } from "framer-motion";
import { TopicDNA } from "@/types/schema";
import { Fingerprint } from "lucide-react";

interface TopicDNABlockProps {
  dna: TopicDNA;
}

export function TopicDNABlock({ dna }: TopicDNABlockProps) {
  const categories = [
    { key: 'complexity', label: 'Complexity' },
    { key: 'impact', label: 'Global Impact' },
    { key: 'history', label: 'Historical Depth' },
    { key: 'controversy', label: 'Controversy' },
    { key: 'science', label: 'Scientific' },
    { key: 'arts', label: 'Artistic' },
  ];

  const points = categories.map((cat, i) => {
    const value = (dna as any)[cat.key] / 100;
    const angle = (i / categories.length) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 150 + Math.cos(angle) * (120 * value),
      y: 150 + Math.sin(angle) * (120 * value),
    };
  });

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-center mb-16 space-y-4">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          <Fingerprint className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold uppercase tracking-widest opacity-50">Topic DNA</h3>
        <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Multi-Dimensional Analysis</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-16 bg-white/[0.02] border border-white/5 p-12 md:p-20 rounded-[4rem] backdrop-blur-3xl shadow-2xl">
        {/* Radar Chart */}
        <div className="relative w-[300px] h-[300px]">
          <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
            {/* Grid Circles */}
            {[0.2, 0.4, 0.6, 0.8, 1].map((r) => (
              <circle
                key={r}
                cx="150"
                cy="150"
                r={120 * r}
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                className="opacity-10"
              />
            ))}
            
            {/* Axis Lines */}
            {categories.map((_, i) => {
                const angle = (i / categories.length) * Math.PI * 2 - Math.PI / 2;
                return (
                    <line 
                        key={i}
                        x1="150" y1="150"
                        x2={150 + Math.cos(angle) * 120}
                        y2={150 + Math.sin(angle) * 120}
                        stroke="white"
                        strokeWidth="0.5"
                        className="opacity-10"
                    />
                );
            })}

            {/* DNA Polygon */}
            <motion.polygon
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.6, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              points={polygonPath}
              className="fill-primary stroke-primary stroke-2"
              style={{ filter: "drop-shadow(0 0 10px var(--primary))" }}
            />

            {/* Labels */}
            {categories.map((cat, i) => {
              const angle = (i / categories.length) * Math.PI * 2 - Math.PI / 2;
              const x = 150 + Math.cos(angle) * 145;
              const y = 150 + Math.sin(angle) * 145;
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  className="fill-white/40 text-[8px] font-mono uppercase tracking-tighter"
                >
                  {cat.label}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Data List */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <span className="text-[10px] font-mono opacity-30 uppercase mb-1">{cat.label}</span>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold">{(dna as any)[cat.key]}</span>
                <span className="text-[10px] opacity-20 mb-1.5">%</span>
              </div>
              <div className="w-24 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: `${(dna as any)[cat.key]}%` }}
                   transition={{ duration: 1, delay: 1 + i * 0.1 }}
                   viewport={{ once: true }}
                   className="h-full bg-primary" 
                 />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
