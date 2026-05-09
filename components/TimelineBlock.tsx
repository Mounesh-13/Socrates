"use client";

import { motion } from "framer-motion";
import { TimelineEvent } from "@/types/schema";

interface TimelineBlockProps {
  events: TimelineEvent[];
}

export function TimelineBlock({ events }: TimelineBlockProps) {
  return (
    <section className="py-24 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="px-6 flex items-start space-x-12">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="inline-block w-80 whitespace-normal"
          >
            <div className="text-sm font-mono opacity-50 mb-2">{event.date}</div>
            <div className="h-px w-full bg-current opacity-20 mb-6 relative">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-current" />
            </div>
            <h3 className="text-xl font-bold mb-3">{event.title}</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              {event.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
