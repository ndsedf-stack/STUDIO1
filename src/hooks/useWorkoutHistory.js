// Hook optimisé : versionné + debounce d'écriture + flush on unload + meilleure détection QuotaExceeded
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';

const DB_KEY = 'hybridMaster51_data_v4';
const STORAGE_VERSION = 1;

const createStoragePayload = (data) => ({
  version: STORAGE_VERSION,
  timestamp: Date.now(),
  data: data
});

const parseStoragePayload = (stored) => {
  try {
    const parsed = JSON.parse(stored);

    if (!parsed || typeof parsed !== 'object') return null;
    if (!parsed.version) {
      console.log('Migration depuis ancien format');
      return parsed;
    }

    if (parsed.version > STORAGE_VERSION) {
      console.warn("Données d'une version future détectées");
    }

    return parsed.data;
  } catch (e) {
    console.error('Erreur parsing:', e);
    return null;
  }
};

const isQuotaError = (e) => {
  if (!e) return false;
  const name = e.name || '';
  const code = e.code || e.number || null;
  return name === 'QuotaExceededError' || name === 'NS_ERROR_DOM_QUOTA_REACHED' || code === 22 || code === 1014;
};

export default function useWorkoutHistory() {
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(DB_KEY);
      if (!stored) return {};
      const parsed = parseStoragePayload(stored);
      return parsed || {};
    } catch (e) {
      console.error('Erreur de chargement:', e);
      return {};
    }
  });

  const saveQueueRef = useRef(null);
  const pendingDataRef = useRef(null);
  const isUnmountedRef = useRef(false);

  const sortedHistory = useMemo(
    () => Object.values(history).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [history]
  );

  const flushToStorageImmediate = useCallback((data) => {
    try {
      const payload = createStoragePayload(data);
      const serialized = JSON.stringify(payload);

      const sizeInMB = serialized.length / (1024 * 1024);
      if (sizeInMB > 4.5) {
        console.warn(`⚠️ Stockage à ${sizeInMB.toFixed(2)}MB`);
      }

      localStorage.setItem(DB_KEY, serialized);
      return true;
    } catch (e) {
      if (isQuotaError(e)) {
        alert('💾 Espace de stockage plein ! Exportez vos données et supprimez les anciennes séances.');
      }
      console.error('Erreur sauvegarde:', e);
      return false;
    }
  }, []);

  const scheduleSave = useCallback((data, delay = 400) => {
    pendingDataRef.current = data;
    if (saveQueueRef.current) clearTimeout(saveQueueRef.current);
    saveQueueRef.current = setTimeout(() => {
      try {
        flushToStorageImmediate(pendingDataRef.current);
      } catch (e) {
        console.error('Flush error:', e);
      } finally {
        saveQueueRef.current = null;
        pendingDataRef.current = null;
      }
    }, delay);
  }, [flushToStorageImmediate]);

  useEffect(() => {
    const flushNow = () => {
      if (pendingDataRef.current) {
        try {
          flushToStorageImmediate(pendingDataRef.current);
        } catch (e) {
          console.error('Erreur flush on unload:', e);
        }
        pendingDataRef.current = null;
      }
      if (saveQueueRef.current) {
        clearTimeout(saveQueueRef.current);
        saveQueueRef.current = null;
      }
    };

    const onPageHide = () => flushNow();
    const onBeforeUnload = () => flushNow();

    window.addEventListener('pagehide', onPageHide, { capture: true });
    window.addEventListener('beforeunload', onBeforeUnload);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushNow();
    });

    return () => {
      isUnmountedRef.current = true;
      flushNow();
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [flushToStorageImmediate]);

  const saveToStorage = useCallback((data) => {
    try {
      const payload = createStoragePayload(data);
      const serialized = JSON.stringify(payload);
      const sizeInMB = serialized.length / (1024 * 1024);

      if (sizeInMB < 0.1) {
        localStorage.setItem(DB_KEY, serialized);
        return true;
      }
      scheduleSave(data, 400);
      return true;
    } catch (e) {
      if (isQuotaError(e)) {
        alert('💾 Espace de stockage plein ! Exportez vos données et supprimez les anciennes séances.');
      }
      console.error('Erreur sauvegarde (wrapper):', e);
      return false;
    }
  }, [scheduleSave]);

  const saveWorkout = useCallback((workout) => {
    if (!workout?.date || !workout?.exercises) {
      console.error('Workout invalide:', workout);
      return false;
    }

    const newHistory = { ...history, [workout.date]: workout };
    setHistory(newHistory);
    saveToStorage(newHistory);
    return true;
  }, [history, saveToStorage]);

  const importHistory = useCallback((newHistory) => {
    try {
      if (!newHistory || typeof newHistory !== 'object') {
        throw new Error('Format invalide');
      }

      const entries = Object.entries(newHistory);
      if (entries.length === 0) {
        throw new Error('Fichier vide');
      }

      const isValid = entries.every(([date, workout]) => workout?.exercises && Array.isArray(workout.exercises));

      if (!isValid) {
        throw new Error('Structure de données invalide');
      }

      setHistory(newHistory);
      saveToStorage(newHistory);
      alert(`✅ ${entries.length} séances importées !`);
      setTimeout(() => window.location.reload(), 800);
      return true;
    } catch (error) {
      alert(`❌ Erreur d'importation: ${error.message}`);
      console.error(error);
      return false;
    }
  }, [saveToStorage]);

  const getExercisePR = useCallback((exerciseId) => {
    let best = { weight: 0, reps: 0 };

    const processSet = (set) => {
      if (!set?.completed) return;

      const w = parseFloat(String(set.weight));
      const r = parseInt(String(set.reps));

      if (isNaN(w) || isNaN(r)) return;

      if (w > best.weight || (w === best.weight && r > best.reps)) {
        best = { weight: w, reps: r };
      }
    };

    const processExercise = (exo) => {
      if (exo.id === exerciseId && exo.sets) {
        exo.sets.forEach(processSet);
      }
    };

    sortedHistory.forEach(workout => {
      if (!workout?.exercises) return;

      workout.exercises.forEach(exo => {
        if (exo.type === 'superset' && exo.exercises) {
          exo.exercises.forEach(processExercise);
        } else {
          processExercise(exo);
        }
      });
    });

    return best;
  }, [sortedHistory]);

  const getSuggestedWeight = useCallback((exercise) => {
    if (!exercise?.id) return exercise?.startWeight || 0;

    for (const entry of sortedHistory) {
      if (!entry?.exercises) continue;

      for (const performedExo of entry.exercises) {
        const checkExo = (exo) => {
          if (exo.id !== exercise.id || !exo.sets?.length) return null;

          const completedSets = exo.sets.filter(s => s?.completed);
          if (completedSets.length === 0) return null;

          const lastSet = completedSets[completedSets.length - 1];
          const weight = parseFloat(String(lastSet.weight));
          const reps = parseInt(String(lastSet.reps));
          const rir = parseInt(String(lastSet.rir));
          if (isNaN(weight)) return null;

          const targetReps = parseInt((exercise.reps || "8").split('-').pop() || "8");

          if (!isNaN(reps) && !isNaN(rir) && reps >= targetReps && rir >= (exercise.rir || 1)) {
            return weight + (exercise.progression?.increment || 2.5);
          }
          return weight;
        };

        const subExos = performedExo.type === 'superset' ? performedExo.exercises : [performedExo];
        for (const subExo of subExos) {
          const suggestedWeight = checkExo(subExo);
          if (suggestedWeight !== null) return suggestedWeight;
        }
      }
    }

    return exercise.startWeight || 0;
  }, [sortedHistory]);

  return {
    history,
    sortedHistory,
    saveWorkout,
    getExercisePR,
    getSuggestedWeight,
    importHistory
  };
}
