import styles from './DreamCard.module.css';
interface DreamCardProps {
  dream: {
    id: number;
    title: string;
    content: string;
    date: string;
    mood: string;
    clarity: number;
  };
}

const DreamCard = ({ dream }: DreamCardProps) => {
  return (

    <div className={styles.dreamCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.dreamTitle}>{dream.title}</h3>
        <button className={styles.favoriteBtn}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
        </button>
      </div>

      <p className={styles.dreamContent}>{dream.content}</p>

      <div className={styles.dreamMeta}>
        <span className={styles.dreamDate}>{dream.date}</span>
        <span className={styles.moodBadge}>
          {dream.mood}
        </span>
        <div className={styles.clarityRating}>
          <span className={styles.clarityLabel}>Clarity:</span>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill={i < dream.clarity ? "currentColor" : "none"}
                className={i < dream.clarity ? styles.starFilled : styles.starEmpty}
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}

export default DreamCard
