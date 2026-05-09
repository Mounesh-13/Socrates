"use client";

import { motion } from "framer-motion";
import { MediaItem } from "@/types/schema";
import { PlayCircle, Music } from "lucide-react";

interface MediaBlockProps {
  items: MediaItem[];
}

export function MediaBlock({ items }: MediaBlockProps) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center space-x-4 mb-12 opacity-50 uppercase tracking-[0.2em] font-mono text-xs">
        <div className="h-px w-12 bg-white/20" />
        <span>Neural Media Integration</span>
        <div className="h-px w-12 bg-white/20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative flex flex-col space-y-4"
          >
            <div className="flex items-center space-x-3 mb-2">
              {item.type === 'video' ? <PlayCircle className="w-5 h-5 text-red-500" /> : <Music className="w-5 h-5 text-emerald-500" />}
              <span className="text-sm font-bold uppercase tracking-widest opacity-80">{item.title || (item.type === 'video' ? "Featured Lecture" : "Soundscape")}</span>
            </div>

            <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
              {item.provider === 'youtube' && (
                <iframe
                  src={`https://www.youtube.com/embed/${item.url}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              {item.provider === 'spotify' && (
                <iframe
                  src={`https://open.spotify.com/embed/${item.type === 'audio' ? 'track' : 'playlist'}/${item.url}`}
                  className="w-full h-full"
                  allow="encrypted-media"
                />
              )}
            </div>
            
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none rounded-b-[2rem]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
