import styles from './Filter.module.scss';
import { useEffect, useState } from 'react';
import { moods, type Dream, type Mood } from '../../../model/Types';

interface FiltersProps {
    dreams: Dream[];
    setFilteredDreams: React.Dispatch<React.SetStateAction<Dream[]>>;

}

const Filters = ({ dreams, setFilteredDreams }: FiltersProps) => {
    const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);
    const [selectedClarity, setSelectedClarity] = useState<number[]>([]);
    const activeFilterCount = selectedMoods.length + selectedClarity.length + 1;
    const clarity = [1, 2, 3, 4, 5];


    const clearFilters = () => {
        setSelectedMoods([]);
        setSelectedClarity([]);
        setFilteredDreams(dreams);
    }
    const toggleMood = (mood: Mood) => {
        setSelectedMoods(prev => prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
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
    useEffect(() => {
        setFilteredDreams(dreams.filter(dream =>
            (selectedMoods.length === 0 || (dream.mood && selectedMoods.includes(dream.mood))) &&
            (selectedClarity.length === 0 || selectedClarity.includes(dream.clarity))
        ));
    }, [toggleMood, toggleClarity, selectedMoods, selectedClarity, clearFilters]);

    return (

        <div className={styles.filterSection}>
            <div className={styles.filterHeader}>Filters</div>
            {activeFilterCount > 0 && (
                <button onClick={clearFilters} className='buttonGeneral'>
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
        </div>)
}

export default Filters
