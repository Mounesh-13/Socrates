"use client";

import { UISchema, ComponentData } from "@/types/schema";
import { HeroBlock } from "./HeroBlock";
import { TimelineBlock } from "./TimelineBlock";
import { ConceptGrid } from "./ConceptGrid";
import { QuizBlock } from "./QuizBlock";
import { FlashcardDeck } from "./FlashcardDeck";
import { QuoteBlock } from "./QuoteBlock";
import { CalloutBlock } from "./CalloutBlock";
import { StatsGrid } from "./StatsGrid";
import { GlossaryBlock } from "./GlossaryBlock";
import { RelatedTopics } from "./RelatedTopics";

const componentMap: Record<string, React.ComponentType<any>> = {
  hero: HeroBlock,
  timeline: TimelineBlock,
  concept_grid: ConceptGrid,
  quiz: QuizBlock,
  flashcard_deck: FlashcardDeck,
  quote: QuoteBlock,
  callout: CalloutBlock,
  stats_grid: StatsGrid,
  glossary: GlossaryBlock,
  related_topics: RelatedTopics,
};

interface DynamicRendererProps {
  schema: UISchema;
  onMasteryUpdate?: (progress: number) => void;
}

export function DynamicRenderer({ schema, onMasteryUpdate }: DynamicRendererProps) {
  return (
    <div className={`min-h-screen experience-theme-${schema.theme}`}>
      {schema.components.map((component, index) => {
        const Component = componentMap[component.type];
        if (!Component) return null;

        // Spread the component data as props, excluding 'type'
        const { type, ...props } = component;
        
        // Pass onMasteryUpdate to components that support it
        const componentProps = {
          ...props,
          ...(type === 'quiz' || type === 'flashcard_deck' ? { onMasteryUpdate } : {})
        };

        return (
          <div key={index} id={`${type}-${index}`}>
            <Component {...componentProps} />
          </div>
        );
      })}
    </div>
  );
}
