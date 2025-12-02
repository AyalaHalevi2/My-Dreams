import styles from './DreamsList.module.scss';
import { useState } from 'react';

const DreamsList = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Dreams data would come from props or state management
  const dreams = [{ id: 1 }, { id: 2 }]; // Example dream items
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>dreams list</h2>
      </div>


      <div className={styles.dreamsList}>
        {dreams.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No dreams yet. Start recording your dreams!</p>
          </div>
        ) : (
          dreams.map((dream) => (
            <div key={dream.id} className={styles.dreamItem}>
              {/* Dream item content */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DreamsList
