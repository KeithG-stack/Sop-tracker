// app/login/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';
import Link from 'next/link';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {

    // Prevent the default form submission behavior
    // This is important to handle the form submission with JavaScript
    e.preventDefault();

    try {
      
      // Make an API call to your backend for user authentication
      console.log('Attempting to log in with:', { email, password });
      console.log('Attempting to log in with:', e);
      // Replace with your actual API endpoint

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Authentication successful, redirect to the authenticated home page
        router.push('/Home');
      } else {
        // Authentication failed, handle the error
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <p className={styles.signupLink}>
        Don't have an account? <Link href="/signup">Sign Up</Link> 
      </p>
    </div>
  );
}