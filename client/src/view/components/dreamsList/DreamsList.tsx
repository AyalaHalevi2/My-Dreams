import styles from './DreamsList.module.scss';
import { useState } from 'react';

const DreamsList = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Dreams data would come from props or state management
  const dreams = [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>dreams list</h2>

        <div className={styles.controls}>
          <button
            className={styles.controlBtn}
            onClick={() => setSortOpen(!sortOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <line x1="3" y1="6" x2="17" y2="6" strokeWidth="2" />
              <line x1="3" y1="10" x2="17" y2="10" strokeWidth="2" />
              <line x1="3" y1="14" x2="17" y2="14" strokeWidth="2" />
            </svg>
            <span>sort</span>
          </button>

          <button
            className={styles.controlBtn}
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <line x1="3" y1="6" x2="17" y2="6" strokeWidth="2" />
              <line x1="3" y1="10" x2="17" y2="10" strokeWidth="2" />
              <line x1="3" y1="14" x2="17" y2="14" strokeWidth="2" />
            </svg>
            <span>filters</span>
          </button>
        </div>
      </div>

      {sortOpen && (
        <div className={styles.sortMenu}>
          <button>Date (Newest)</button>
          <button>Date (Oldest)</button>
          <button>Title (A-Z)</button>
          <button>Title (Z-A)</button>
        </div>
      )}

      {filtersOpen && (
        <div className={styles.filtersMenu}>
          <button>All Dreams</button>
          <button>Favorites Only</button>
          <button>Lucid Dreams</button>
          <button>Nightmares</button>
        </div>
      )}

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
