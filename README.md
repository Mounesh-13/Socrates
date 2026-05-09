# Socrates | The Living Encyclopedia

Socrates is a high-fidelity **Generative UI** educational platform designed to transform static information into immersive, interactive, and adaptive learning journeys. 

Built for the **Generative UI Hackathon**, it leverages the latest in AI reasoning and adaptive component systems to bridge the gap between raw data and human understanding.

## 🚀 The "Neural Architect" Concept

Unlike traditional educational tools that follow a rigid layout, Socrates operates as a **Neural Architect**. When a user enters a topic, the AI (Gemini 3 Flash) doesn't just summarize the text—it **designs the interface**. It selects the most effective components (Timelines for history, 3D Flashcards for concepts, Quizzes for validation) and chooses a visual theme that fits the topic's "soul."

## ✨ Key Features

### 🧠 Intelligence & Interactivity
- **AI-Generated Layouts:** Real-time synthesis of UI schemas based on Wikipedia content.
- **Interactive Socrates Dialogue:** A **CopilotKit** powered sidebar that remembers everything on the page and answers complex questions.
- **Experience Remixing:** Ask Socrates to "Explain like I'm 5" or "Deep dive for an expert," and the entire UI re-architects itself instantly.
- **Neural Navigation:** Tell Socrates to "Show me the quiz" or "Go to the timeline," and the UI will automatically scroll you to the right section.
- **Universal Translation:** Instantly re-synthesize the entire educational experience into any language.

### 🎭 Adaptive UI Components
- **Cinematic Hero:** Dynamic Wikipedia-sourced imagery with high-impact typography.
- **Timeline:** Chronological tracking of major milestones.
- **Flashcard Mastery:** Interactive 3D flipping cards for rapid concept retention.
- **Quiz Engine:** Knowledge validation with real-time feedback.
- **Glossary of Knowledge:** A synthesized lexicon of technical or historical terminology.
- **Cinematic Quotes:** Hear the wisdom of history's greatest minds with integrated **Voice Synthesis**.

### 🎮 Personalized Discovery
- **Personal Library:** Save your favorite discoveries to your local collection.
- **Recent History:** A persistent grid of your latest educational journeys.
- **Mastery Progress:** A global progress bar and badge system that tracks your engagement and learning.

## 🛠️ Tech Stack

- **AI Engine:** Gemini 3 Flash (`gemini-3-flash-preview`)
- **Framework:** Next.js 16.2.6 (Turbopack)
- **Agent Framework:** CopilotKit
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Data Source:** Wikipedia REST API

## 🚦 Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_google_ai_studio_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_google_ai_studio_key
   ```
4. Start the engine:
   ```bash
   npm run dev
   ```

---
*Engineered for the Generative UI Hackathon*
