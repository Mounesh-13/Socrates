"use client";

import { motion } from "framer-motion";
import { ChartData } from "@/types/schema";
import { BarChart3 } from "lucide-react";

interface ChartBlockProps {
  title: string;
  chartType: 'bar' | 'area';
  data: ChartData[];
}

export function ChartBlock({ title, chartType, data }: ChartBlockProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-center mb-16 space-y-4">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold uppercase tracking-widest opacity-50">{title}</h3>
      </div>

      <div className="relative h-96 w-full flex items-end justify-between space-x-4 px-12 py-8 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-3xl">
        {chartType === 'bar' && data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center group">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(item.value / maxValue) * 100}%` }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1, 
                delay: index * 0.1,
                ease: [0.33, 1, 0.68, 1] 
              }}
              className="w-full max-w-[60px] bg-gradient-to-t from-primary/20 via-primary/50 to-primary rounded-t-xl relative"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/10 px-2 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap">
                {item.value}
              </div>
            </motion.div>
            <div className="mt-6 text-[10px] font-mono uppercase tracking-tighter opacity-30 group-hover:opacity-100 transition-opacity text-center w-full truncate px-1">
              {item.label}
            </div>
          </div>
        ))}

        {chartType === 'area' && (
          <div className="w-full h-full relative flex items-end">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d={`M 0 100 ${data.map((item, i) => `L ${(i / (data.length - 1)) * 100} ${100 - (item.value / maxValue) * 80}`).join(" ")} L 100 100 Z`}
                fill="url(#areaGradient)"
                stroke="var(--primary)"
                strokeWidth="1"
              />
            </svg>
            <div className="absolute inset-0 flex justify-between items-end px-1">
               {data.map((item, index) => (
                 <div key={index} className="flex flex-col items-center">
                    <div className="mb-[-4px] w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                    <div className="mt-8 text-[8px] font-mono uppercase opacity-30 text-center">{item.label}</div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
