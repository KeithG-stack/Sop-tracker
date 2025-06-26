'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SettingsPage() {
  const router = useRouter();

  // Example: Clear localStorage and redirect to login
  const handleLogout = () => {
    // Remove any auth tokens or user info here
    localStorage.removeItem('user'); // If you store user info
    localStorage.removeItem('token'); // If you store a token
    // Optionally clear cookies if you use them
    // document.cookie = 'token=; Max-Age=0; path=/;';

    router.push('/login');
  };

  useEffect(() => {
    // Optionally, check if user is logged in and redirect if not
    // const user = localStorage.getItem('user');
    // if (!user) router.push('/login');
  }, [router]);

  return (
    <div style={{
      maxWidth: 500,
      margin: '60px auto',
      padding: 32,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(60,72,88,0.10)'
    }}>
      <h1 style={{ color: '#1a237e', marginBottom: 32 }}>Settings</h1>
      <button
        onClick={() => router.push('/home')}
        style={{
          background: 'none',
          color: '#1a237e',
          border: '1px solid #1a237e',
          borderRadius: 8,
          padding: '8px 20px',
          fontSize: '1rem',
          fontWeight: 500,
          cursor: 'pointer',
          marginBottom: 24
        }}
      >
        ← Back to Home
      </button>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 12 }}>Account</h2>
        <button
          onClick={handleLogout}
          style={{
            background: '#1a237e',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 28px',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(60,72,88,0.10)'
          }}
        >
          Log Out
        </button>
      </div>
      <div>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 12 }}>Preferences</h2>
        <p style={{ color: '#888' }}>More settings coming soon...</p>
      </div>
    </div>
  );
}