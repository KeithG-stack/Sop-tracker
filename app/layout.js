// app/layout.js
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import './globals.css';
import Link from 'next/link';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><StackProvider app={stackServerApp}><StackTheme>
        <header className="header">
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/sops">SOPs</Link></li>
              <li><Link href="/admin">Admin Dashboard</Link></li>
              <li><Link href="/login">Login</Link></li>
            </ul>
          </nav>
        </header>

        {children}

       
      </StackTheme></StackProvider></body>
    </html>
  );
}