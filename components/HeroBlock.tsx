"use client";

import { motion } from "framer-motion";
import { Theme } from "@/types/schema";
import { cn } from "@/lib/utils";

interface HeroBlockProps {
  title: string;
  subtitle: string;
  theme: Theme;
  imageUrl?: string;
}

const themeStyles: Record<Theme, string> = {
  cosmic: "bg-slate-950",
  "parchment-dark": "bg-stone-900",
  cinematic: "bg-black",
  "neon-performance": "bg-zinc-950",
  futuristic: "bg-gray-900",
  "paper-minimal": "bg-white text-black",
  brutalist: "bg-orange-500",
};

export function HeroBlock({ title, subtitle, theme, imageUrl }: HeroBlockProps) {
  return (
    <section
      className={cn(
        "relative h-[80vh] flex flex-col items-center justify-center overflow-hidden px-6",
        themeStyles[theme]
      )}
    >
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover opacity-20 blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        </div>
      )}

      {/* Decorative elements based on theme */}
      {theme === "cosmic" && !imageUrl && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      )}
      {theme === "neon-performance" && !imageUrl && (
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent,_rgba(0,255,255,0.05)_50%,_transparent)] pointer-events-none" />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10"
      >
        <h1 className={cn(
          "text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-primary",
          theme === "paper-minimal" ? "font-serif" : theme === "brutalist" ? "font-mono uppercase italic border-4 border-black p-4 bg-white" : "font-sans"
        )}>
          {title}
        </h1>
        <p className={cn(
          "text-xl md:text-2xl opacity-80 max-w-2xl mx-auto leading-relaxed",
          theme === "brutalist" ? "font-mono bg-black text-white p-2 mt-4" : "text-foreground"
        )}>
          {subtitle}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-current opacity-20" />
      </motion.div>
    </section>
  );
}
