import styles from './DreamsList.module.scss';
import React, {  useState } from 'react';
import { type Dream } from '../../../model/Types';
//import { demoDreams } from '../../../model/Types';
import Filters from '../filters/Filters';
import SortDreams from '../sortDreams/SortDreams';
import Modal from '../../modal/Modal';
import AddDreamForm from '../addDream/AddDreamForm';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import DreamCard from '../dreamCard/DreamCard';
import { useLocation } from 'react-router';
// API helper
interface DreamListProp{
  dreams:Dream[]
  setDreams:React.Dispatch<React.SetStateAction<Dream[]>>

}
const DreamsList = ({dreams, setDreams}:DreamListProp) => {
  const [filteredDreams, setFilteredDreams] = useState<Dream[]>(dreams);
  const openAddDreamForm = useSelector((state: RootState) => state.openAddDreamForm.isOpen);
const location = useLocation()

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
          {dreams.length === 0&&location.pathname === '/favorites' ? (
            <div className={styles.emptyState}>
              <p>No favorite dreams yet.</p>
            </div>
          ) :dreams.length === 0? (
            <div className={styles.emptyState}>
              <p>No dreams yet. Start recording your dreams!</p>
            </div>
          ) : filteredDreams.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No dreams match the selected filters.</p>
            </div>
          ) : (
            filteredDreams.map((dream) => <DreamCard key={dream._id} dream={dream} dreams={dreams} setDreams={setDreams} />)
          )}
        </div>
      </div>
      {openAddDreamForm && (
        <Modal>
          <AddDreamForm setDreams={setDreams} />
        </Modal>
      )}
    </div>
  );
}

export default DreamsList
