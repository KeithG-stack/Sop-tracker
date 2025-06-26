'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';


export default function ViewSOPPage({ params }) {
  const { id } = use (params);
  const [sop, setSop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSOP() {
      try {
        const res = await fetch(`/api/sops/${id}`);
        if (!res.ok) throw new Error('Failed to fetch SOP');
        const data = await res.json();
        setSop(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSOP();
  }, [id]);

  if (loading) return <div style={{ padding: 32 }}>Loading...</div>;
  if (error) return <div style={{ padding: 32, color: 'red' }}>Error: {error}</div>;
  if (!sop) return <div style={{ padding: 32 }}>SOP not found.</div>;

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(60,72,88,0.10)', padding: 32 }}>
      <button onClick={() => router.back()} style={{ marginBottom: 24, background: 'none', border: '1px solid #1a237e', color: '#1a237e', borderRadius: 8, padding: '8px 20px', cursor: 'pointer' }}>← Back</button>
      <h1 style={{ color: '#1a237e', marginBottom: 16 }}>{sop.title}</h1>
      <div style={{ marginBottom: 16 }}>
        <span style={{ background: '#e3e8fa', color: '#1a237e', borderRadius: 6, padding: '4px 12px', marginRight: 12 }}>{sop.status}</span>
        <span style={{ color: '#888' }}>Version: {sop.version}</span>
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Category:</strong> {sop.category?.name || sop.categoryId}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Author:</strong> {sop.author?.name || sop.authorId}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Last Updated:</strong> {new Date(sop.updatedAt).toLocaleString()}
      </div>
      <div style={{ marginBottom: 24 }}>
        <strong>Content:</strong>
        <div style={{ background: '#f5f5f5', borderRadius: 8, padding: 16, marginTop: 8, whiteSpace: 'pre-wrap' }}>{sop.content}</div>
      </div>
      {/* Add more SOP fields as needed */}
    </div>
  );
}
