import { useContext } from 'react';
import styles from './AddDream.module.scss';
import { AddFormContext } from '../../../model/openAddDreamForm/OpenAddDreamForm';

const AddDream = () => {
const { handleToggleAddDreamForm} = useContext(AddFormContext);
  return (
    <>
    <button className={styles.container} onClick={handleToggleAddDreamForm}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <line x1="10" y1="0" x2="10" y2="20" strokeWidth="2" />
        <line x1="0" y1="10" x2="20" y2="10" strokeWidth="2" />
      </svg>
    </button>


    </>
  );
}

export default AddDream
