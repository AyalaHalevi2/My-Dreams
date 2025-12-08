import type { Dream } from '../../../model/Types';
import styles from './DreamCard.module.scss';
interface DreamCardProps {
  dream: Dream;
}

const DreamCard = ({ dream }: DreamCardProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{dream.title}</h2>
      <p className={styles.content}>{dream.content}</p>
      <div className={styles.meta}>
        <span className={styles.date}>{new Date(dream.date).toLocaleDateString()}</span>
        <span className={styles.clarity}>Clarity: {dream.clarity}</span>
        {dream.mood && <span className={styles.mood}>Mood: {dream.mood}</span>}
      </div>
    </div>
  )

}

export default DreamCard
