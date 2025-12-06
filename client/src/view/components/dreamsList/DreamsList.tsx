import styles from './DreamsList.module.scss';
import { useEffect, useState } from 'react';
import DreamCard from '../dreamCard/DreamCard';
import { PATH, type Dream, moods, type Mood } from '../../../model/Types';
// API helper

const DreamsList = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);
  const [selectedClarity, setSelectedClarity] = useState<number[]>([]);
  const activeFilterCount = selectedMoods.length + selectedClarity.length + 1;
  const clarity = [1, 2, 3, 4, 5];
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [filteredDreams, setFilteredDreams] = useState<Dream[]>([]);

  // Load dreams once on mount
  useEffect(() => {
    //fetchDreams();
  }, []);

  // Recompute filtered dreams when source data or filters change
  useEffect(() => {
    setFilteredDreams(dreams.filter(dream =>
      (selectedMoods.length === 0 || (dream.mood && selectedMoods.includes(dream.mood))) &&
      (selectedClarity.length === 0 || selectedClarity.includes(dream.clarity))
    ));
  }, [dreams, selectedMoods, selectedClarity]);
  // Dreams data would come from props or state management
  //query form api: /api/dreams



  //funcitons
  const clearFilters = () => {
    setSelectedMoods([]);
    setSelectedClarity([]);
  }
  const toggleMood = (mood: Mood) => {
    setSelectedMoods(prev =>  prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
    console.log('Toggled mood:', selectedMoods);
  };
  const toggleClarity = (level: number) => {
    setSelectedClarity(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    )
  };


  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>

        <div className={styles.filterSection}>
          <div className={styles.filterHeader}>Filters</div>
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className={styles.buttonAll}>
              Clear All
            </button>
          )}
          <div className={styles.filterTitle}>Mood</div>

          <div className={styles.filterOptions}>
            {moods.map(mood => (
              <label key={mood} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedMoods.includes(mood)}
                  onChange={() => toggleMood(mood)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>{mood}</span>
              </label>
            ))}
          </div>
          <div className={styles.filterTitle}>Clarity</div>
          <div className={styles.filterOptions}>
            {clarity.map(level => (
              <label key={level} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedClarity.includes(level)}
                  onChange={() => toggleClarity(level)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>{level}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
      <div className={styles.dreamsListContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>dreams list</h2>
          <button
            className={styles.sortButton}
            onClick={() => setSortOpen(!sortOpen)}
          >
            Sort By
          </button>
        </div>
        <div className={styles.sortSection}>
          {sortOpen && (
            <div className={styles.sortOptions}>
              <div className={styles.option}>Date</div>
              <div className={styles.option}>Clarity</div>
              <div className={styles.option}>Mood</div>
            </div>
          )}
        </div>


        <div className={styles.dreamsList}>
          {filteredDreams.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No dreams yet. Start recording your dreams!</p>
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
