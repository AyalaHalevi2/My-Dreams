import { useContext, useState } from 'react';
import styles from './Auth.module.scss'
import { Link } from 'react-router';
import { PATH } from '../home/Home';
import { LoginContext } from '../../model/isLoggedin/LoginProvider';

const Login = () => {
  const [message, setMessage] = useState<string>('');
  const [isOK, setIsOK] = useState<"red" | "grey" | "">("");
  const { handleLogin } = useContext(LoginContext)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email')?.toString();
      const password = formData.get('password')?.toString();

      if (!email || !password) {
        setMessage('Email or password are required');
        setIsOK("red");
        throw new Error("email or password missing");
      }

      const response = await fetch(`${PATH}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Login failed');
        setIsOK("red");
        return;
      }

      setMessage('Login successful');
      setIsOK("");
      setTimeout(() => {

        console.log('log');

        handleLogin()
     }, 1500);


    } catch (error: any) {
      console.error(`Error in handle submit in login: ${error.message}`);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Enter your credentials to access your account</p>

        <form onSubmit={handleSubmit} className={styles.form}>
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
            Sign In
          </button>
        </form>
        <p className={`${styles.message} ${isOK}`}>{message}</p>
        <div className={styles.link}>
          Don't have an account? <Link to="/register" className={styles.linkTo}>Register here</Link>
        </div>
      </div>
    </div>
  )
}

// const [formData, setFormData] = useState({
//   email: '',
//   password: ''
// });

// const handleInputChange = (e) => {
//   setFormData({
//     ...formData,
//     [e.target.name]: e.target.value
//   });
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log('Login:', formData);
//   // Add your login logic here
// };


export default Login;
