import styles from './UserInfoHoverSection.module.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout as apiLogout } from '../../../functions/FetchFuncitons';
import { handleLogout } from '../../../redux/slices/AuthSlice';
//import Modal from '../../modal/Modal';
//import UserInfo from './UserInfo';

export default function UserInfoHoverSection() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className={styles.container}

    >
      <button
        className={styles.userIcon}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="menu" onMouseLeave={() => setIsOpen(false)}
        >
          <div className={styles.header}>user info</div>
          <button className={styles.menuItem} onClick={() => console.log('user info')}>
            user info
          </button>
          <Link to='/favorites'>
            <button className={styles.menuItem} onClick={() => console.log('favorites')}>
              favorites
            </button>
          </Link>

          <button
            className={`${styles.menuItem} ${styles.logout}`}
            onClick={async () => {
              try {
                await apiLogout();
              } catch (e) {
                console.error('Logout api error', e);
              }
              dispatch(handleLogout());
              navigate('/login');
            }}
          >
            logout
          </button>
        </div>
      )}
      {/* <Modal>
        <UserInfo/>
      </Modal> */}
    </div>
  );
}
