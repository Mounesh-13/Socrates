"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { searchWikipedia } from "@/lib/wikipedia";

export default function LandingPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 2) {
        const results = await searchWikipedia(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    const history = localStorage.getItem("socrates_history");
    if (history) setRecent(JSON.parse(history));
    
    const saved = localStorage.getItem("socrates_favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const featuredTopic = {
    title: "The Renaissance",
    description: "A period of European cultural, artistic, political and economic 'rebirth' following the Middle Ages.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sanzio_01.jpg/1200px-Sanzio_01.jpg"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    let topic = query.trim();
    if (topic.includes("wikipedia.org/wiki/")) {
      topic = topic.split("/wiki/")[1];
    }
    
    // Save to history
    const formattedTopic = topic.replace(/-/g, " ");
    const newHistory = [formattedTopic, ...recent.filter(t => t !== formattedTopic)].slice(0, 5);
    localStorage.setItem("socrates_history", JSON.stringify(newHistory));

    router.push(`/topic/${encodeURIComponent(topic.toLowerCase().replace(/ /g, "-"))}`);
  };

  const handleRandom = () => {
    const randomTopic = examples[Math.floor(Math.random() * examples.length)];
    router.push(`/topic/${encodeURIComponent(randomTopic.toLowerCase().replace(/ /g, "-"))}`);
  };

  const examples = [
    "Albert Einstein", 
    "French Revolution", 
    "Black Hole", 
    "Interstellar", 
    "Quantum Mechanics", 
    "Ancient Egypt", 
    "Artificial Intelligence", 
    "The Beatles", 
    "Stoicism", 
    "Renaissance"
  ];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center py-24 px-6 overflow-x-hidden relative">
      {/* Neural Pulse Indicator */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center space-x-3 opacity-20 hover:opacity-100 transition-opacity cursor-default">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ height: [4, 12, 4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-1 bg-purple-500 rounded-full"
            />
          ))}
        </div>
        <span className="text-[10px] font-mono tracking-widest uppercase">Engine Standby</span>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white mask-radial opacity-20" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center z-10 w-full max-w-4xl"
      >
        <motion.h1 
          initial={{ letterSpacing: "0.2em", opacity: 0 }}
          animate={{ letterSpacing: "0em", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20"
        >
          Socrates
        </motion.h1>
        <p className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase opacity-40 mb-16">
          The Living Encyclopedia
        </p>

        {/* Featured Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          onClick={() => router.push('/topic/renaissance')}
          className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-16 group cursor-pointer border border-white/10 shadow-2xl"
        >
          <img 
            src={featuredTopic.image} 
            alt="Featured" 
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 text-left max-w-md">
            <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-2">Featured Discovery</div>
            <h2 className="text-3xl font-bold mb-2">{featuredTopic.title}</h2>
            <p className="text-sm opacity-60 line-clamp-2">{featuredTopic.description}</p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto mb-12 group">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length > 2 && setShowSuggestions(true)}
            placeholder="Paste Wikipedia URL or Topic"
            className="w-full h-16 bg-white/5 border-white/10 rounded-2xl px-8 text-lg focus:bg-white/10 focus:border-white/20 transition-all placeholder:opacity-30"
          />

          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-[110%] left-0 right-0 z-50 bg-black/80 border border-white/10 rounded-2xl backdrop-blur-2xl overflow-hidden shadow-2xl"
              >
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setQuery(s);
                      setShowSuggestions(false);
                      router.push(`/topic/${encodeURIComponent(s.toLowerCase().replace(/ /g, "-"))}`);
                    }}
                    className="w-full text-left px-8 py-4 hover:bg-purple-500/10 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm font-medium">{s}</span>
                    </div>
                    <div className="text-[10px] font-mono opacity-20 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">Architect Select</div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-2 h-12 w-12 rounded-xl bg-white text-black hover:bg-white/90 transition-all"
          >
            <Search className="w-5 h-5" />
          </Button>
        </form>

        <div className="flex flex-wrap justify-center gap-4 opacity-40 hover:opacity-100 transition-opacity mb-8">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => setQuery(example)}
              className="px-4 py-2 rounded-full border border-white/10 text-sm hover:bg-white/5 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full text-left mb-16">
          {recent.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em] mb-6">Recent History</div>
              <div className="flex flex-col space-y-2">
                {recent.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => router.push(`/topic/${encodeURIComponent(topic.toLowerCase().replace(/ /g, "-"))}`)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex justify-between items-center group"
                  >
                    <span>{topic}</span>
                    <Search className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {favorites.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 col-span-1 md:col-span-2">
              <div className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em] mb-8 text-center md:text-left">Your Discovery Gallery</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((item: any) => (
                  <motion.div
                    key={item.topic}
                    whileHover={{ y: -5 }}
                    onClick={() => router.push(`/topic/${item.slug}`)}
                    className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer group border border-white/10 shadow-xl"
                    style={{ borderColor: item.palette?.primary + '40' }}
                  >
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"} 
                      alt={item.topic}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: item.palette?.primary, color: item.palette?.primary }} />
                        <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Saved Experience</span>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight">{item.topic}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          onClick={handleRandom}
          variant="ghost"
          className="text-white/40 hover:text-white hover:bg-white/5 rounded-full px-8 py-6 border border-white/5 hover:border-white/10 transition-all font-mono tracking-widest uppercase text-xs"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span>Random Discovery</span>
          </div>
        </Button>
      </motion.div>

      <div className="absolute bottom-10 text-[10px] font-mono tracking-[0.3em] uppercase opacity-20">
        Engineered for the Generative UI Hackathon
      </div>
    </main>
  );
}
