"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion } from "@/types/schema";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface QuizBlockProps {
  questions: QuizQuestion[];
  onMasteryUpdate?: (progress: number) => void;
}

export function QuizBlock({ questions, onMasteryUpdate }: QuizBlockProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
      if (onMasteryUpdate) {
        onMasteryUpdate(100 / (questions.length * 2));
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="text-sm font-mono opacity-50 mb-4">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-8">
                {currentQuestion.question}
              </h3>
              <div className="space-y-4 mb-8">
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = index === currentQuestion.correctAnswer;
                  const isSelected = index === selectedAnswer;
                  const showSuccess = selectedAnswer !== null && isCorrect;
                  const showFailure = isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-6 rounded-2xl border transition-all flex justify-between items-center ${
                        selectedAnswer === null
                          ? "border-white/10 hover:border-white/30 hover:bg-white/5"
                          : showSuccess
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : showFailure
                          ? "border-rose-500 bg-rose-500/10 text-rose-400"
                          : "border-white/5 opacity-50"
                      }`}
                    >
                      <span>{option}</span>
                      {showSuccess && <Check className="w-5 h-5" />}
                      {showFailure && <X className="w-5 h-5" />}
                    </button>
                  );
                })}
              </div>
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Button
                    onClick={handleNext}
                    className="w-full py-6 rounded-2xl text-lg font-bold"
                  >
                    {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold mb-4">Experience Complete</h3>
              <p className="text-xl opacity-70 mb-8">
                You've mastered {score} out of {questions.length} concepts.
              </p>
              <Button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswer(null);
                  setShowResult(false);
                  setScore(0);
                }}
                variant="outline"
                className="py-6 px-12 rounded-2xl"
              >
                Restart Quiz
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
