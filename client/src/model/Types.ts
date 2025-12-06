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
