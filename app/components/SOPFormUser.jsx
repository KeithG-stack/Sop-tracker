import React, { useState, useEffect } from 'react';

const SOPFormUser = ({ onSubmit, authorId, categories = [], initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Reset form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        categoryId: initialData.categoryId ? String(initialData.categoryId) : '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.categoryId) newErrors.categoryId = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const submitData = {
        title: formData.title,
        content: formData.content,
        version: initialData?.version || '1.0',
        status: initialData?.status || 'DRAFT',
        authorId: authorId,
        categoryId: parseInt(formData.categoryId, 10),
      };
      if (onSubmit) await onSubmit(submitData);
    } catch (error) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  // Clear all fields
  const handleClear = () => {
    setFormData({
      title: '',
      content: '',
      categoryId: '',
    });
    setErrors({});
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
        <label>Author ID</label>
        <input name="authorId" value={authorId} readOnly style={{ background: '#f5f5f5' }} />
      </div>
      <div className="form-group">
        <label>Category</label>
        {categories.length > 0 ? (
          <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name} (ID: {cat.id})</option>
            ))}
          </select>
        ) : (
          <input name="categoryId" value={formData.categoryId} onChange={handleChange} required />
        )}
        {errors.categoryId && <span className="error">{errors.categoryId}</span>}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Saving...' : (initialData ? 'Update SOP' : 'Create SOP')}
        </button>
        <button
          type="button"
          className="btn-secondary"
          style={{ marginLeft: 12 }}
          onClick={handleClear}
        >
          Clear All
        </button>
      </div>
    </form>
  );
};

export default SOPFormUser;