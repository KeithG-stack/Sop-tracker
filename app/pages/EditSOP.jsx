'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SOPForm from '../../components/SOPForm';

const EditSOP = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [sop, setSop] = useState(null);

  useEffect(() => {
    // Fetch SOP data from localStorage
    const sops = JSON.parse(localStorage.getItem('sops') || '[]');
    const foundSop = sops.find(s => String(s.id) === String(id));
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
      const index = sops.findIndex(s => String(s.id) === String(id));
      sops[index] = updatedSOP;
      localStorage.setItem('sops', JSON.stringify(sops));
      
      router.push('/Home');
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