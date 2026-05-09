"use client";

import { motion } from "framer-motion";
import { Quote, Volume2 } from "lucide-react";

interface QuoteBlockProps {
  text: string;
  author?: string;
}

export function QuoteBlock({ text, author }: QuoteBlockProps) {
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(`${text}. By ${author || "Unknown"}`);
    utterance.rate = 0.9;
    utterance.pitch = 0.8; // Wise, deeper voice
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative group"
      >
        <Quote className="absolute -top-12 -left-12 w-24 h-24 opacity-5 pointer-events-none" />
        
        <div className="absolute -top-4 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleSpeak}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white transition-all"
            title="Hear the Wisdom"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        <blockquote className="text-center">
          <p className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight italic">
            "{text}"
          </p>
          {author && (
            <footer className="text-xl font-mono opacity-50 uppercase tracking-widest">
              — {author}
            </footer>
          )}
        </blockquote>

        <Quote className="absolute -bottom-12 -right-12 w-24 h-24 opacity-5 pointer-events-none rotate-180" />
      </motion.div>
    </section>
  );
}
