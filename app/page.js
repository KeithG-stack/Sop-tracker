
import Link from 'next/link';
import styles from './Home.module.css';
import Head from 'next/head';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SOP Management System</title>
        <meta name="description" content="Streamline SOP creation, editing, and tracking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to SOP Management System</h1>
        
        <p className={styles.description}>
          Streamline your Standard Operating Procedure (SOP) creation, editing, and tracking with our user-friendly system.
        </p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <h2>SOP Management</h2>
            <p>Create, edit, and version control your SOPs with ease using structured web forms.</p>
          </div>

          <div className={styles.feature}>
            <h2>Admin Dashboard</h2>
            <p>Gain full control over SOP management, user roles, and real-time tracking of SOP views and edits.</p>
          </div>

          <div className={styles.feature}>
            <h2>Secure Authentication</h2>
            <p>Ensure secure access to the system with user registration, login, and custom admin authentication.</p>
          </div>
        </div>

        <div className={styles.cta}>
          <Link href="/login">Get Started</Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 SOP Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}