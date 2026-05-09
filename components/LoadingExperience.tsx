"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  "Parsing Wikipedia article...",
  "Extracting core concepts...",
  "Designing adaptive interface...",
  "Synthesizing timeline events...",
  "Formulating challenge questions...",
  "Assembling visual experience...",
  "Neural Architect finalizing layout...",
];

export function LoadingExperience() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-24 h-24 mb-12"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 border-2 border-white/20 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-4 border-2 border-white rounded-full"
        />
      </motion.div>

      <div className="h-8 overflow-hidden">
        <motion.p
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="text-white text-xl font-mono tracking-widest uppercase opacity-80"
        >
          {messages[index]}
        </motion.p>
      </div>

      <div className="absolute bottom-20 left-10 right-10 flex justify-between items-end">
        <div className="text-white/20 text-xs font-mono">
          SOCRATES ENGINE v1.0.4<br />
          NEURAL ARCHITECT ACTIVE
        </div>
        <div className="w-48 h-1 bg-white/10 overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-1/2 h-full bg-white/40"
          />
        </div>
      </div>
    </div>
  );
}
