"use client";

import { motion } from "framer-motion";
import { BridgeItem } from "@/types/schema";
import { Link2 } from "lucide-react";

interface NeuralBridgeProps {
  bridge: BridgeItem;
}

export function NeuralBridge({ bridge }: NeuralBridgeProps) {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-8 mb-12">
           <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[10px] font-mono opacity-40 uppercase">Prev</div>
              <span className="text-xs font-bold opacity-60">{bridge.sourceTopic}</span>
           </div>

           <motion.div 
             animate={{ scaleX: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
             transition={{ duration: 3, repeat: Infinity }}
             className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" 
           />

           <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full border border-primary/50 bg-primary/10 flex items-center justify-center text-[10px] font-mono text-primary uppercase shadow-[0_0_15px_var(--primary)]">Now</div>
              <span className="text-xs font-bold text-primary">{bridge.targetTopic}</span>
           </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl text-center max-w-2xl"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 rounded-2xl bg-black border border-white/10 text-primary">
            <Link2 className="w-6 h-6" />
          </div>
          <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-30 mb-6 mt-2">Neural Connection Established</h3>
          <p className="text-xl md:text-2xl font-medium leading-relaxed italic">
            "{bridge.connection}"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
