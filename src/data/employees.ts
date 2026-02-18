export type Employee = {
  id: string;
  name: string;
  role: string;
  bio: string;
  favoriteStack: string[];
  spotlight: string;
  avatar: string;
};

export const employees: Employee[] = [
  {
    id: "rina-patel",
    name: "Rina Patel",
    role: "Creative Technologist",
    bio: "Rina prototypes the wild ideas and stress-tests them with real communities.",
    favoriteStack: ["Arduino", "p5.js", "Figma"],
    spotlight: "Led the launch of the Random Idea Generator v2.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80&fm=webp",
  },
  {
    id: "kai-monroe",
    name: "Kai Monroe",
    role: "Program Manager",
    bio: "Kai coordinates sprint logistics and keeps the maker community connected.",
    favoriteStack: ["Notion", "Airtable", "Community"],
    spotlight: "Hosts the monthly creator livestreams.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80&fm=webp",
  },
  {
    id: "lena-ortiz",
    name: "Lena Ortiz",
    role: "Product Designer",
    bio: "Lena crafts the UI kits and visual systems for Random Showcase experiments.",
    favoriteStack: ["Figma", "MUI", "Illustrator"],
    spotlight: "Designed the new gallery card system.",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80&fm=webp",
  },
  {
    id: "jun-park",
    name: "Jun Park",
    role: "Learning Experience Designer",
    bio: "Jun translates ideas into step-by-step micro learning pathways.",
    favoriteStack: ["Webflow", "Loom", "Docs"],
    spotlight: "Piloted the 7-day maker challenge.",
    avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80&fm=webp",
  },
];
