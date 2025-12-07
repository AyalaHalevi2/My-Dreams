export const PATH = 'http://localhost:3004';
export interface Dream {
    id?: string;
    userId?: string;
    title: string;
    content: string;
    date: Date;
    clarity: number;
    mood?: 'happy' | 'sad' | 'scared' | 'confused' | 'peaceful' | 'anxious' | 'excited' | 'neutral';
    tags?: string[];
    isFavorite: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
}

export const moods: Mood[] = ['happy', 'sad', 'scared', 'confused', 'peaceful', 'anxious', 'excited', 'neutral'];
export type Mood = undefined | 'happy'    | 'sad'    | 'scared'    | 'confused'    | 'peaceful'    | 'anxious'    | 'excited'    | 'neutral';

 export const demoDreams: Dream[] = [
  {
    id: "1",
    userId: "123",
    title: "Flying Over the City",
    content: "I was flying above a glowing purple city. The streets looked endless, and every time I tried to land, the wind lifted me higher.",
    date: new Date("2024-11-04"),
    clarity: 4,
    mood: "scared",
    tags: ["flying", "city", "freedom"],
    isFavorite: true,
    createdAt: new Date("2024-11-04"),
    updatedAt: new Date("2024-11-05"),
  },
  {
    id: "2",
    userId: "123",
    title: "Lost in the Forest",
    content: "I wandered through a dark forest where the trees whispered. I kept searching for a path but everything looked the same.",
    date: new Date("2024-12-01"),
    clarity: 2,
    mood: "scared",
    tags: ["forest", "dark", "lost"],
    isFavorite: false,
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "3",
    userId: "123",
    title: "Meeting an Old Friend",
    content: "I met my childhood friend in a quiet café. We talked for hours even though in real life we haven’t spoken in years.",
    date: new Date("2025-01-10"),
    clarity: 5,
    mood: "peaceful",
    tags: ["nostalgia", "friend", "warm"],
    isFavorite: true,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-11"),
  },
  {
    id: "4",
    userId: "123",
    title: "Running Late Again",
    content: "I was late for an important exam but every hallway led to another hallway. No doors, no signs, just endless school corridors.",
    date: new Date("2025-02-02"),
    clarity: 3,
    mood: "anxious",
    tags: ["school", "stress", "running"],
    isFavorite: false,
    createdAt: new Date("2025-02-02"),
    updatedAt: new Date("2025-02-02"),
  }
];

