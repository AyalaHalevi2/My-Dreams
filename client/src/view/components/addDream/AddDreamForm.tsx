import { useDispatch } from 'react-redux';
import { moods, PATH, type Dream, type Mood } from '../../../model/Types';
import style from './AddDream.module.scss';
import { useState } from 'react';
import { closeAddDreamForm } from '../../../redux/slices/toggleAddDreamFormSlice';

interface AddDreamFormProps {
    setDreams: React.Dispatch<React.SetStateAction<Dream[]>>;
}


const AddDreamForm = ({ setDreams }: AddDreamFormProps) => {
    const dispatch = useDispatch();

    const [activeMood, setActiveMood] = useState<Mood>();
    const [isClosing, setIsClosing] = useState(false);
    const [massage, setMassage] = useState<string>('');

    // --- Tags State (not required)
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');

    // Close animation
    const handleCloseForm = () => {
        setIsClosing(true);
        setTimeout(() => dispatch(closeAddDreamForm()), 300);
    };

    // POST request
    async function createDream(dream: Dream) {
        try {
            const response = await fetch(`${PATH}/api/dreams`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(dream)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create dream');
            }
            return data.dream as Dream;
        } catch (error: any) {
            console.error('Error creating dream:', error.message || error);
            setMassage('Failed to save dream. Please try again.');
            return null;
        }
    }

    // --- Add Tag on Enter (optional field)
    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();

        const newTag = tagInput.trim().toLowerCase();
        if (!newTag) return;

        if (tags.length >= 6) {
            setMassage('You can add up to 6 tags only.');
            return;
        }

        if (tags.includes(newTag)) {
            setMassage('This tag already exists.');
            return;
        }

        setTags([...tags, newTag]);
        setTagInput('');
        setMassage('');
    };

    // Remove tag
    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    // Submit handler
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const date = data.get('date') ? new Date(data.get('date') as string) : null;
        const title = data.get('title') as string;
        const content = data.get('content') as string;
        const clarity = Number(data.get('clarity'));

        // VALIDATIONS
        if (!title || !content) {
            setMassage('Please fill in all required fields.');
            return;
        }


        const newDream: Dream = {
            title,
            content,
            date: date || new Date(),
            clarity,
            mood: activeMood,
            tags,      // optional
        };

        const result = await createDream(newDream);
        console.log(result);

        if (result) {
            setMassage('Your dream has been added successfully ✨');
            setDreams(prevDreams => [result, ...prevDreams]);
            setTimeout(() => handleCloseForm(), 600);
        }
    };

    return (
        <div className={`${style.addDreamForm} ${isClosing ? style.fadeOutAnimation : ''}`}>
            <button className='buttonClose' onClick={handleCloseForm}>×</button>
            <h2 className={style.title}>✨ Add New Dream</h2>

            <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className={style.formGroup}>
                    <label className={style.label}>Dream Title</label>
                    <input
                        name='title'
                        type="text"
                        className={style.input}
                        placeholder="Enter a title for your dream..."
                    />
                </div>

                {/* Content */}
                <div className={style.formGroup}>
                    <label className={style.label}>Dream Content</label>
                    <textarea
                        name='content'
                        className={style.textarea}
                        placeholder="Describe your dream in detail..."
                        rows={4}
                    />
                </div>

                {/* Date */}
                <div className={style.formGroup}>
                    <label className={style.label}>Dream Date</label>
                    <input
                        name='date'
                        type="date"
                        className={style.input}
                        placeholder={new Date().toISOString().split('T')[0]}
                    />
                </div>

                {/* Clarity */}
                <div className={style.formGroup}>
                    <label className={style.label}>Choose Clarity Level</label>
                    <input
                        name='clarity'
                        type="range"
                        className={style.slider}
                        min="1"
                        max="5"
                        step="1"
                    />
                </div>

                {/* Mood */}
                <div className={style.formGroup}>
                    <label className={style.label}>Mood</label>
                    <div className={style.moodSelector}>
                        {moods.map((mood) => (
                            <button
                                key={mood}
                                type="button"
                                className={`${style.moodButton} ${activeMood === mood ? style.moodButtonActive : ''}`}
                                onClick={() => setActiveMood(mood)}
                            >
                                {mood}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags (optional) */}
                <div className={style.formGroup}>
                    <label className={style.label}>Tags (Optional)</label>

                    <div className={style.tagsContainer}>
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className={style.tagItem}
                                onClick={() => removeTag(tag)}
                            >
                                {tag} ✕
                            </span>
                        ))}
                    </div>

                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        className={style.tagsInput}
                        placeholder="Type a tag and press Enter..."
                    />
                </div>

                {/* Message */}
                {massage && <div className={style.massage}>{massage}</div>}

                {/* Buttons */}
                <div className={style.buttonGroup}>
                    <button type="submit" className='buttonYellow'>Add Dream</button>
                    <button type="button" className='buttonGeneral' onClick={handleCloseForm}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddDreamForm;
