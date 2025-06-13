'use client';

import React from 'react';
import SOPForm from '../components/SOPForm';
import { useRouter } from 'next/navigation';
import '../components/SOPForm.css'; 

export default function CreateSOP() {
  const router = useRouter();

  // Remove the default value for sopData!
  const handleCreateSOP = async (sopData) => {
  sopData.authorId = 1;      // Replace 1 with a real user ID from your database
  sopData.categoryId = 1;    // Replace 1 with a real category ID from your database
  try {
    const response = await fetch('/api/sops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sopData),
    });
    if (!response.ok) throw new Error('Failed to create SOP');
    router.push('/home');
  } catch (error) {
    console.error('Error creating SOP:', error);
    alert('Error creating SOP. Please try again.');
  }
};
  return (
    <div className="create-sop-page">
      <h1>Create New SOP</h1>
      <SOPForm onSubmit={handleCreateSOP} />
    </div>
  );
}