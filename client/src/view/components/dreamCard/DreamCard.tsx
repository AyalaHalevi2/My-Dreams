import { useState } from 'react';
import { fetchDeleteDream, fetchFavoriteDreams, fetchToggleFavorite } from '../../../functions/FetchFuncitons';
import type { Dream } from '../../../model/Types';
import styles from './DreamCard.module.scss';
import EditDreamForm from '../editForm/EditForm';
import Modal from '../../modal/Modal';
import { useLocation } from 'react-router';


interface DreamCardProps {
  dream: Dream;
  dreams: Dream[];
  setDreams: React.Dispatch<React.SetStateAction<Dream[]>>;

}

const DreamCard = ({ dream, dreams, setDreams }: DreamCardProps) => {
  const [isFavorite, setIsFavorite] = useState(dream.isFavorite)
  const [isOpenEditForm, setIsOpenEditForm] = useState(false)
  const location = useLocation()
  const getClarityDescription = (value: number) => {
    switch (value) {
      case 1: return "Very Blurry & Faded Dream";
      case 2: return "Blurry & Unfocused Dream";
      case 3: return "Slightly Blurry but Recognizable Dream";
      case 4: return "Clear & Well-Defined Dream";
      case 5: return "Vivid, Sharp & Highly Detailed Dream";
      default: return "Unknown clarity Dream";
    }
  };


  const toggleFavorite = async () => {
    try {
      if (!dream._id) throw new Error("no _id provided");
      await fetchToggleFavorite(dream._id);
      setIsFavorite(!isFavorite);
      if (location.pathname === '/favorites') {
        const favDreams = await fetchFavoriteDreams();
        setDreams(favDreams);
      }

    } catch (error) {
      console.error(`error in toggling favorite in dream: ${dream._id}=>${error}`);
    }
  }


  const deleteDream = () => {

    try {
      console.log(dream);
      if (!dream._id) throw new Error("no _id provided");
      fetchDeleteDream(dream._id);
      setDreams(dreams.filter((d) => d._id !== dream._id));
    } catch (error) {
      console.error(`error in delete dream: ${dream._id}=>${error}`);

    }
  }


  return (
    <div className={styles.card}>

      {/* Top Bar: Title + Actions */}
      <div className={styles.topBar}>
        <h2 className={styles.title}>{dream.title}</h2>

        <div className={styles.actionGroup}>
          {dream.mood && (
            <span className={`${styles.favoriteToggle} ${styles.moodPill}`}>{dream.mood}</span>
          )}


          <button
            className={`${styles.favoriteToggle} ${isFavorite ? styles.active : ""}`}
            onClick={toggleFavorite}
          >
            {/* האייקון שלך - הוא ישתנה אוטומטית כשה-className יתווסף */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              // הגדרת ה-className היא חשובה כדי שה-SCSS יחיל את העיצוב
              className={styles.favoriteIcon}
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"
              />
            </svg>
          </button>

        </div>
      </div>

      {/* Content */}
      {dream.content && <p className={styles.content}>{dream.content}</p>}

      {/* Tags */}
      {dream.tags && (
        <div className={styles.tagsRow}>
          dream tags:
          {dream.tags.map((tag, i) => (
            <span key={i} className={styles.tagPill}>{tag}</span>
          ))}
        </div>
      )}
      <div className={styles.lastRow}>
        {/* Mood + Clarity Row */}
        {(dream.clarity) && (
          <div className={styles.attributesRow}>

            {dream.clarity && (
              <span className={styles.clarityText}>
                {getClarityDescription(dream.clarity)}
              </span>
            )}
          </div>

        )}
        <div className={styles.btns}>
          <button className='buttonYellow' onClick={(() => setIsOpenEditForm(true))}>edit</button>
          <button className='buttonGeneral' onClick={deleteDream}>delete</button>
        </div>
      </div>
      {isOpenEditForm && (
        <Modal>
          <EditDreamForm setDreams={setDreams} dream={dream} isOpenEditForm={isOpenEditForm} setIsOpenEditForm={setIsOpenEditForm} />
        </Modal>
      )}
    </div>
  )
}

export default DreamCard
