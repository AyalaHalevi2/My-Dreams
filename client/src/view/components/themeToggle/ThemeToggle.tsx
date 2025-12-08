import styles from './ThemeToggle.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../redux/slices/ThemeSlice';
import type { RootState } from '../../../redux/store';


const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  
  return (
    <button
      className={`${styles.container} ${theme === 'dark' ? styles.dark : ''}`}
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      <div className={styles.slider}>

      </div>
    </button>
  );
}

export default ThemeToggle
