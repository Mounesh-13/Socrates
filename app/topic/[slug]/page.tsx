"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchWikipediaContent, fetchWikipediaSummary, WikipediaSummary } from "@/lib/wikipedia";
import { generateUISchema } from "@/lib/generateSchema";
import { UISchema, Theme } from "@/types/schema";
import { DynamicRenderer } from "@/components/DynamicRenderer";
import { LoadingExperience } from "@/components/LoadingExperience";
import { NeuralBackground } from "@/components/NeuralBackground";
import { CopilotKit, useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { stripHtml } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Bookmark, Languages, Sparkles, Zap, Mic, MicOff, RefreshCw, Twitter, Trophy } from "lucide-react";
import "@copilotkit/react-ui/styles.css";

export default function TopicPage() {
  const { slug } = useParams();
  const [schema, setSchema] = useState<UISchema | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [summary, setSummary] = useState<WikipediaSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRemixing, setIsRemixing] = useState(false);

  const loadExperience = async (lens?: string) => {
    try {
      const topic = decodeURIComponent(slug as string).replace(/-/g, " ");
      
      let wikipediaContent = content;
      let wikiSummary = summary;

      if (!wikipediaContent) {
        const [c, s] = await Promise.all([
          fetchWikipediaContent(topic),
          fetchWikipediaSummary(topic).catch(() => null)
        ]);
        wikipediaContent = c;
        wikiSummary = s as any;
        setContent(c);
        setSummary(s as any);
      }

      const imageUrl = wikiSummary?.thumbnail?.source;
      const generatedSchema = await generateUISchema(topic, wikipediaContent as string, imageUrl, lens);
      setSchema(generatedSchema);
      
      document.title = `${topic} | Socrates`;
      setIsRemixing(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load experience");
      setIsRemixing(false);
    }
  };

  useEffect(() => {
    if (slug) {
      setSchema(null);
      setError(null);
      loadExperience();
    }
  }, [slug]);

  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <TopicContent 
        schema={schema} 
        content={content} 
        error={error} 
        isRemixing={isRemixing}
        onRemix={(lens) => {
          setIsRemixing(true);
          loadExperience(lens);
        }}
        wikiUrl={summary?.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${slug}`}
      />
    </CopilotKit>
  );
}

function TopicContent({ 
  schema: initialSchema, 
  content, 
  error, 
  isRemixing,
  onRemix,
  wikiUrl
}: { 
  schema: UISchema | null, 
  content: string | null, 
  error: string | null,
  isRemixing: boolean,
  onRemix: (lens: string) => void,
  wikiUrl: string
}) {
  const [schema, setSchema] = useState<UISchema | null>(initialSchema);
  const [showDebug, setShowDebug] = useState(false);
  const [showHub, setShowHub] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [mastery, setMastery] = useState(0);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  useEffect(() => {
    if (mastery >= 100 && !hasCelebrated) {
      setHasCelebrated(true);
      const saved = localStorage.getItem("socrates_favorites");
      if (saved && schema) {
        const favorites = JSON.parse(saved);
        const updated = favorites.map((f: any) => 
          f.topic === schema.topic ? { ...f, mastered: true } : f
        );
        localStorage.setItem("socrates_favorites", JSON.stringify(updated));
      }
      speak("Congratulations, Scholar. You have achieved full mastery of this topic.");
    }
  }, [mastery]);

  useEffect(() => {
    setSchema(initialSchema);
  }, [initialSchema]);

  const speak = (text: string) => {
    if (!isNarrating) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isNarrating && schema) {
      speak(`Entering the world of ${schema.topic}. Experience theme: ${schema.theme}. ${schema.architectNotes || ""}`);
    } else {
      window.speechSynthesis.cancel();
    }
  }, [isNarrating]);

  const HubButton = ({ icon: Icon, label, onClick, color }: any) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: 20 }}
      className="flex items-center space-x-3 group"
    >
      <span className="bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
      <button 
        onClick={onClick}
        className={`p-3 rounded-full border border-white/10 text-white shadow-xl hover:scale-110 transition-all ${color}`}
      >
        <Icon className="w-5 h-5" />
      </button>
    </motion.div>
  );

  useCopilotReadable({
    description: "The currently displayed Wikipedia content for the topic.",
    value: content ? stripHtml(content) : null,
  });

  useCopilotAction({
    name: "changeTheme",
    description: "Changes the visual theme of the interface.",
    parameters: [
      {
        name: "theme",
        type: "string",
        description: "The new theme to apply (cosmic, parchment-dark, cinematic, neon-performance, futuristic, paper-minimal, brutalist)",
        required: true,
      },
    ],
    handler: ({ theme }) => {
      if (schema) {
        setSchema({ ...schema, theme: theme as Theme });
      }
    },
  });

  useCopilotAction({
    name: "addComponent",
    description: "Adds a new interactive component to the educational experience based on user request.",
    parameters: [
      {
        name: "component",
        type: "object",
        description: "The full component data to add.",
        required: true,
      },
    ],
    handler: ({ component }) => {
      if (schema) {
        setSchema({
          ...schema,
          components: [...schema.components, component as any],
        });
      }
    },
  });

  useCopilotAction({
    name: "remixExperience",
    description: "Regenerates the entire interface layout and content through a specific educational lens.",
    parameters: [
      {
        name: "lens",
        type: "string",
        description: "The educational lens (e.g., 'EL5', 'Expert Academic', 'Poetic')",
        required: true,
      },
    ],
    handler: async ({ lens }) => {
      onRemix(lens);
    },
  });

  useCopilotAction({
    name: "scrollToSection",
    description: "Scrolls the interface to a specific component section.",
    parameters: [
      {
        name: "sectionType",
        type: "string",
        description: "The type of component to scroll to (hero, timeline, quiz, flashcard_deck, glossary)",
        required: true,
      },
    ],
    handler: ({ sectionType }) => {
      const element = document.querySelector(`[id^="${sectionType}-"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  });

  useCopilotAction({
    name: "translateDiscovery",
    description: "Translates the entire educational experience into a specified language.",
    parameters: [
      {
        name: "language",
        type: "string",
        description: "The target language (e.g., 'Spanish', 'French', 'Hindi')",
        required: true,
      },
    ],
    handler: async ({ language }) => {
      onRemix(`Translate everything to ${language}`);
    },
  });

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-4">Discovery Interrupted</h1>
        <p className="text-xl opacity-60 mb-8">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-white text-black rounded-full font-bold"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (isRemixing) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-8 text-white">
        <div className="relative w-32 h-32">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-2 border-purple-500 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border-b-2 border-blue-500 rounded-full"
          />
        </div>
        <div className="text-xl font-mono tracking-[0.3em] uppercase animate-pulse opacity-40">
          Remixing Reality...
        </div>
      </div>
    );
  }

  if (!schema) {
    return (
      <>
        <div className="fixed top-10 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-[60]">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 16, 4], backgroundColor: ["#a855f7", "#3b82f6", "#a855f7"] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                className="w-1.5 bg-purple-500 rounded-full"
              />
            ))}
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">Active Synthesis</span>
        </div>
        <LoadingExperience />
      </>
    );
  }

  const cycleTheme = () => {
    if (!schema) return;
    const themes: Theme[] = ['cosmic', 'parchment-dark', 'cinematic', 'neon-performance', 'futuristic', 'paper-minimal', 'brutalist'];
    const currentIndex = themes.indexOf(schema.theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setSchema({ ...schema, theme: themes[nextIndex] });
  };

  const shareToTwitter = () => {
    const text = `Just explored "${schema?.topic}" on Socrates! The Neural Architect built an incredible interactive experience for me. Check it out:`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <main className="bg-black text-white selection:bg-white selection:text-black relative">
      <NeuralBackground color={schema?.palette?.primary} />
      
      {/* Neural Hub - Floating Action Menu */}
      <div className="fixed bottom-8 right-8 z-[70] flex flex-col items-end space-y-4">
        <AnimatePresence>
          {showHub && (
            <div className="flex flex-col items-end space-y-3 mb-2">
              <HubButton 
                icon={RefreshCw} 
                label="Cycle Theme" 
                onClick={cycleTheme} 
                color="bg-orange-600"
              />
              <HubButton 
                icon={Twitter} 
                label="Share on X" 
                onClick={shareToTwitter} 
                color="bg-sky-500"
              />
              <HubButton 
                icon={Sparkles} 
                label="Remix Experience" 
                onClick={() => onRemix("Explain it differently")} 
                color="bg-purple-600"
              />
              <HubButton 
                icon={Languages} 
                label="Translate" 
                onClick={() => onRemix("Translate to Spanish")} 
                color="bg-blue-600"
              />
              <HubButton 
                icon={Bookmark} 
                label="Save Library" 
                onClick={() => {
                  const topicData = {
                    topic: schema?.topic,
                    palette: schema?.palette,
                    image: wikiUrl.includes('wikipedia') ? null : undefined,
                    slug: window.location.pathname.split('/').pop()
                  };
                  const saved = localStorage.getItem("socrates_favorites");
                  const favorites = saved ? JSON.parse(saved) : [];
                  if (!favorites.find((f:any) => f.topic === schema?.topic)) {
                    localStorage.setItem("socrates_favorites", JSON.stringify([topicData, ...favorites]));
                    alert("Saved to Personal Library!");
                  }
                }} 
                color="bg-emerald-600"
              />
            </div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setShowHub(!showHub)}
          className={`p-5 rounded-full shadow-2xl transition-all duration-500 group ${
            showHub ? "bg-white text-black rotate-45" : "bg-purple-600 text-white hover:scale-110"
          }`}
        >
          <Zap className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      </div>

      <div className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${mastery}%` }}
          className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
        />
      </div>

      <div className="fixed top-6 left-6 z-50 flex items-center space-x-2">
        <button 
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-mono backdrop-blur-md transition-all opacity-40 hover:opacity-100"
        >
          ← Home
        </button>
        <button 
          onClick={() => setShowDebug(!showDebug)}
          className={`px-4 py-2 border rounded-full text-xs font-mono backdrop-blur-md transition-all ${
            showDebug ? "bg-purple-500/20 border-purple-500/40 opacity-100" : "bg-white/5 border-white/10 opacity-20 hover:opacity-100"
          }`}
        >
          {showDebug ? "Hide Schema" : "Neural Trace"}
        </button>
        <button 
          onClick={() => setIsNarrating(!isNarrating)}
          className={`p-2 border rounded-full backdrop-blur-md transition-all ${
            isNarrating ? "bg-red-500/20 border-red-500/40 text-red-400 opacity-100" : "bg-white/5 border-white/10 text-white/40 hover:opacity-100"
          }`}
          title="Narrator Mode"
        >
          {isNarrating ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
        </button>
        {mastery > 0 && (
          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-mono text-emerald-400 animate-in fade-in zoom-in duration-500">
            MASTERY: {Math.round(mastery)}%
          </div>
        )}
        <button 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Discovery Link Copied!");
          }}
          className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/40 hover:text-white transition-all backdrop-blur-md"
          title="Share Discovery"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <CopilotSidebar
        instructions={`You are Socrates, a wise and helpful assistant. 
        Use the provided Wikipedia content to answer questions.
        You have MAGIC POWERS to change the UI:
        1. 'changeTheme': Update the visual style.
        2. 'addComponent': Add new learning blocks (quiz, flashcards, etc).
        3. 'remixExperience': Regenerate everything with a new lens (e.g. EL5).
        4. 'scrollToSection': Instantly navigate the user.
        5. 'translateDiscovery': Change the language of the entire page.`}
        labels={{
          title: "Socrates Dialogue",
          initial: "Greetings, seeker of knowledge. What more shall we explore together?",
        }}
        defaultOpen={false}
        clickOutsideToClose={false}
      >
        {showDebug && schema && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-20 right-6 z-40 w-96 max-h-[85vh] overflow-auto p-6 bg-black/90 border border-white/10 rounded-3xl backdrop-blur-3xl font-mono selection:bg-purple-500/20 shadow-2xl"
          >
            <div className="flex flex-col space-y-6">
              {schema.architectNotes && (
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                  <div className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-2">Architect's Reasoning</div>
                  <div className="text-xs text-purple-200/80 leading-relaxed italic">
                    "{schema.architectNotes}"
                  </div>
                </div>
              )}
              <div>
                <div className="mb-4 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Neural Schema (JSON)</div>
                <pre className="text-[10px] text-emerald-400/80 leading-tight">
                  {JSON.stringify(schema, null, 2)}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
        <DynamicRenderer 
          schema={schema} 
          onMasteryUpdate={(progress) => setMastery(prev => Math.min(100, prev + progress))}
        />
        <footer className="py-12 px-6 text-center border-t border-white/5 bg-white/[0.02]">
          <div className="max-w-xl mx-auto opacity-30 hover:opacity-100 transition-opacity">
            <p className="text-[10px] font-mono uppercase tracking-widest mb-4">Foundation Sources</p>
            <a 
              href={wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm hover:text-purple-400 transition-colors"
            >
              <span>View original article on Wikipedia</span>
              <Share2 className="w-3 h-3" />
            </a>
          </div>
        </footer>
      </CopilotSidebar>
    </main>
  );
}
