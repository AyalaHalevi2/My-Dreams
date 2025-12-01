import styles from './ThemeToggle.module.scss';

import { ThemeContext } from '../../../model/theme/ThemeProvider';
import { useContext } from 'react';
const ThemeToggle = () => {
//iport context or state to manage theme
  const { theme, handleToggleTheme } = useContext(ThemeContext); // Example state
  return (
    <button
      className={`${styles.container} ${theme==='dark'?styles.dark : ''}`}
      onClick={handleToggleTheme}
      aria-label="Toggle theme"
    >
      <div className={styles.slider}>
        
      </div>
    </button>
  );
}

export default ThemeToggle
