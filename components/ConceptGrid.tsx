"use client";

import { motion } from "framer-motion";
import { ConceptItem } from "@/types/schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";

interface ConceptGridProps {
  items: ConceptItem[];
}

export function ConceptGrid({ items }: ConceptGridProps) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => {
          // Dynamic icon selection if it exists in lucide-react
          const IconComponent = (Icons as any)[item.icon || "BookOpen"] || Icons.BookOpen;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden hover:bg-white/10 hover:border-primary/50 transition-all duration-500 rounded-2xl">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 mb-2">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-70 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
