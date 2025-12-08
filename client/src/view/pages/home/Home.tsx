//import { useState } from 'react'
import './Home.scss'
import '../../../styles/theme.scss';

import { useEffect } from 'react';
import DreamsList from '../../components/dreamsList/DreamsList';
import Header from '../../components/header/Header';
import { checkAuth } from '../../../functions/FetchFuncitons';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';

function Home() {
    const theme = useSelector((state: RootState) => state.theme.theme);

    useEffect(() => {
        checkAuth();
    }, []);
    
    return (
        <div className='homeWrapper' data-theme={theme === 'dark' ? 'dark' : 'light'}>
            <div className="header"> <Header /></div>
            <div className={'home'}>
                <div className="dreamsList"><DreamsList /></div>
            </div >
        </div>
    )
}

export default Home
