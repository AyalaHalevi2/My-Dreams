import { moods, PATH, type Dream, type Mood } from '../../../model/Types';
import style from './AddDream.module.scss';
import { useState } from 'react';
const AddDreamForm = () => {
    const [activeMoods, setActiveMoods] =  useState<Mood[]>([]);

    async function createDream(dream: Dream) {
        try {
            const response = await fetch(`${PATH}/api/dreams`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(dream)
            });
            const data = await response.json();

        } catch (error: any) {
            console.error('Error creating dream:', error.message || error);
            return null;
        }
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const title = data.get('title') as string;
        const content = data.get('content') as string;
        const clarity = Number(data.get('clarity'));
        const mood = data.get('mood') as string;
        const tags = (data.get('tags') as string).split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        const newDream: Dream = {
            title,
            content,
            date: new Date(),
            clarity,
            mood: mood as Mood,
            tags,
            isFavorite: data.get('isFavorite') === 'on',
        }
    }
    return (
        <div className={style.addDreamForm}>
            <h2 className={style.title}>✨ Add New Dream</h2>

            <form onSubmit={handleSubmit}>
                <div className={style.formGroup}>
                    <label className={style.label}>Dream Title</label>
                    <input
                        type="text"
                        className={style.input}
                        placeholder="Enter a title for your dream..."

                    />
                </div>

                <div className={style.formGroup}>
                    <label className={style.label}>Dream Content</label>
                    <textarea
                        className={style.textarea}
                        placeholder="Describe your dream in detail..."
                        rows={6}
                    />
                </div>

                <div className={style.formGroup}>
                    <label className={style.label}>
                        Choose Clarity Level
                    </label>
                    <input
                        type="range"
                        className={style.slider}
                        min="1"
                        max="5"
                        step="1"
                    />
                </div>

                <div className={style.formGroup}>
                    <label className={style.label}>Mood</label>
                    <div className={style.moodSelector}>
                        {moods.map((mood) => (
                            <button
                                key={mood}
                                type="button"
                                className={`${style.moodButton} ${activeMoods.includes(mood) ? style.moodButtonActive : ''}`}
                            >
                                {mood}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={style.formGroup}>
                    <label className={style.label}>Tags</label>
                    <input
                        type="text"
                        className={style.tagsInput}
                        placeholder="Type a tag and press Enter..."
                    />


                </div>

                <div className={style.formGroup}>
                    <label className={style.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={style.checkbox}
                        />
                        Mark as Favorite ⭐
                    </label>
                </div>

                <button type="submit" className={style.submitButton}>
                    Add Dream
                </button>
            </form>
        </div>
    )
}

export default AddDreamForm
