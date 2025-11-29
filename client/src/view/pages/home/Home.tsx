//import { useState } from 'react'
import './Home.scss'
import styles from './Homepage.module.scss';
import Header from './Header';
import SearchBar from './SearchBar';
import DreamsList from './DreamsList';

export const PATH = 'http://localhost:3004';

function Home() {
    return (
        <div className={styles.home}>
            <Header />
            <SearchBar />
            <DreamsList />
        </div >
    )
}

export default Home
