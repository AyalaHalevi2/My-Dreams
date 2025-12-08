//import { useState } from 'react'
import './Home.scss'
import '../../../styles/theme.scss';

import { useContext } from 'react';
import DreamsList from '../../components/dreamsList/DreamsList';
import Header from '../../components/header/Header';

import { ThemeContext } from '../../../model/theme/ThemeProvider';


function Home() {
    const {theme} = useContext(ThemeContext)
    
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
