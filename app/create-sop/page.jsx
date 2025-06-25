'use client';

import React from 'react';
import SOPFormUser from '../components/SOPFormUser';
import { useRouter } from 'next/navigation';
import '../components/SOPForm.css'; 

export default function CreateSOP() {
  const router = useRouter();

  // Hardcoded for testing; replace with real user ID and categories in production
  const currentUserId = 1;
  const categoriesArray = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Safety' }
  ];

  const handleCreateSOP = async (sopData) => {
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
      <SOPFormUser onSubmit={handleCreateSOP} authorId={currentUserId} categories={categoriesArray} />
    </div>
  );
}