"use client";

import { motion } from "framer-motion";
import { PathwayItem } from "@/types/schema";
import { Route, MapPin } from "lucide-react";

interface PathwayBlockProps {
  items: PathwayItem[];
}

export function PathwayBlock({ items }: PathwayBlockProps) {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-center mb-24">
        <div className="p-4 rounded-full bg-primary/10 text-primary mb-6 animate-bounce">
          <Route className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-bold tracking-tighter uppercase mb-4">Neural Pathway</h3>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <p className="mt-4 text-xs font-mono opacity-40 uppercase tracking-widest text-center">Curated Learning Journey for You</p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/10 to-transparent md:-translate-x-1/2" />

        <div className="space-y-24">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start md:items-center`}
            >
              {/* Step Node */}
              <div className="absolute left-0 md:left-1/2 top-0 md:top-auto w-14 h-14 bg-black border-2 border-primary rounded-full flex items-center justify-center z-10 md:-translate-x-1/2 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                <span className="text-lg font-bold font-mono text-primary">{index + 1}</span>
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-[45%] mt-20 md:mt-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group">
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-3 h-3 text-primary opacity-50" />
                    <span className="text-[10px] font-mono text-primary uppercase tracking-widest">{item.step}</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm opacity-60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
