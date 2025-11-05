import React from 'react';
import useWorkoutHistory from './hooks/useWorkoutHistory';

// --- PROGRAM DATA (kept as in repo) ---
const programData = {
  blocks: [
    { id: 1, name: "BLOC 1 (S1-5): FONDATION TECHNIQUE", weeks: [1, 2, 3, 4, 5], technique: { name: 'Tempo & Pauses', desc: "Tempo 3-1-2 et pauses stratégiques." }, bicepsVariant: 'Incline Curl' },
    { id: 2, name: "BLOC 2 (S7-11): SURCHARGE PROGRESSIVE", weeks: [7, 8, 9, 10, 11], technique: { name: 'Rest-Pause', desc: "Tempo 2-1-2. Rest-Pause sur la dernière série des exercices principaux." }, bicepsVariant: 'Spider Curl' },
    { id: 3, name: "BLOC 3 (S13-17): SURCOMPENSATION", weeks: [13, 14, 15, 16, 17], technique: { name: 'Drop-Sets & Myo-Reps', desc: "Drop-sets et Myo-reps sur la dernière série des isolations." }, bicepsVariant: 'Incline Curl' },
    { id: 4, name: "BLOC 4 (S19-25): INTENSIFICATION MAXIMALE", weeks: [19, 20, 21, 22, 23, 24, 25], technique: { name: 'Clusters & Partials', desc: "Clusters, Myo-reps sur toutes les isolations, et Partials." }, bicepsVariant: 'Spider Curl' },
  ],
  deloadWeeks: [6, 12, 18, 24, 26],
  workouts: {
    dimanche: {
      name: "Dos + Jambes Lourdes + Bras",
      exercises: [
        { id: 'tbdl', name: 'Trap Bar Deadlift', sets: 5, reps: '6-8', rir: 2, rest: 120, startWeight: 75, progression: { increment: 5 }, intensification: 'rest-pause', muscles: { primary: ["Dos", "Fessiers", "Ischios"], secondary: ["Quadriceps"] } },
        { id: 'goblet', name: 'Goblet Squat', sets: 4, reps: '10', rir: 2, rest: 75, startWeight: 25, progression: { increment: 2.5 }, intensification: 'drop-set', muscles: { primary: ["Quadriceps", "Fessiers"], secondary: ["Ischios"] } },
        { id: 'legpress', name: 'Leg Press', sets: 4, reps: '10', rir: 2, rest: 75, startWeight: 110, progression: { increment: 10 }, intensification: 'cluster', muscles: { primary: ["Quadriceps", "Fessiers"], secondary: ["Ischios"] } },
        { type: 'superset', id: 'superset_dos_pecs', rest: 90, exercises: [
            { id: 'latpull', name: 'Lat Pulldown (large)', sets: 4, reps: '10', rir: 2, startWeight: 60, progression: { increment: 2.5 }, intensification: 'drop-set', muscles: { primary: ["Dos"], secondary: ["Biceps"] } },
            { id: 'landminepress', name: 'Landmine Press', sets: 4, reps: '10', rir: 2, startWeight: 35, progression: { increment: 2.5 }, muscles: { primary: ["Pectoraux", "Épaules"], secondary: ["Triceps"] } }
        ]},
        { id: 'rowmachine', name: 'Rowing Machine (large)', sets: 4, reps: '10', rir: 2, rest: 75, startWeight: 50, progression: { increment: 2.5 }, intensification: 'myo-reps', muscles: { primary: ["Dos"], secondary: ["Biceps", "Épaules"] } },
        { type: 'superset', id: 'superset_bras_dim', rest: 75, exercises: [
            { id: 'biceps_dim', name: 'Spider Curl / Incline Curl', sets: 4, reps: '12', rir: 1, startWeight: 12, progression: { increment: 2.5 }, bicepsRotation: true, intensification: 'myo-reps', muscles: { primary: ["Biceps"], secondary: [] } },
            { id: 'pushdown', name: 'Cable Pushdown', sets: 3, reps: '12', rir: 1, startWeight: 20, progression: { increment: 2.5 }, muscles: { primary: ["Triceps"], secondary: [] } }
        ]},
      ]
    },
    mardi: {
      name: "Pecs + Épaules + Triceps",
      exercises: [
        { id: 'dbpress', name: 'Dumbbell Press', sets: 5, reps: '10', rir: 2, rest: 105, startWeight: 22, progression: { increment: 2.5 }, intensification: 'rest-pause', muscles: { primary: ["Pectoraux"], secondary: ["Épaules", "Triceps"] } },
        { id: 'cablefly', name: 'Cable Fly', sets: 4, reps: '12', rir: 1, rest: 60, startWeight: 10, progression: { increment: 2.5 }, intensification: 'drop-set', muscles: { primary: ["Pectoraux"], secondary: [] } },
        { id: 'legpresslight', name: 'Leg Press léger', sets: 3, reps: '15', rir: 2, rest: 60, startWeight: 80, progression: { increment: 10 }, muscles: { primary: ["Quadriceps", "Fessiers"], secondary: [] } },
        { type: 'superset', id: 'superset_tri_epaules', rest: 75, exercises: [
            { id: 'tricepsext', name: 'Extension Triceps Corde', sets: 5, reps: '12', rir: 1, startWeight: 20, progression: { increment: 2.5 }, intensification: 'drop-set', muscles: { primary: ["Triceps"], secondary: [] } },
            { id: 'latraises', name: 'Lateral Raises', sets: 5, reps: '15', rir: 1, startWeight: 8, progression: { increment: 2.5 }, intensification: 'myo-reps', muscles: { primary: ["Épaules"], secondary: [] } }
        ]},
        { id: 'facepull', name: 'Face Pull', sets: 5, reps: '15', rir: 2, rest: 60, startWeight: 20, progression: { increment: 2.5 }, intensification: 'myo-reps', muscles: { primary: ["Épaules", "Dos"], secondary: [] } },
        { id: 'rowmachineserre', name: 'Rowing Machine (serrée)', sets: 4, reps: '12', rir: 2, rest: 75, startWeight: 50, progression: { increment: 2.5 }, muscles: { primary: ["Dos"], secondary: ["Biceps"] } },
        { id: 'overheadext', name: 'Overhead Extension', sets: 4, reps: '12', rir: 1, rest: 60, startWeight: 15, progression: { increment: 2.5 }, intensification: 'myo-reps', muscles: { primary: ["Triceps"], secondary: [] } },
      ]
    },
    vendredi: {
      name: "Dos + Jambes Légères + Bras + Épaules",
      exercises: [
        { id: 'landminerow', name: 'Landmine Row', sets: 5, reps: '10', rir: 2, rest: 105, startWeight: 55, progression: { increment: 2.5 }, intensification: 'rest-pause', muscles: { primary: ["Dos"], secondary: ["Biceps"] } },
        { type: 'superset', id: 'superset_jambes_ven', rest: 75, exercises: [
            { id: 'legcurl', name: 'Leg Curl', sets: 5, reps: '12', rir: 1, startWeight: 40, progression: { increment: 5 }, intensification: 'partials', muscles: { primary: ["Ischios"], secondary: [] } },
            { id: 'legext', name: 'Leg Extension', sets: 4, reps: '15', rir: 1, startWeight: 35, progression: { increment: 5 }, intensification: 'partials', muscles: { primary: ["Quadriceps"], secondary: [] } }
        ]},
        { type: 'superset', id: 'superset_pecs_ven', rest: 60, exercises: [
            { id: 'cablefly_ven', name: 'Cable Fly', sets: 4, reps: '15', rir: 1, startWeight: 10, progression: { increment: 2.5 }, intensification: 'myo-reps', muscles: { primary: ["Pectoraux"], secondary: [] } },
            { id: 'dbfly', name: 'Dumbbell Fly', sets: 4, reps: '12', rir: 1, startWeight: 10, progression: { increment: 2.5 }, intensification: 'drop-set', muscles: { primary: ["Pectoraux"], secondary: [] } }
        ]},
        { type: 'superset', id: 'superset_bras_ven', rest: 75, exercises: [
            { id: 'ezcurl', name: 'EZ Bar Curl', sets: 5, reps: '12', rir: 1, startWeight: 25, progression: { increment: 2.5 }, intensification: 'myo-reps', muscles: { primary: ["Biceps"], secondary: [] } },
            { id: 'overheadext_ven', name: 'Overhead Extension', sets: 3, reps: '12', rir: 1, startWeight: 15, progression: { increment: 2.5 }, intensification: 'myo-reps', muscles: { primary: ["Triceps"], secondary: [] } }
        ]},
        { id: 'latraises_ven', name: 'Lateral Raises', sets: 3, reps: '15', rir: 1, rest: 60, startWeight: 8, progression: { increment: 2.5 }, intensification: 'myo-reps', muscles: { primary: ["Épaules"], secondary: [] } },
        { id: 'wristcurl', name: 'Wrist Curl', sets: 3, reps: '20', rir: 0, rest: 45, startWeight: 30, progression: { increment: 2.5 }, muscles: { primary: ["Avant-bras"], secondary: [] } },
      ]
    },
  },
  homeWorkouts: {
    mardi: { id: 'hammer_home', name: 'Hammer Curl', sets: 3, reps: '12', rest: 60, startWeight: 12, progression: { increment: 2.5 }, muscles: { primary: ["Biceps", "Avant-bras"], secondary: [] } },
    jeudi: { id: 'hammer_home', name: 'Hammer Curl', sets: 3, reps: '12', rest: 60, startWeight: 12, progression: { increment: 2.5 }, muscles: { primary: ["Biceps", "Avant-bras"], secondary: [] } }
  },
  stats: {
    projections: [
        { id: 'tbdl', name: 'Trap Bar DL', start: 75, end: 120 },
        { id: 'dbpress', name: 'Dumbbell Press', start: 22, end: 45 },
        { id: 'legpress', name: 'Leg Press', start: 110, end: 240 },
        { id: 'rowmachine', name: 'Rowing Machine', start: 50, end: 82.5 },
        { id: 'ezcurl', name: 'EZ Bar Curl', start: 25, end: 47.5 },
    ],
    weeklyVolume: [ { muscle: "Quadriceps", series: 23, optimal: [18, 24] }, { muscle: "Ischios", series: 17, optimal: [14, 20] }, { muscle: "Fessiers", series: 19, optimal: [14, 20] }, { muscle: "Dos", series: 30, optimal: [18, 24] }, { muscle: "Pectoraux", series: 22, optimal: [16, 22] }, { muscle: "Épaules", series: 10, optimal: [6, 10] }, { muscle: "Biceps", series: 19, optimal: [14, 20] }, { muscle: "Triceps", series: 20, optimal: [12, 18] }, { muscle: "Avant-bras", series: 16, optimal: [6,12] } ]
  }
};

// --- ICONS ---
const DumbbellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M21 8.5C21 7.12 19.88 6 18.5 6H17V5C17 4.45 16.55 4 16 4H8C7.45 4 7 4.45 7 5V6H5.5C4.12 6 3 7.12 3 8.5V15.5C3 16.88 4.12 18 5.5 18H7V19C7 19.55 7.45 20 8 20H16C16.55 20 17 19.55 17 19V18H18.5C19.88 18 21 16.88 21 15.5V8.5ZM5 16.5V8.5C5 8.22 5.22 8 5.5 8H6V16H5.5C5.22 16 5 16.28 5 16.5ZM19 15.5C19 16.28 18.78 16 18.5 16H18V8H18.5C18.78 8 19 8.22 19 8.5V15.5Z"/></svg>
);
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M16 6H18V20H16V6ZM11 11H13V20H11V11ZM6 16H8V20H6V16ZM20 2H2V4H20V2Z"/></svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
);

// --- HELPERS ---
function prettyId(id) {
  if (!id) return '';
  return id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function renderExerciseItem(ex, keyPrefix = '') {
  if (!ex) return null;
  const key = `${keyPrefix}-${ex.id}`;
  return (
    <li key={key} style={{ marginBottom: 6 }}>
      <strong>{ex.name ?? prettyId(ex.id)}</strong>
      {' — '}
      {ex.sets ?? '-'} sets × {ex.reps ?? '-'}
      {ex.startWeight ? ` — start ${ex.startWeight}kg` : ''}
    </li>
  );
}

// --- APP ---
export default function App() {
  const { history } = useWorkoutHistory();

  const days = Object.keys(programData.workouts);

  return (
    <div style={{ padding: 20, fontFamily: 'Inter, Arial, sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <DumbbellIcon />
          <h1 style={{ margin: 0 }}>Hybrid Master — Prototype</h1>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button title="Stats" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><ChartIcon /></button>
          <button title="New" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><PlusIcon /></button>
        </div>
      </header>

      <section style={{ marginBottom: 18 }}>
        <h2 style={{ marginTop: 0 }}>Workouts</h2>

        {days.map(dayKey => {
          const w = programData.workouts[dayKey];
          // We'll track seen exercise ids in this workout to avoid duplicates showing twice
          const seen = new Set();

          return (
            <article key={dayKey} style={{ border: '1px solid #eee', padding: 12, marginBottom: 12, borderRadius: 6 }}>
              <h3 style={{ margin: '0 0 8px 0' }}>{w.name ?? prettyId(dayKey)}</h3>

              {w.exercises && Array.isArray(w.exercises) ? (
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {w.exercises.map((ex) => {
                    if (!ex) return null;

                    if (ex.type === 'superset') {
                      // For supersets, render the superset header and render only sub-exercises that haven't already been shown
                      const subItems = (ex.exercises || []).map(sub => {
                        if (!sub || seen.has(sub.id)) return null;
                        seen.add(sub.id);
                        return renderExerciseItem(sub, ex.id);
                      }).filter(Boolean);

                      // If nothing remains to show (all subitems were already rendered), skip the whole superset
                      if (subItems.length === 0) return null;

                      return (
                        <li key={ex.id} style={{ marginBottom: 8 }}>
                          <em>Superset</em> — {ex.name ?? prettyId(ex.id)} {ex.rest ? ` (rest ${ex.rest}s)` : ''}
                          <ul style={{ marginTop: 6, paddingLeft: 14 }}>
                            {subItems}
                          </ul>
                        </li>
                      );
                    }

                    // Normal exercise: skip if already shown (dedupe)
                    if (seen.has(ex.id)) return null;
                    seen.add(ex.id);
                    return renderExerciseItem(ex);
                  })}
                </ul>
              ) : (
                <div>No exercises</div>
              )}
            </article>
          );
        })}
      </section>

      <footer style={{ marginTop: 30, color: '#666', fontSize: 13 }}>
        <div>History entries: {Object.keys(history).length}</div>
        <div style={{ marginTop: 6 }}>Deployed from repository — prototype view.</div>
      </footer>
    </div>
  );
}
