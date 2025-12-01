import styles from './ThemeToggle.module.scss';
import { useState } from 'react';
const ThemeToggle = () => {
//iport context or state to manage theme
  const [isDark, setIsDark] = useState(false); // Example state
  return (
    <button
      className={`${styles.container} ${isDark ? styles.dark : ''}`}
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle theme"
    >
      <div className={styles.slider}></div>
    </button>
  );
}

export default ThemeToggle
