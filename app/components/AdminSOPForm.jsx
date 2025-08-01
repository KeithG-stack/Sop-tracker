'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../components/SOPForm.css';

const AdminSOPForm = ({ onSubmit, initialData = null }) => {
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
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className={errors.content ? 'error' : ''}
        />
        {errors.content && <span className="error-message">{errors.content}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={errors.category ? 'error' : ''}
        />
        {errors.category && <span className="error-message">{errors.category}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="department">Department</label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={errors.department ? 'error' : ''}
        />
        {errors.department && <span className="error-message">{errors.department}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="purpose">Purpose</label>
        <input
          type="text"
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          className={errors.purpose ? 'error' : ''}
        />
        {errors.purpose && <span className="error-message">{errors.purpose}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="scope">Scope</label>
        <input
          type="text"
          id="scope"
          name="scope"
          value={formData.scope}
          onChange={handleChange}
          className={errors.scope ? 'error' : ''}
        />
        {errors.scope && <span className="error-message">{errors.scope}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="responsibilities">Responsibilities</label>
        <input
          type="text"
          id="responsibilities"
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          className={errors.responsibilities ? 'error' : ''}
        />
        {errors.responsibilities && <span className="error-message">{errors.responsibilities}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="procedure">Procedure Steps</label>
        <div className="procedure-steps">
          {formData.procedure.map((step) => (
            <div key={step.id} className="procedure-step">
              <span>{`${step.stepNumber}. ${step.description}`}</span>
              <button
                type="button"
                onClick={() => removeProcedureStep(step.id)}
                className="remove-step"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="form-group">
            <input
              type="text"
              value={currentStep}
              onChange={(e) => setCurrentStep(e.target.value)}
              placeholder="New procedure step"
              className="new-step-input"
            />
            <button type="button" onClick={addProcedureStep} className="add-step">
              Add Step
            </button>
          </div>
        </div>
        {errors.procedure && <span className="error-message">{errors.procedure}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="relatedDocuments">Related Documents</label>
        <div className="related-documents">
          {formData.relatedDocuments.map((doc) => (
            <div key={doc.id} className="related-document">
              <a href={doc.link} target="_blank" rel="noopener noreferrer">
                {doc.name}
              </a>
              <button
                type="button"
                onClick={() => removeRelatedDocument(doc.id)}
                className="remove-document"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="form-group">
            <input
              type="text"
              value={currentDoc.name}
              onChange={(e) => setCurrentDoc({ ...currentDoc, name: e.target.value })}
              placeholder="Document name"
              className="new-document-input"
            />
            <input
              type="text"
              value={currentDoc.link}
              onChange={(e) => setCurrentDoc({ ...currentDoc, link: e.target.value })}
              placeholder="Document link"
              className="new-document-input"
            />
            <button type="button" onClick={addRelatedDocument} className="add-document">
              Add Document
            </button>
          </div>
        </div>
        {errors.relatedDocuments && <span className="error-message">{errors.relatedDocuments}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="reviewFrequency">Review Frequency</label>
        <select
          id="reviewFrequency"
          name="reviewFrequency"
          value={formData.reviewFrequency}
          onChange={handleChange}
          className={errors.reviewFrequency ? 'error' : ''}
        >
          <option value="quarterly">Quarterly</option>
          <option value="biannually">Biannually</option>
          <option value="annually">Annually</option>
        </select>
        {errors.reviewFrequency && <span className="error-message">{errors.reviewFrequency}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="effectiveDate">Effective Date</label>
        <input
          type="date"
          id="effectiveDate"
          name="effectiveDate"
          value={formData.effectiveDate}
          onChange={handleChange}
          className={errors.effectiveDate ? 'error' : ''}
        />
        {errors.effectiveDate && <span className="error-message">{errors.effectiveDate}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="version">Version</label>
        <input
          type="text"
          id="version"
          name="version"
          value={formData.version}
          onChange={handleChange}
          className={errors.version ? 'error' : ''}
        />
        {errors.version && <span className="error-message">{errors.version}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={errors.status ? 'error' : ''}
        >
          <option value="draft">Draft</option>
          <option value="review">In Review</option>
          <option value="approved">Approved</option>
        </select>
        {errors.status && <span className="error-message">{errors.status}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="authorId">Author</label>
        <input
          type="text"
          id="authorId"
          name="authorId"
          value={formData.authorId}
          onChange={handleChange}
          className={errors.authorId ? 'error' : ''}
        />
        {errors.authorId && <span className="error-message">{errors.authorId}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="categoryId">Category ID</label>
        <input
          type="text"
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className={errors.categoryId ? 'error' : ''}
        />
        {errors.categoryId && <span className="error-message">{errors.categoryId}</span>}
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Saving...' : 'Save SOP'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/sops')}
          className="cancel-button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AdminSOPForm;
