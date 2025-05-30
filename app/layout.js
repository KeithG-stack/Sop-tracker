import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/sops">SOPs</Link></li>
              <li><Link href="/admin">Admin Dashboard</Link></li>
              <li><Link href="/login">Login</Link></li>
              <div className="dashboard-image">
                <img src="/logo.png" alt="Logo" width={40} height={40} />
              </div>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}