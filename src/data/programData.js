// programData extrait dans un module séparé pour éviter TDZ / cycles d'import
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

export default programData;
