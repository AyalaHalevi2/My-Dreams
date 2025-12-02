//import { useState } from 'react'
import './Home.scss'
import '../../../styles/theme.scss';

import { useContext } from 'react';
import DreamsList from '../../components/dreamsList/DreamsList';
import Header from '../../components/header/Header';

import { ThemeContext } from '../../../model/theme/ThemeProvider';
export interface Dream{
    userId: string;
    title: string;
    content: string;
    date: Date;
    clarity: number;
    mood?: 'happy' | 'sad' | 'scared' | 'confused' | 'peaceful' | 'anxious' | 'excited' | 'neutral';
    tags?: string[];
    isFavorite: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export const PATH = 'http://localhost:3004';

function Home() {
    const theme = useContext(ThemeContext)
    return (
        <div className='homeWrapper' data-theme={theme.theme === 'dark' ? 'dark' : 'light'}>
            <div className="header"> <Header /></div>
            <div className={'home'}>
                <div className="dreamsList"><DreamsList /></div>
            </div >
        </div>
    )
}

export default Home
