'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Signup.module.css';
import Link from 'next/link';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add this line
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(''); // Clear previous errors when submitting again

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    router.push('./pages/Home');
  } catch (error) {
    console.error('Error:', error);
    setError(error.message);
  }
};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      {error && <div className={styles.error}>{error}</div>} {/* Display error message */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          Sign Up
        </button>
      </form>
      <p className={styles.loginLink}>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}
