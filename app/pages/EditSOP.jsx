// src/pages/EditSOP.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SOPForm from '../components/SOPForm';

const EditSOP = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sop, setSop] = useState(null);

  useEffect(() => {
    // Fetch SOP data
    const sops = JSON.parse(localStorage.getItem('sops') || '[]');
    const foundSop = sops.find(s => s.id === id);
    setSop(foundSop);
  }, [id]);

  const handleUpdateSOP = async (sopData) => {
    try {
      // Update version number
      const newVersion = parseFloat(sopData.version) + 0.1;
      const updatedSOP = {
        ...sopData,
        version: newVersion.toFixed(1),
        previousVersions: [...(sop.previousVersions || []), {
          version: sop.version,
          updatedAt: sop.updatedAt,
          updatedBy: sop.updatedBy
        }]
      };

      // Update in storage
      const sops = JSON.parse(localStorage.getItem('sops') || '[]');
      const index = sops.findIndex(s => s.id === id);
      sops[index] = updatedSOP;
      localStorage.setItem('sops', JSON.stringify(sops));
      
      navigate('/');
    } catch (error) {
      console.error('Error updating SOP:', error);
    }
  };

  if (!sop) return <div>Loading...</div>;

  return (
    <div className="edit-sop-page">
      <h1>Edit SOP</h1>
      <SOPForm onSubmit={handleUpdateSOP} initialData={sop} />
    </div>
  );
};

export default EditSOP;