import React, { useState } from 'react';
import useWorkoutHistory from './hooks/useWorkoutHistory';
import './styles.css';

// programData should be the object you already have in the repo.
// If you don't have it in a separate file, paste the full programData object here.
const programData = (window.__PROGRAM_DATA__ || { /* fallback if you prefer to inline the object here */ });
// NOTE: If you have the programData object in this file previously, keep it here.

function prettyId(id) {
  if (!id) return '';
  return id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function ExerciseItem({ ex }) {
  if (!ex) return null;
  return (
    <li>
      <strong>{ex.name ?? prettyId(ex.id)}</strong>
      {' — '}
      {ex.sets ?? '-'} sets × {ex.reps ?? '-'}
      {ex.startWeight ? ` — start ${ex.startWeight}kg` : ''}
    </li>
  );
}

function Superset({ ex }) {
  const [open, setOpen] = useState(true);
  if (!ex) return null;
  return (
    <div className="superset">
      <div className="superset-header">
        <div>
          <strong>Superset</strong> — {ex.name ?? prettyId(ex.id)} {ex.rest ? ` (rest ${ex.rest}s)` : ''}
        </div>
        <div>
          <button className="toggle-btn" onClick={() => setOpen(o => !o)}>{open ? 'Hide' : 'Show'}</button>
        </div>
      </div>
      {open && (
        <ul style={{ margin: 0, paddingLeft: 16 }}>
          {ex.exercises && ex.exercises.map((s) => <ExerciseItem key={s.id} ex={s} />)}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  const { history } = useWorkoutHistory();
  const days = Object.keys(programData.workouts || {});

  // collapse state per day
  const [openDays, setOpenDays] = useState(() => {
    const state = {};
    days.forEach(d => { state[d] = true; });
    return state;
  });
  const toggleDay = (d) => setOpenDays(s => ({ ...s, [d]: !s[d] }));

  // Inline fallback styles in case styles.css was not loaded by the deployed bundle
  const fallbackStyle = {
    background: 'linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)',
    minHeight: '100vh',
    padding: 28,
    fontFamily: 'Inter, Arial, sans-serif',
    color: '#0f172a',
  };

  return (
    <div className="app" style={fallbackStyle}>
      <header className="app-header">
        <div className="brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color:'#2563eb' }}>
            <path d="M21 8.5C21 7.12 19.88 6 18.5 6H17V5C17 4.45 16.55 4 16 4H8C7.45 4 7 4.45 7 5V6H5.5C4.12 6 3 7.12 3 8.5V15.5C3 16.88 4.12 18 5.5 18H7V19C7 19.55 7.45 20 8 20H16C16.55 20 17 19.55 17 19V18H18.5C19.88 18 21 16.88 21 15.5V8.5Z"/>
          </svg>
          <h1>Hybrid Master — Prototype</h1>
        </div>
        <div className="header-actions">
          <button title="Stats" className="toggle-btn">Stats</button>
          <button title="New" className="toggle-btn">New</button>
        </div>
      </header>

      <section className="section">
        <h2 style={{ marginTop: 0 }}>Workouts</h2>

        <div className="cards">
          {days.map(dayKey => {
            const w = programData.workouts[dayKey];
            if (!w) return null;
            const seen = new Set();
            return (
              <article key={dayKey} className="card">
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', gap:12 }}>
                  <div>
                    <h3>{w.name ?? prettyId(dayKey)}</h3>
                    <div className="meta">{Array.isArray(w.exercises) ? `${w.exercises.length} exercises` : 'No exercises'}</div>
                  </div>
                  <div>
                    <button className="toggle-btn" onClick={() => toggleDay(dayKey)}>{openDays[dayKey] ? 'Collapse' : 'Expand'}</button>
                  </div>
                </div>

                {openDays[dayKey] && (
                  <div style={{ marginTop:10 }}>
                    {w.exercises && Array.isArray(w.exercises) ? (
                      <ul className="exercise-list">
                        {w.exercises.map((ex) => {
                          if (!ex) return null;
                          if (ex.type === 'superset') {
                            return <li key={ex.id}><Superset ex={ex} /></li>;
                          }
                          if (seen.has(ex.id)) return null;
                          seen.add(ex.id);
                          return <ExerciseItem key={ex.id} ex={ex} />;
                        })}
                      </ul>
                    ) : (
                      <div>No exercises</div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <footer className="app-footer">
        <div>History entries: {Object.keys(history).length}</div>
        <div style={{ marginTop:6 }}>Deployed from repository — prototype view.</div>
      </footer>
    </div>
  );
}
