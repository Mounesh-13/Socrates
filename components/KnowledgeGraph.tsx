"use client";

import { motion } from "framer-motion";
import { KnowledgeNode, KnowledgeEdge } from "@/types/schema";
import { Network } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface KnowledgeGraphProps {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  onNodeClick?: (label: string) => void;
}

export function KnowledgeGraph({ nodes, edges, onNodeClick }: KnowledgeGraphProps) {
  const [layout, setLayout] = useState<Record<string, { x: number, y: number }>>({});

  useEffect(() => {
    // Basic force-inspired layout logic
    const newLayout: Record<string, { x: number, y: number }> = {};
    const radius = 220;
    const centerX = 400; 
    const centerY = 300; 

    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * Math.PI * 2 - Math.PI / 2;
      newLayout[node.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    });

    if (nodes.length > 0) {
      newLayout[nodes[0].id] = { x: centerX, y: centerY };
    }

    setLayout(newLayout);
  }, [nodes]);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col items-center mb-16 space-y-4">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          <Network className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold uppercase tracking-widest opacity-50">Web of Thought</h3>
        <p className="text-sm opacity-40 font-mono tracking-tighter uppercase italic text-center">Interactive Relationship Navigation Active</p>
      </div>

      <div className="relative w-full aspect-[4/3] max-w-4xl mx-auto bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-full p-12"
        >
          {/* Edges */}
          {edges.map((edge, index) => {
            const from = layout[edge.from];
            const to = layout[edge.to];
            if (!from || !to) return null;

            return (
              <motion.line
                key={`edge-${index}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="currentColor"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.15 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.1 }}
                className="text-white"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, index) => {
            const pos = layout[node.id];
            if (!pos) return null;

            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer group/node"
                onClick={() => onNodeClick?.(node.label)}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  delay: index * 0.05 
                }}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="10"
                  className="fill-primary shadow-[0_0_20px_var(--primary)] group-hover/node:fill-white transition-colors"
                />
                <foreignObject
                  x={pos.x + 18}
                  y={pos.y - 15}
                  width="180"
                  height="50"
                  className="pointer-events-none"
                >
                  <div className="text-[10px] font-mono font-bold text-white uppercase tracking-tighter drop-shadow-lg group-hover/node:text-primary transition-colors">
                    {node.label}
                    <div className="text-[8px] opacity-40 font-normal leading-tight group-hover/node:opacity-100">{node.type}</div>
                  </div>
                </foreignObject>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
