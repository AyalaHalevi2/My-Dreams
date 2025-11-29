import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
//iport context or state to manage theme
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
