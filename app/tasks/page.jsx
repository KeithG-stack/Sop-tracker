'use client';

import React, { useState, useEffect } from 'react';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(stored);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: taskInput.trim(), completed: false }
    ]);
    setTaskInput('');
  };

  // Mark as completed
  const handleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: true } : t));
  };

  // Remove a task
  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Assigned and completed tasks
  const assignedTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Task Manager</h1>

      {/* Create Task Section */}
      <section style={{ marginBottom: 40 }}>
        <h2>Create a Task</h2>
        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: 12 }}>
          <input
            type="text"
            value={taskInput}
            onChange={e => setTaskInput(e.target.value)}
            placeholder="Enter new task..."
            style={{ flex: 1, padding: 10, borderRadius: 6, border: '1.5px solid #ccc' }}
          />
          <button type="submit" style={{
            padding: '10px 22px',
            borderRadius: 6,
            background: '#4CAF50',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Add Task
          </button>
        </form>
      </section>

      {/* Assigned Tasks Section */}
      <section style={{ marginBottom: 40 }}>
        <h2>Assigned Tasks</h2>
        {assignedTasks.length === 0 ? (
          <p style={{ color: '#888' }}>No assigned tasks.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {assignedTasks.map(task => (
              <li key={task.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: '1px solid #eee'
              }}>
                <span>{task.text}</span>
                <div>
                  <button onClick={() => handleComplete(task.id)} style={{
                    marginRight: 10, background: '#3b82f6', color: '#fff', border: 'none',
                    borderRadius: 4, padding: '6px 14px', cursor: 'pointer'
                  }}>
                    Complete
                  </button>
                  <button onClick={() => handleDelete(task.id)} style={{
                    background: '#ef4444', color: '#fff', border: 'none',
                    borderRadius: 4, padding: '6px 14px', cursor: 'pointer'
                  }}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Completed Tasks Section */}
      <section>
        <h2>Completed Tasks</h2>
        {completedTasks.length === 0 ? (
          <p style={{ color: '#888' }}>No completed tasks yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {completedTasks.map(task => (
              <li key={task.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: '1px solid #eee', color: '#4CAF50'
              }}>
                <span>{task.text}</span>
                <button onClick={() => handleDelete(task.id)} style={{
                  background: '#ef4444', color: '#fff', border: 'none',
                  borderRadius: 4, padding: '6px 14px', cursor: 'pointer'
                }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}