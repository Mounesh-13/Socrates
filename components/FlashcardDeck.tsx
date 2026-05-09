"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flashcard } from "@/types/schema";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface FlashcardDeckProps {
  cards: Flashcard[];
  onMasteryUpdate?: (progress: number) => void;
}

export function FlashcardDeck({ cards, onMasteryUpdate }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewedCards, setViewedCards] = useState<Set<number>>(new Set());

  const handleFlip = () => {
    if (!isFlipped && !viewedCards.has(currentIndex)) {
      setViewedCards(prev => new Set(prev).add(currentIndex));
      if (onMasteryUpdate) {
        onMasteryUpdate(100 / (cards.length * 4));
      }
    }
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-12 opacity-50 uppercase tracking-widest text-center">
        Flashcard Mastery
      </h3>

      <div className="relative w-full max-w-md aspect-[4/3] perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full h-full cursor-pointer"
            onClick={handleFlip}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full h-full"
            >
              {/* Front */}
              <div
                className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-xl"
              >
                <div className="text-xs font-mono opacity-30 mb-4 uppercase">Front</div>
                <h4 className="text-2xl md:text-3xl font-bold leading-tight">
                  {cards[currentIndex].front}
                </h4>
                <div className="absolute bottom-6 text-[10px] font-mono opacity-20 uppercase tracking-tighter">
                  Click to Flip
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 backface-hidden bg-white/10 border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-xl"
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="text-xs font-mono opacity-30 mb-4 uppercase">Back</div>
                <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                  {cards[currentIndex].back}
                </p>
                <div className="absolute bottom-6 text-[10px] font-mono opacity-20 uppercase tracking-tighter">
                  Click to Revert
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center space-x-8">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          className="rounded-full border-white/10 hover:bg-white/5"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <div className="text-sm font-mono opacity-50">
          {currentIndex + 1} / {cards.length}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="rounded-full border-white/10 hover:bg-white/5"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="mt-8 text-xs font-mono opacity-20 hover:opacity-100 transition-opacity flex items-center space-x-2"
      >
        <RotateCcw className="w-3 h-3" />
        <span>MANUAL FLIP</span>
      </button>
    </section>
  );
}
