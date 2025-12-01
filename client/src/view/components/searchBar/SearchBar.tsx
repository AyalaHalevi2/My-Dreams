import styles from './SearchBar.module.scss';
import { useState } from 'react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={styles.container}>

      <input
        type="text"
        className={styles.input}
        placeholder="Search your dreams..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.searchIcon}><svg  width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <circle cx="8" cy="8" r="6" strokeWidth="2" />
        <path d="M13 13l5 5" strokeWidth="2" />
      </svg></div>


    </div>
  );
}
