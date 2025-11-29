import styles from './UserInfoHoverSection.module.scss';
import { useState } from 'react';

export default function UserInfoHoverSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className={styles.userIcon}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>user info</div>
          <button className={styles.menuItem}>user info</button>
          <button className={styles.menuItem}>favorites</button>
          <button className={styles.menuItem}>logout</button>
        </div>
      )}
    </div>
  );
}
