// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [sops, setSOPs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSOPs = JSON.parse(localStorage.getItem('sops') || '[]');
    setSOPs(storedSOPs);
  }, []);

  const deleteSOP = (id) => {
    if (window.confirm('Are you sure you want to delete this SOP?')) {
      const updatedSOPs = sops.filter(sop => sop.id !== id);
      setSOPs(updatedSOPs);
      localStorage.setItem('sops', JSON.stringify(updatedSOPs));
    }
  };

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>SOP Management System</h1>
        <Link to="/create-sop" className="btn-primary">
          Create New SOP
        </Link>
      </div>

      <div className="sop-grid">
        {sops.length === 0 ? (
          <div className="empty-state">
            <p>No SOPs created yet.</p>
            <Link to="/create-sop">Create your first SOP</Link>
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
                <p><strong>Category:</strong> {sop.category}</p>
                <p><strong>Department:</strong> {sop.department}</p>
                <p><strong>Version:</strong> {sop.version}</p>
                <p><strong>Last Updated:</strong> {new Date(sop.updatedAt).toLocaleDateString()}</p>
              </div>
              <div className="sop-card-actions">
                <button 
                  onClick={() => navigate(`/sop/${sop.id}`)}
                  className="btn-view"
                >
                  View
                </button>
                <button 
                  onClick={() => navigate(`/edit-sop/${sop.id}`)}
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
  );
};

export default Home;