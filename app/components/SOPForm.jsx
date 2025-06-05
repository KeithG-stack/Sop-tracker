// src/components/SOPForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SOPForm.css';

const SOPForm = ({ onSubmit, initialData = null }) => {
  const navigate = useNavigate();
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
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error toast here
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sop-form">
      <div className="form-section">
        <h2>Basic Information</h2>
        
        <div className="form-group">
          <label htmlFor="title">SOP Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Employee Onboarding Process"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select Category</option>
              <option value="hr">Human Resources</option>
              <option value="operations">Operations</option>
              <option value="finance">Finance</option>
              <option value="it">IT</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g., Human Resources"
              className={errors.department ? 'error' : ''}
            />
            {errors.department && <span className="error-message">{errors.department}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="effectiveDate">Effective Date</label>
            <input
              type="date"
              id="effectiveDate"
              name="effectiveDate"
              value={formData.effectiveDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reviewFrequency">Review Frequency</label>
            <select
              id="reviewFrequency"
              name="reviewFrequency"
              value={formData.reviewFrequency}
              onChange={handleChange}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="semi-annually">Semi-Annually</option>
              <option value="annually">Annually</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="version">Version</label>
            <input
              type="text"
              id="version"
              name="version"
              value={formData.version}
              onChange={handleChange}
              placeholder="1.0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>SOP Details</h2>
        
        <div className="form-group">
          <label htmlFor="purpose">Purpose *</label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            rows="3"
            placeholder="Describe the purpose of this SOP..."
            className={errors.purpose ? 'error' : ''}
          />
          {errors.purpose && <span className="error-message">{errors.purpose}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="scope">Scope *</label>
          <textarea
            id="scope"
            name="scope"
            value={formData.scope}
            onChange={handleChange}
            rows="3"
            placeholder="Define the scope and applicability..."
            className={errors.scope ? 'error' : ''}
          />
          {errors.scope && <span className="error-message">{errors.scope}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="responsibilities">Responsibilities</label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            rows="3"
            placeholder="List key responsibilities and roles..."
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Procedure Steps *</h2>
        {errors.procedure && <span className="error-message">{errors.procedure}</span>}
        
        <div className="procedure-input">
          <input
            type="text"
            value={currentStep}
            onChange={(e) => setCurrentStep(e.target.value)}
            placeholder="Enter a procedure step..."
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProcedureStep())}
          />
          <button type="button" onClick={addProcedureStep} className="btn-add">
            Add Step
          </button>
        </div>

        <div className="procedure-list">
          {formData.procedure.map((step, index) => (
            <div key={step.id} className="procedure-item">
              <span className="step-number">{step.stepNumber}</span>
              <span className="step-description">{step.description}</span>
              <div className="step-actions">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => reorderSteps(index, index - 1)}
                    className="btn-icon"
                    title="Move up"
                  >
                    ↑
                  </button>
                )}
                {index < formData.procedure.length - 1 && (
                  <button
                    type="button"
                    onClick={() => reorderSteps(index, index + 1)}
                    className="btn-icon"
                    title="Move down"
                  >
                    ↓
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeProcedureStep(step.id)}
                  className="btn-icon btn-remove"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h2>Related Documents</h2>
        
        <div className="document-input">
          <input
            type="text"
            value={currentDoc.name}
            onChange={(e) => setCurrentDoc({ ...currentDoc, name: e.target.value })}
            placeholder="Document name..."
          />
          <input
            type="url"
            value={currentDoc.link}
            onChange={(e) => setCurrentDoc({ ...currentDoc, link: e.target.value })}
            placeholder="Document URL..."
          />
          <button type="button" onClick={addRelatedDocument} className="btn-add">
            Add Document
          </button>
        </div>

        <div className="document-list">
          {formData.relatedDocuments.map((doc) => (
            <div key={doc.id} className="document-item">
              <a href={doc.link} target="_blank" rel="noopener noreferrer">
                {doc.name}
              </a>
              <button
                type="button"
                onClick={() => removeRelatedDocument(doc.id)}
                className="btn-icon btn-remove"
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
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