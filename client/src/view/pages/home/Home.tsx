//import { useState } from 'react'
import './Home.scss'
import '../../../styles/theme.scss';

import { useEffect, useState } from 'react';
import DreamsList from '../../components/dreamsList/DreamsList';
import Header from '../../components/header/Header';
import { checkAuth, fetchDreams } from '../../../functions/FetchFuncitons';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import type { Dream } from '../../../model/Types';

function Home() {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const [dreams, setDreams] = useState<Dream[]>([]);

    useEffect(() => {
        checkAuth();
        fetchDreams().then((dreams) => {
            if (dreams) setDreams(dreams);
        });
    }, []);

    return (
        <div className='homeWrapper' data-theme={theme === 'dark' ? 'dark' : 'light'}>
            <div className="header"> <Header /></div>
            <div className='home'>
                <div className="dreamsListWrapper"><DreamsList dreams={dreams} setDreams={setDreams} /></div>
            </div >
        </div>
    )
}

export default Home
