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
    content: initialData?.content || '',
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
    status: initialData?.status || 'draft',
    authorId: initialData?.authorId || '', 
    categoryId: initialData?.categoryId || '', 
  });

  const [currentStep, setCurrentStep] = useState('');
  const [currentDoc, setCurrentDoc] = useState({ name: '', link: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const addProcedureStep = () => {
    if (currentStep.trim()) {
      setFormData((prev) => ({
        ...prev,
        procedure: [
          ...prev.procedure,
          {
            stepNumber: prev.procedure.length + 1,
            description: currentStep.trim(),
            id: Date.now(),
          },
        ],
      }));
      setCurrentStep('');
    }
  };

  const removeProcedureStep = (id) => {
    setFormData((prev) => ({
      ...prev,
      procedure: prev.procedure
        .filter((step) => step.id !== id)
        .map((step, index) => ({ ...step, stepNumber: index + 1 })),
    }));
  };

  const addRelatedDocument = () => {
    if (currentDoc.name.trim() && currentDoc.link.trim()) {
      setFormData((prev) => ({
        ...prev,
        relatedDocuments: [...prev.relatedDocuments, { ...currentDoc, id: Date.now() }],
      }));
      setCurrentDoc({ name: '', link: '' });
    }
  };

  const removeRelatedDocument = (id) => {
    setFormData((prev) => ({
      ...prev,
      relatedDocuments: prev.relatedDocuments.filter((doc) => doc.id !== id),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required';
    if (!formData.scope.trim()) newErrors.scope = 'Scope is required';
    if (!formData.responsibilities.trim()) newErrors.responsibilities = 'Responsibilities are required';
    if (formData.procedure.length === 0) newErrors.procedure = 'At least one procedure step is required';
    if (formData.relatedDocuments.length === 0) newErrors.relatedDocuments = 'At least one related document is required';
    if (!formData.reviewFrequency.trim()) newErrors.reviewFrequency = 'Review frequency is required';
    if (!formData.effectiveDate.trim()) newErrors.effectiveDate = 'Effective date is required';
    if (!formData.version.trim()) newErrors.version = 'Version is required';
    if (!formData.status.trim()) newErrors.status = 'Status is required';
    if (!formData.authorId) newErrors.authorId = 'Author is required';
    if (!formData.categoryId) newErrors.categoryId = 'Category ID is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const submitData = {
        ...formData,
        createdAt: initialData ? initialData.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      if (onSubmit) await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sop-form">
      <h2>{initialData ? 'Edit SOP' : 'Create SOP'}</h2>

      <div className="form-group">
        <label>Title</label>
        <input name="title" value={formData.title} onChange={handleChange} required />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea name="content" value={formData.content} onChange={handleChange} required />
        {errors.content && <span className="error">{errors.content}</span>}
      </div>

      <div className="form-group">
        <label>Category</label>
        <input name="category" value={formData.category} onChange={handleChange} required />
        {errors.category && <span className="error">{errors.category}</span>}
      </div>

      <div className="form-group">
        <label>Department</label>
        <input name="department" value={formData.department} onChange={handleChange} required />
        {errors.department && <span className="error">{errors.department}</span>}
      </div>

      <div className="form-group">
        <label>Purpose</label>
        <input name="purpose" value={formData.purpose} onChange={handleChange} required />
        {errors.purpose && <span className="error">{errors.purpose}</span>}
      </div>

      <div className="form-group">
        <label>Scope</label>
        <input name="scope" value={formData.scope} onChange={handleChange} required />
        {errors.scope && <span className="error">{errors.scope}</span>}
      </div>

      <div className="form-group">
        <label>Responsibilities</label>
        <input name="responsibilities" value={formData.responsibilities} onChange={handleChange} required />
        {errors.responsibilities && <span className="error">{errors.responsibilities}</span>}
      </div>

      <div className="procedure-steps">
        <label>Procedure Steps:</label>
        <input
          type="text"
          value={currentStep}
          onChange={(e) => setCurrentStep(e.target.value)}
          placeholder="Add a step"
        />
        <button type="button" onClick={addProcedureStep}>Add Step</button>
        <div className="procedure-steps-list">
          {formData.procedure.map((step) => (
            <div key={step.id}>
              {step.stepNumber}. {step.description}
              <button type="button" onClick={() => removeProcedureStep(step.id)}>Remove</button>
            </div>
          ))}
        </div>
        {errors.procedure && <span className="error">{errors.procedure}</span>}
      </div>

      <div className="related-documents">
        <label>Related Documents:</label>
        <input
          type="text"
          placeholder="Document name"
          value={currentDoc.name}
          onChange={(e) => setCurrentDoc({ ...currentDoc, name: e.target.value })}
        />
        <input
          type="url"
          placeholder="Document link"
          value={currentDoc.link}
          onChange={(e) => setCurrentDoc({ ...currentDoc, link: e.target.value })}
        />
        <button type="button" onClick={addRelatedDocument}>Add Document</button>
        <div className="related-documents-list">
          {formData.relatedDocuments.map((doc) => (
            <div key={doc.id}>
              <a href={doc.link} target="_blank" rel="noopener noreferrer">{doc.name}</a>
              <button type="button" onClick={() => removeRelatedDocument(doc.id)}>Remove</button>
            </div>
          ))}
        </div>
        {errors.relatedDocuments && <span className="error">{errors.relatedDocuments}</span>}
      </div>

      <div className="form-group">
        <label>Review Frequency</label>
        <input name="reviewFrequency" value={formData.reviewFrequency} onChange={handleChange} required />
        {errors.reviewFrequency && <span className="error">{errors.reviewFrequency}</span>}
      </div>

      <div className="form-group">
        <label>Effective Date</label>
        <input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} required />
        {errors.effectiveDate && <span className="error">{errors.effectiveDate}</span>}
      </div>

      <div className="form-group">
        <label>Version</label>
        <input name="version" value={formData.version} onChange={handleChange} required />
        {errors.version && <span className="error">{errors.version}</span>}
      </div>

      <div className="form-group">
        <label>Status</label>
        <input name="status" value={formData.status} onChange={handleChange} required />
        {errors.status && <span className="error">{errors.status}</span>}
      </div>

      <div className="form-group">
        <label>Author ID</label>
        <input name="authorId" value={formData.authorId} onChange={handleChange} required />
        {errors.authorId && <span className="error">{errors.authorId}</span>}
      </div>

      <div className="form-group">
        <label>Category ID</label>
        <input name="categoryId" value={formData.categoryId} onChange={handleChange} required />
        {errors.categoryId && <span className="error">{errors.categoryId}</span>}
      </div>

      <div className="form-actions">
        <button type="button" onClick={() => router.back('./home')} className="btn-secondary">
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