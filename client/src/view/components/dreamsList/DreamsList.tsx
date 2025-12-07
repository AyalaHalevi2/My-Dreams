import styles from './DreamsList.module.scss';
import { useEffect, useState } from 'react';
import DreamCard from '../dreamCard/DreamCard';
import { PATH, type Dream, moods, type Mood, demoDreams } from '../../../model/Types';
import Filters from '../filters/Filters';
import SortDreams from '../sortDreams/SortDreams';
// API helper

const DreamsList = () => {

  const [dreams, setDreams] = useState<Dream[]>(demoDreams);
    const [filteredDreams, setFilteredDreams] = useState<Dream[]>(dreams);

  // Load dreams once on mount
  useEffect(() => {
    //fetchDreams();
  }, []);


  //funcitons


  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>

        <Filters dreams={dreams} setFilteredDreams={setFilteredDreams} />
      </div>
      <div className={styles.dreamsListContainer}>
        <SortDreams dreams={dreams} setDreams={setDreams} />
        <div className={styles.header}>
          <h2 className={styles.title}>dreams list</h2>

        </div>

        <div className={styles.dreamsList}>
          {dreams.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No dreams yet. Start recording your dreams!</p>
            </div>
          ) : filteredDreams.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No dreams match the selected filters.</p>
            </div>
          ) : (
            filteredDreams.map((dream) => <DreamCard key={dream.id} dream={dream} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default DreamsList
