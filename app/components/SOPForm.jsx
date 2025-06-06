'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './SOPForm.css';

const SOPForm = ({ onSubmit, initialData = null }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || '',
    department: initialData?.department || '',
    purpose: initialData?.purpose || '',
    scope: initialData?.scope || '',
    responsibilities: initialData?.responsibilities || '',
    procedure: initialData?.procedure || [],
    relatedDocuments: initialData?.relatedDocuments || [],
    reviewFrequency: initialData?.reviewFrequency || 'quarterly',
    effectiveDate: initialData?.effectiveDate || new Date().toISOString().split('T')[0],
    version: initialData?.version || '1.0',
    status: initialData?.status || 'draft'
  });

  // Handle basic input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle procedure steps
  const [currentStep, setCurrentStep] = useState('');
  
  const addProcedureStep = () => {
    if (currentStep.trim()) {
      setFormData(prev => ({
        ...prev,
        procedure: [...prev.procedure, {
          stepNumber: prev.procedure.length + 1,
          description: currentStep.trim(),
          id: Date.now()
        }]
      }));
      setCurrentStep('');
    }
  };

  const removeProcedureStep = (id) => {
    setFormData(prev => ({
      ...prev,
      procedure: prev.procedure
        .filter(step => step.id !== id)
        .map((step, index) => ({ ...step, stepNumber: index + 1 }))
    }));
  };

  const reorderSteps = (fromIndex, toIndex) => {
    const newProcedure = [...formData.procedure];
    const [movedItem] = newProcedure.splice(fromIndex, 1);
    newProcedure.splice(toIndex, 0, movedItem);
    
    setFormData(prev => ({
      ...prev,
      procedure: newProcedure.map((step, index) => ({ ...step, stepNumber: index + 1 }))
    }));
  };

  // Handle related documents
  const [currentDoc, setCurrentDoc] = useState({ name: '', link: '' });
  
  const addRelatedDocument = () => {
    if (currentDoc.name.trim() && currentDoc.link.trim()) {
      setFormData(prev => ({
        ...prev,
        relatedDocuments: [...prev.relatedDocuments, { ...currentDoc, id: Date.now() }]
      }));
      setCurrentDoc({ name: '', link: '' });
    }
  };

  const removeRelatedDocument = (id) => {
    setFormData(prev => ({
      ...prev,
      relatedDocuments: prev.relatedDocuments.filter(doc => doc.id !== id)
    }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required';
    if (!formData.scope.trim()) newErrors.scope = 'Scope is required';
    if (formData.procedure.length === 0) newErrors.procedure = 'At least one procedure step is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    try {
      const submitData = {
        ...formData,
        createdAt: initialData ? initialData.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: initialData?.id || Date.now().toString()
      };
      
      await onSubmit(submitData);
      
      // Navigate back to home or SOP list after successful submission
      router.push('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error toast here
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sop-form">
      {/* ...rest of your form remains unchanged... */}
      {/* Replace navigate(-1) with router.back() for cancel button: */}
      <div className="form-actions">
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Saving...' : (initialData ? 'Update SOP' : 'Create SOP')}
        </button>
      </div>
    </form>
  );
};

export default SOPForm;