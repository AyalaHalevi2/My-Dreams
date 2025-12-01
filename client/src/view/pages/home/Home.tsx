//import { useState } from 'react'
import './Home.scss'
import { useContext } from 'react';
import DreamsList from '../../components/dreamsList/DreamsList';
import Header from '../../components/header/Header';
import SearchBar from '../../components/searchBar/SearchBar';

import { ThemeContext } from '../../model/theme/ThemeProvider';

export const PATH = 'http://localhost:3004';

function Home() {
    const theme = useContext(ThemeContext)
    return (
        <div data-theme={theme ? 'dark' : 'light'}>
            <div className={'u'}>
                <Header />
                <SearchBar />
                <DreamsList />
            </div >
        </div>
    )
}

export default Home
