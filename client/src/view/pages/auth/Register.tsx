import { useState } from 'react';
import styles from './Auth.module.scss'
import { Link, useNavigate } from 'react-router';
import { PATH } from '../home/Home';
const Register = () => {
  const [message, setMessage] = useState<string>('');
  const [isOK, setIsOK] = useState<"red" | "grey" | "">("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email')?.toString();
      const password = formData.get('password')?.toString();
      const name = formData.get('name')?.toString();

      if (!email || !password || !name) {
        setMessage('Email, password, and name are required');
        setIsOK("red");
        throw new Error("email, password, or name missing");
      }

      const response = await fetch(`${PATH}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Registration failed');
        setIsOK("red");
        return;
      }

      setMessage('Registration successful');
      setIsOK("");
      setTimeout(() => {

        navigate('/');
      }, 1500);


    } catch (error: any) {
      console.error(`Error in handle submit in login: ${error.message}`);
    }
  };
  return (
    <div className={styles.container}>
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
        <p className={`${styles.message} ${isOK}`}>{message}</p>
        <div className={styles.link}>
          Already have an account? <Link to="/login" className={styles.linkTo}>Login here</Link>
        </div>
      </div>
    </div>

  )
}

export default Register

