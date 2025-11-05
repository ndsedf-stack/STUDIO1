// Minimal hook to store/read a workout history from localStorage.
// This is intentionally simple so the build doesn't fail — you can extend it later.
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'hybrid_master_history_v1';

export default function useWorkoutHistory() {
  const [history, setHistory] = useState({}); // { '2025-11-05': { workoutId: '...', notes: '...' } }

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const addEntry = useCallback((dateStr, entry) => {
    setHistory(prev => {
      const next = { ...prev, [dateStr]: entry };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  const removeEntry = useCallback((dateStr) => {
    setHistory(prev => {
      const next = { ...prev };
      delete next[dateStr];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  return { history, addEntry, removeEntry };
}
