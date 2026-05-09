"use client";

import { motion } from "framer-motion";
import { Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutBlockProps {
  title: string;
  text: string;
  intent?: 'info' | 'warning' | 'success';
}

const intentStyles = {
  info: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  warning: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
};

const intentIcons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle2,
};

export function CalloutBlock({ title, text, intent = 'info' }: CalloutBlockProps) {
  const Icon = intentIcons[intent];

  return (
    <section className="py-12 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn(
          "p-8 rounded-3xl border flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 backdrop-blur-md",
          intentStyles[intent]
        )}
      >
        <div className="p-3 rounded-2xl bg-current/10">
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h4 className="text-xl font-bold mb-2 uppercase tracking-wide">
            {title}
          </h4>
          <p className="text-lg opacity-80 leading-relaxed">
            {text}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
