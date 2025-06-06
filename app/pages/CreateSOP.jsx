'use client';

import React from 'react';
import SOPForm from '../components/SOPForm';
import { useRouter } from 'next/navigation';

const CreateSOP = () => {
  const router = useRouter();

  const handleCreateSOP = async (sopData) => {
    try {
      // For now, save to localStorage or your backend
      const existingSOPs = JSON.parse(localStorage.getItem('sops') || '[]');
      existingSOPs.push(sopData);
      localStorage.setItem('sops', JSON.stringify(existingSOPs));
      
      // Navigate back to home
      router.push('/Home');
    } catch (error) {
      console.error('Error creating SOP:', error);
    }
  };

  return (
    <div className="create-sop-page">
      <h1>Create New SOP</h1>
      <SOPForm onSubmit={handleCreateSOP} />
    </div>
  );
};

export default CreateSOP;