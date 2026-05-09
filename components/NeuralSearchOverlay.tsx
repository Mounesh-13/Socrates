"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X, Command } from "lucide-react";
import { searchWikipedia } from "@/lib/wikipedia";
import { useRouter } from "next/navigation";

export function NeuralSearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 2) {
        const results = await searchWikipedia(query);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (topic: string) => {
    router.push(`/topic/${encodeURIComponent(topic.toLowerCase().replace(/ /g, "-"))}`);
    onClose();
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="p-6 border-b border-white/5 flex items-center space-x-4">
              <Search className="w-5 h-5 text-white/20" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Neural Search Knowledge..."
                className="flex-1 bg-transparent border-none outline-none text-xl font-light placeholder:opacity-20"
              />
              <div className="flex items-center space-x-2 px-2 py-1 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[10px] font-mono opacity-40 uppercase tracking-tighter">ESC to close</span>
              </div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
              {suggestions.length > 0 ? (
                <div className="p-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSelect(s)}
                      className="w-full text-left px-6 py-4 rounded-2xl hover:bg-purple-500/10 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500/20 transition-colors text-white/20 group-hover:text-purple-400">
                           <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="text-base font-medium text-white/80 group-hover:text-white transition-colors">{s}</span>
                      </div>
                      <div className="text-[10px] font-mono opacity-0 group-hover:opacity-40 transition-opacity">ARCHITECT SELECT</div>
                    </button>
                  ))}
                </div>
              ) : query.length > 2 ? (
                <div className="p-12 text-center text-white/20 font-mono text-xs uppercase tracking-widest">
                  Neural Scan in Progress...
                </div>
              ) : (
                <div className="p-12 text-center flex flex-col items-center space-y-4">
                  <Command className="w-8 h-8 text-white/10" />
                  <div className="text-xs font-mono text-white/20 uppercase tracking-[0.2em]">Enter a topic to begin synthesis</div>
                </div>
              )}
            </div>

            <div className="p-4 bg-black/40 border-t border-white/5 flex justify-center">
               <div className="text-[9px] font-mono opacity-20 uppercase tracking-[0.3em]">Socrates Knowledge Graph v2.0</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
