'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './Tasks.module.css';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch tasks from the database
  const fetchTasks = async () => {
    setLoading(true);
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: taskInput.trim() }),
    });
    setTaskInput('');
    fetchTasks();
  };

  // Mark as completed
  const handleComplete = async (id) => {
    await fetch('/api/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed: true }),
    });
    fetchTasks();
  };

  // Remove a task
  const handleDelete = async (id) => {
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchTasks();
  };

  const assignedTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, position: 'relative', minHeight: '80vh' }}>
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
            disabled={loading}
          />
          <button type="submit" style={{
            padding: '10px 22px',
            borderRadius: 6,
            background: '#4CAF50',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer'
          }} disabled={loading}>
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

      {/* Back to Home Button - bottom right */}
      <button
        onClick={() => router.push('/home')}
        style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        background: '#1a237e', // navy blue-ish
        color: '#fff',
        border: 'none',
        padding: '12px 28px',
        borderRadius: 8,
        fontSize: '1rem',
        fontWeight: 500,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(60,72,88,0.10)'
  }}
>
  ← Back to Home
</button>
    </div>
  );
}