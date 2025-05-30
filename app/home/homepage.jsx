// app/home/page.js
import styles from './Homepage.module.css';
import Link from 'next/link';

export default function UserHome() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome, [User Name]!</h1>
        <p className={styles.description}>
          Access and manage your Standard Operating Procedures (SOPs) with ease.
        </p>
        <div className={styles.actions}>
          <Link href="/sops/create" className={styles.button}>
            Create New SOP
          </Link>
          <Link href="/sops" className={styles.button}>
            View All SOPs
          </Link>
        </div>
        <div className={styles.recentSOPs}>
          <h2>Recent SOPs</h2>
          <ul>
            <li><Link href="/sops/1">SOP 1</Link></li>
            <li><Link href="/sops/2">SOP 2</Link></li>
            <li><Link href="/sops/3">SOP 3</Link></li>
          </ul>
        </div>
      </main>
    </div>
  );
}