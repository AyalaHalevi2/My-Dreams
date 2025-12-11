import AddDream from '../addDream/AddDream';
import { Link } from 'react-router';
import SearchBar from '../searchBar/SearchBar';
import ThemeToggle from '../themeToggle/ThemeToggle';
import UserInfoHoverSection from '../userInfo/UserInfoHoverSection';
import styles from './Header.module.scss';


const Header = () => {

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <header className={styles.container}>

      <Link to="/" className={styles.logo} onClick={handleScrollToTop}>DREAMER</Link>
 <div className={styles.searchBar}><SearchBar /></div>
      <div className={styles.actions}>
        <Link to='/favorites'>  <button className={styles.favoritesBtn}>
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
</svg>
        </button></Link>


        <AddDream />

        <UserInfoHoverSection />

        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header
