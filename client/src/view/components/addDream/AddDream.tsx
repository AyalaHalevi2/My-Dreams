import styles from './AddDreamBtn.module.scss';

const AddDream = () => {
  const handleAddDream = () => {
    // Handle add dream logic
  };
  return (
    <button className={styles.container} onClick={handleAddDream}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <line x1="10" y1="0" x2="10" y2="20" strokeWidth="2" />
        <line x1="0" y1="10" x2="20" y2="10" strokeWidth="2" />
      </svg>
    </button>
  );
}

export default AddDream
