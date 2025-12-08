import { useState } from 'react';
import styles from './Auth.module.scss'
import { Link } from 'react-router';
import { PATH } from '../../../model/Types';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../../../redux/slices/AuthSlice';
const Register = () => {
  const [message, setMessage] = useState<string>('');
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);

  async function fetchRegister(name: string, email: string, password: string) {
    try {

      const response = await fetch(`${PATH}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      console.log('🍪 Register response headers:', response.headers);
      console.log('🍪 Cookies after register:', document.cookie);

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Registration failed');

        throw new Error(data.message || 'Registration failed');
      }
      setMessage('Registration successful');

      console.log('🍪 Cookies after successful register:', document.cookie);
      return true;

    } catch (error) {
      console.error(error);
      return false;
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email')?.toString();
      const password = formData.get('password')?.toString();
      const name = formData.get('name')?.toString();

      if (!email || !password || !name) {
        setMessage('Email, password, and name are required');

        throw new Error("email, password, or name missing");
      }
      const success = await fetchRegister(name, email, password);

      if (!success) {
        return;
      }

      setTimeout(() => {
        dispatch(handleLogin());
      }, 600);

    } catch (error: any) {
      console.error(`Error in handle submit in register: ${error.message}`);
    }
  };

  return (
    <div className={styles.container} data-theme={theme === 'dark' ? 'dark' : 'light'}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Sign up to get started</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"

              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>
            Sign up
          </button>
        </form>
        <p className={`${styles.message}`}>{message}</p>
        <div className={styles.link}>
          Already have an account? <Link to="/login" className={styles.linkTo}>Login here</Link>
        </div>
      </div>
    </div>

  )
}

export default Register

