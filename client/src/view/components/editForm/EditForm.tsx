import { moods, type Dream, type Mood } from '../../../model/Types';
import style from './EditForm.module.scss';
import { useState } from 'react';
import { fetchUpdateDream } from '../../../functions/FetchFuncitons';

interface EditDreamFormProps {
    dream: Dream;
    setDreams: React.Dispatch<React.SetStateAction<Dream[]>>;
    isOpenEditForm:boolean
    setIsOpenEditForm: React.Dispatch<React.SetStateAction<boolean>>;

}

const EditDreamForm = ({ dream, setDreams, isOpenEditForm, setIsOpenEditForm }: EditDreamFormProps) => {
console.log(isOpenEditForm);
    const [activeMood, setActiveMood] = useState<Mood | undefined>(dream.mood);
    const [isClosing, setIsClosing] = useState(false);
    const [massage, setMassage] = useState<string>('');
    const [clarity, setClarity] = useState<number>(dream.clarity);

    // --- Tags State
    const [tags, setTags] = useState<string[]>(dream.tags || []);
    const [tagInput, setTagInput] = useState('');

    // Close animation
    const handleCloseForm = () => {
        setIsClosing(true);
        setTimeout(() => setIsOpenEditForm(false), 300);
    };

    // --- Add Tag on Enter
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

        // VALIDATIONS
        if (!title || !content) {
            setMassage('Please fill in all required fields.');
            return;
        }

        const updatedDream: Dream = {
            ...dream,
            title,
            content,
            date: date || dream.date,
            clarity,
            mood: activeMood,
            tags,
            updatedAt: new Date(),
        };

        try {
            if(!dream._id)throw new Error("dream id not provided");

            const result = await fetchUpdateDream(dream._id,updatedDream);

            if (!result.success)throw new Error("falied to update dream")
                setMassage('Your dream has been updated successfully ✨');
                setDreams(prevDreams =>
                    prevDreams.map(d =>
                        d.createdAt === dream.createdAt ? result.dream : d
                    )
                );
                setTimeout(() => handleCloseForm(), 600);

        } catch (error: any) {
            console.error('Error updating dream:', error.message || error);
            setMassage('Failed to update dream. Please try again.');
        }
    };

    // Format date for input
    const formatDateForInput = (date: Date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className={`${style.editDreamForm} ${isClosing ? style.fadeOutAnimation : ''}`}>
            <button className='buttonClose' onClick={handleCloseForm}>×</button>
            <h2 className={style.title}>✏️ Edit Dream</h2>

            <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className={style.formGroup}>
                    <label className={style.label}>Dream Title</label>
                    <input
                        name='title'
                        type="text"
                        className={style.input}
                        placeholder="Enter a title for your dream..."
                        defaultValue={dream.title}
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
                        defaultValue={dream.content}
                    />
                </div>

                {/* Date */}
                <div className={style.formGroup}>
                    <label className={style.label}>Dream Date</label>
                    <input
                        name='date'
                        type="date"
                        className={style.input}
                        defaultValue={formatDateForInput(dream.date)}
                    />
                </div>

                {/* Clarity */}
                <div className={style.formGroup}>
                    <label className={style.label}>Choose Clarity Level: {clarity}</label>
                    <input
                        name='clarity'
                        type="range"
                        className={style.slider}
                        min="1"
                        max="5"
                        step="1"
                        value={clarity}
                        onChange={(e) => setClarity(Number(e.target.value))}
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

                {/* Tags */}
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
                    <button type="submit" className='buttonYellow'>Update Dream</button>
                    <button type="button" className='buttonGeneral' onClick={handleCloseForm}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditDreamForm;
