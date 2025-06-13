'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [eventInput, setEventInput] = useState('');
  const router = useRouter();

  // Get events for the selected date
  const dateKey = selectedDate.toISOString().split('T')[0];
  const dayEvents = events[dateKey] || [];

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
    setEventInput('');
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!eventInput.trim()) return;
    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), eventInput.trim()]
    }));
    setEventInput('');
    setShowModal(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, position: 'relative', minHeight: '80vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Calendar</h1>
      <Calendar
        onClickDay={handleDayClick}
        value={selectedDate}
        tileContent={({ date }) => {
          const key = date.toISOString().split('T')[0];
          return events[key] && events[key].length > 0 ? (
            <div style={{ marginTop: 2, fontSize: 10, color: '#1a237e' }}>
              {events[key].length} event{events[key].length > 1 ? 's' : ''}
            </div>
          ) : null;
        }}
      />

      {/* Events for selected day */}
      <div style={{ marginTop: 32 }}>
        <h2>
          Events for {selectedDate.toLocaleDateString()}
        </h2>
        {dayEvents.length === 0 ? (
          <p style={{ color: '#888' }}>No events for this day.</p>
        ) : (
          <ul>
            {dayEvents.map((ev, idx) => (
              <li key={idx}>{ev}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal for adding event */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1001
        }}>
          <form
            onSubmit={handleAddEvent}
            style={{
              background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
              minWidth: 320, display: 'flex', flexDirection: 'column', gap: 16
            }}
          >
            <h3>Add Event for {selectedDate.toLocaleDateString()}</h3>
            <input
              type="text"
              value={eventInput}
              onChange={e => setEventInput(e.target.value)}
              placeholder="Event or task description"
              style={{ padding: 10, borderRadius: 6, border: '1.5px solid #ccc' }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  background: '#eee', border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: '#1a237e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer'
                }}
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      )}

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
          boxShadow: '0 2px 8px rgba(60,72,88,0.10)',
          zIndex: 1002
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
}