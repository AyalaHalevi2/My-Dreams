import { moods, type Dream } from '../../../model/Types';
import styles from './SortDreams.module.scss'
import { useState } from 'react';

interface SortDreamsProps {
    dreams?: Dream[];
    setDreams: React.Dispatch<React.SetStateAction<Dream[]>>;
}
const SortDreams = ({ dreams, setDreams }: SortDreamsProps) => {
    const [sortOpen, setSortOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('Recommended');
    const sordtOptions = ['Date Old to New', 'Date New to Old', 'Clarity Low to High', 'Clarity High to Low', 'By Mood'];


    function handleSort(option: string) {
        setSelectedOption(option);
        setDreams(prevDreams => {
            let sortedDreams = [...(prevDreams)];
            switch (option) {
                case 'Date New to Old':
                    sortedDreams.sort((a, b) => a.date.getTime() - b.date.getTime());
                    break;
                case 'Date Old to New':
                    sortedDreams.sort((a, b) => b.date.getTime() - a.date.getTime());
                    break;
                case 'Clarity Low to High':
                    sortedDreams.sort((a, b) => a.clarity - b.clarity);
                    break;
                case 'Clarity High to Low':
                    sortedDreams.sort((a, b) => b.clarity - a.clarity);
                    break;
                case 'By Mood':
                    sortedDreams.sort((a, b) => {
                        const indexA = a.mood ? moods.indexOf(a.mood) : Infinity;
                        const indexB = b.mood ? moods.indexOf(b.mood) : Infinity;
                        return indexA - indexB;
                    });
                    break;
            }
            return sortedDreams;
        });
        setSortOpen(false);

    }
    return (
        <div className={styles.container}><button
            className='buttonGeneral'
            onClick={() => setSortOpen(!sortOpen)}
        >
            Sort By : {selectedOption}
        </button>

            {sortOpen && (
                <div className={styles.dropdown}>
                    {sordtOptions.map((option) => (
                        <div key={option} className={`${styles.option} ${option === selectedOption ? styles.optionSelected : ''}`} onClick={() => { handleSort(option) }} >
                            {option}
                        </div>
                    ))}
                </div>
            )}</div>
    )
}

export default SortDreams
