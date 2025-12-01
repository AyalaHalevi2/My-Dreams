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
        <div className= {`home, ${theme}`}>
            <Header />
            <SearchBar />
            <DreamsList />
        </div >
    )
}

export default Home
