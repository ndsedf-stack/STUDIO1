import React from "react";

const workouts = [
  {
    id: 'haut_du_corps',
    name: 'Haut du corps - Exemple',
    exercises: [
      { id: 'latpull', name: 'Lat Pulldown (large)', sets: 4, reps: '10', rir: 2, startWeight: 60, progression: { increment: 2.5 }, intensification: 'drop-set', muscles: { primary: ["Dos"], secondary: ["Biceps"] } },
      { id: 'landminepress', name: 'Landmine Press', sets: 4, reps: '10', rir: 2, startWeight: 35, progression: { increment: 2.5 }, muscles: { primary: ["Pectoraux", "Épaules"], secondary: ["Triceps"] } },
    ],
  },
  { id: 'rowmachine', name: 'Rowing Machine (large)', sets: 4, reps: '10', rir: 2, rest: 75, startWeight: 50, progression: { increment: 2.5 }, intensification: 'myo-reps', muscles: { primary: ["Dos"], secondary: ["Biceps", "Épaules"] } },
  { type: 'superset', id: 'superset_bras_dim', rest: 75, exercises: [
      { id: 'curl', name: 'Curl', sets: 3, reps: '8-10', muscles: { primary: ["Biceps"] } },
      { id: 'triceps_pushdown', name: 'Triceps Pushdown', sets: 3, reps: '8-10', muscles: { primary: ["Triceps"] } },
    ]
  },
];

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Workouts</h1>
      {workouts.map((w) => (
        <section key={w.id} style={{ marginBottom: 20 }}>
          <h2>{w.name ?? w.id}</h2>
          {w.exercises ? (
            <ul>
              {w.exercises.map((ex) => (
                <li key={ex.id}>
                  <strong>{ex.name}</strong>
                  {' — '}
                  {ex.sets} sets × {ex.reps}
                  {ex.startWeight ? ` — start ${ex.startWeight}kg` : ''}
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <strong>{w.name}</strong>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
