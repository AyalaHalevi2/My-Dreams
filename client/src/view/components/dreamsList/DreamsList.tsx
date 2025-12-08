import styles from './DreamsList.module.scss';
import { useContext, useEffect, useState } from 'react';
import DreamCard from '../dreamCard/DreamCard';
import { PATH, type Dream} from '../../../model/Types';
//import { demoDreams } from '../../../model/Types';
import Filters from '../filters/Filters';
import SortDreams from '../sortDreams/SortDreams';
import Modal from '../../modal/Modal';
import AddDreamForm from '../addDream/AddDreamForm';
import { AddFormContext } from '../../../model/openAddDreamForm/OpenAddDreamForm';
// API helper

const DreamsList = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [filteredDreams, setFilteredDreams] = useState<Dream[]>(dreams);
 const {toggleAddDreamForm} = useContext(AddFormContext);
  // Load dreams once on mount
  useEffect(() => {
    fetchDreams();

  }, [setDreams]);
  async function fetchDreams() {
    try {
      const response = await fetch(`${PATH}/api/dreams`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
         const dreamsWithDates = data.dreams.map((dream: Dream) => ({
        ...dream,
        date: new Date(dream.date)
      }));
      setDreams(dreamsWithDates);
      } else {
        throw new Error("Failed to fetch dreams");
      }
    } catch (error) {
      console.error('Error fetching dreams:', error);
    }
  }

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
      { toggleAddDreamForm&& (
        <Modal>
          <AddDreamForm setDreams={setDreams} />
        </Modal>
      )}
    </div>
  );
}

export default DreamsList
