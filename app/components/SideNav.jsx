'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SideNav.module.css';

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidenav}>
      <ul>
        <li className={pathname === '/home' ? styles.active : ''}>
          <Link href="/home">🏠 Home</Link>
        </li>
        <li className={pathname === '/tasks' ? styles.active : ''}>
          <Link href="/tasks">📝 Tasks</Link>
        </li>
        <li className={pathname === '/calendar' ? styles.active : ''}>
          <Link href="/calendar">📅 Calendar</Link>
        </li>
        <li className={pathname === '/settings' ? styles.active : ''}>
          <Link href="/settings">⚙️ Settings</Link>
        </li>
      </ul>
    </nav>
  );
}