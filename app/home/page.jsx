'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './Home.css'; // Adjust path if needed
import SideNav from '../components/SideNav';

export default function Home() {
  const [sops, setSOPs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch SOPs from the API
    const fetchSOPs = async () => {
      try {
        const res = await fetch('/api/sops');
        if (!res.ok) throw new Error('Failed to fetch SOPs');
        const data = await res.json();
        setSOPs(data);
      } catch (err) {
        setSOPs([]);
      }
    };
    fetchSOPs();
  }, []);

  // If you want to delete from the database, use the API:
  const deleteSOP = async (id) => {
    if (window.confirm('Are you sure you want to delete this SOP?')) {
      try {
        const res = await fetch(`/api/sops/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete SOP');
        setSOPs(sops.filter(sop => sop.id !== id));
      } catch (err) {
        alert('Failed to delete SOP.');
      }
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideNav />
      <div style={{ marginLeft: 180, width: '100%' }}>
        <div className="home-page">
          <div className="page-header">
            <h1>SOP Management System</h1>
            <Link href="/create-sop" className="btn-primary">
              Create New SOP
            </Link>
          </div>

          <div className="sop-grid">
            {sops.length === 0 ? (
              <div className="empty-state">
                <p>No SOPs created yet.</p>
                <Link href="/create-sop">Create your first SOP</Link>
              </div>
            ) : (
              sops.map(sop => (
                <div key={sop.id} className="sop-card">
                  <div className="sop-card-header">
                    <h3>{sop.title}</h3>
                    <span className={`status-badge ${sop.status}`}>
                      {sop.status}
                    </span>
                  </div>
                  <div className="sop-card-body">
                    <p><strong>Category:</strong> {sop.category?.name}</p>
                    <p><strong>Version:</strong> {sop.version}</p>
                    <p><strong>Last Updated:</strong> {new Date(sop.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="sop-card-actions">
                    <button 
                      onClick={() => router.push(`/sop/${sop.id}`)}
                      className="btn-view"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => router.push(`/edit-sop/${sop.id}`)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteSOP(sop.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}