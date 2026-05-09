"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ConceptItem } from "@/types/schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { useState } from "react";
import { X, MessageSquare } from "lucide-react";

interface ConceptGridProps {
  items: ConceptItem[];
}

export function ConceptGrid({ items }: ConceptGridProps) {
  const [selectedConcept, setSelectedConcept] = useState<ConceptItem | null>(null);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => {
          const IconComponent = (Icons as any)[item.icon || "BookOpen"] || Icons.BookOpen;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => setSelectedConcept(item)}
            >
              <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden hover:bg-white/10 hover:border-primary/50 transition-all duration-500 rounded-2xl">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 mb-2">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-70 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                  <div className="mt-4 text-[10px] font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Click for Insight</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedConcept && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedConcept(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedConcept(null)}
                className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-12 md:p-20">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                    {(Icons as any)[selectedConcept.icon || "BookOpen"] ? 
                      React.createElement((Icons as any)[selectedConcept.icon || "BookOpen"], { className: "w-8 h-8" }) : 
                      <Icons.BookOpen className="w-8 h-8" />
                    }
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">{selectedConcept.title}</h3>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-xl opacity-80 leading-relaxed mb-12">
                    {selectedConcept.description}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => {
                      // This will be handled by the parent TopicPage context usually
                      alert(`Socrates: "Let us delve deeper into ${selectedConcept.title}..."`);
                    }}
                    className="flex items-center justify-center space-x-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-105 transition-all shadow-lg"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Deep Dive with Socrates</span>
                  </button>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Helper to make React.createElement work with dynamic icons
import React from "react";
