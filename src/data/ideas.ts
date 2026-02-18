export type Idea = {
  id: string;
  title: string;
  category: "Web" | "Hardware" | "Art" | "Product" | "Community";
  complexity: 1 | 2 | 3 | 4 | 5;
  summary: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
};

export const ideas: Idea[] = [
  {
    id: "idea-001",
    title: "Solar-powered desk buddy",
    category: "Hardware",
    complexity: 4,
    summary: "Build a small solar gadget that animates when it senses sunlight.",
    author: "Rina Patel",
    date: "Feb 2, 2026",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80&fm=webp",
    tags: ["Arduino", "Sustainability"],
  },
  {
    id: "idea-002",
    title: "Weekend maker sprint",
    category: "Community",
    complexity: 2,
    summary: "Plan a 48-hour online sprint for creatives to ship one small build.",
    author: "Kai Monroe",
    date: "Jan 21, 2026",
    image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80&fm=webp",
    tags: ["Events", "Facilitation"],
  },
  {
    id: "idea-003",
    title: "Moodboard-to-UI generator",
    category: "Web",
    complexity: 3,
    summary: "Turn a moodboard into a starter UI theme using palette extraction.",
    author: "Lena Ortiz",
    date: "Jan 12, 2026",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80&fm=webp",
    tags: ["Design", "AI"],
  },
  {
    id: "idea-004",
    title: "Analog texture pack",
    category: "Art",
    complexity: 1,
    summary: "Collect analog textures from everyday objects and package them for download.",
    author: "Mira Cho",
    date: "Dec 29, 2025",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da6?auto=format&fit=crop&w=900&q=80&fm=webp",
    tags: ["Photography", "Textures"],
  },
  {
    id: "idea-005",
    title: "Micro learning pathway",
    category: "Product",
    complexity: 2,
    summary: "Design a 7-day micro course around a skill with daily 10-min prompts.",
    author: "Jun Park",
    date: "Dec 5, 2025",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80&fm=webp",
    tags: ["Education", "Content"],
  },
  {
    id: "idea-006",
    title: "Garden sensor dashboard",
    category: "Hardware",
    complexity: 5,
    summary: "Create a sensor kit to track soil moisture and auto-generate care alerts.",
    author: "Ari Novak",
    date: "Nov 20, 2025",
    image: "https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?auto=format&fit=crop&w=900&q=80&fm=webp",
    tags: ["IoT", "Monitoring"],
  },
  {
    id: "idea-007",
    title: "Local artisan map",
    category: "Community",
    complexity: 3,
    summary: "Build a map of local makers with stories, hours, and shopping links.",
    author: "Sasha Bell",
    date: "Nov 9, 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80&fm=webp",
    tags: ["Mapping", "Curation"],
  },
  {
    id: "idea-008",
    title: "Ambient sound sculptor",
    category: "Art",
    complexity: 4,
    summary: "Create generative soundscapes based on weather or time of day.",
    author: "Noor Ahmed",
    date: "Oct 22, 2025",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80&fm=webp",
    tags: ["Audio", "Generative"],
  },
  {
    id: "idea-009",
    title: "Accessibility checklist",
    category: "Web",
    complexity: 2,
    summary: "Design a checklist that flags accessibility issues in website mockups.",
    author: "Ben Watts",
    date: "Oct 2, 2025",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80&fm=webp",
    tags: ["UX", "Accessibility"],
  },
];

export const categories = ["All", "Web", "Hardware", "Art", "Product", "Community"] as const;
