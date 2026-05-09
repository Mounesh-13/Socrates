export type Theme = 'cosmic' | 'parchment-dark' | 'cinematic' | 'neon-performance' | 'futuristic' | 'paper-minimal' | 'brutalist';

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface ConceptItem {
  title: string;
  description: string;
  icon?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface Perspective {
  title: string;
  points: string[];
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'concept' | 'person' | 'event' | 'place';
}

export interface KnowledgeEdge {
  from: string;
  to: string;
  label?: string;
}

export interface PathwayItem {
  step: string;
  title: string;
  description: string;
}

export type ComponentData = 
  | { type: 'hero'; title: string; subtitle: string; theme: Theme; imageUrl?: string }
  | { type: 'timeline'; events: TimelineEvent[] }
  | { type: 'concept_grid'; items: ConceptItem[] }
  | { type: 'quiz'; questions: QuizQuestion[] }
  | { type: 'flashcard_deck'; cards: Flashcard[] }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'callout'; title: string; text: string; intent?: 'info' | 'warning' | 'success' }
  | { type: 'stats_grid'; items: { label: string; value: string }[] }
  | { type: 'glossary'; items: GlossaryItem[] }
  | { type: 'perspectives'; left: Perspective; right: Perspective }
  | { type: 'knowledge_graph'; nodes: KnowledgeNode[]; edges: KnowledgeEdge[] }
  | { type: 'pathway'; items: PathwayItem[] }
  | { type: 'related_topics'; topics: string[] };

export interface UISchema {
  topic: string;
  theme: Theme;
  palette?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  aura?: {
    keywords: string[];
    sentiment: 'hopeful' | 'dark' | 'analytical' | 'epic' | 'minimal';
  };
  components: ComponentData[];
  architectNotes?: string;
}
