import Link from 'next/link';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            SOP Management System
          </h1>
          <p className={styles.subtitle}>
            Streamline your Standard Operating Procedure creation, editing, and tracking with our user-friendly platform.
          </p>
          <Link href="/login" className={styles.ctaButton}>
            Get Started
          </Link>
        </div>
        <div className={styles.heroImage}>
          <img src="/favicon.ico" alt="SOP Management" width={120} height={120} />
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.features}>
          <div className={styles.feature}>
            <h2>📄 SOP Management</h2>
            <p>
              Create, edit, and version control your SOPs with ease using structured web forms.
            </p>
          </div>
          <div className={styles.feature}>
            <h2>🛡️ Secure Authentication</h2>
            <p>
              Ensure secure access with user registration, login, and custom admin authentication.
            </p>
          </div>
          <div className={styles.feature}>
            <h2>📊 Admin Dashboard</h2>
            <p>
              Gain full control over SOP management, user roles, and real-time tracking of SOP views and edits.
            </p>
          </div>
          <div className={styles.feature}>
            <h2>🗓️ Calendar & Tasks</h2>
            <p>
              Organize your workflow with integrated calendar and task management.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} SOP Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}