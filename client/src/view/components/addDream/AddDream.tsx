import { useState } from 'react';
import styles from './AddDream.module.scss';
import Modal from '../../modal/Modal';
import AddDreamForm from './AddDreamForm';

const AddDream = () => {
  const handleAddDream = () => {
    // Handle add dream logic
  };
  const [openAddDreamForm, setOpenAddDreamForm] = useState(false);
  return (
    <>
    <button className={styles.container} onClick={() => setOpenAddDreamForm(!openAddDreamForm)}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <line x1="10" y1="0" x2="10" y2="20" strokeWidth="2" />
        <line x1="0" y1="10" x2="20" y2="10" strokeWidth="2" />
      </svg>
    </button>

    {openAddDreamForm && (
      <Modal>
        <AddDreamForm />
      </Modal>
    )}
    </>
  );
}

export default AddDream
