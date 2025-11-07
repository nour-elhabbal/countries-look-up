'use client';
import { useState, useEffect } from 'react';

export function useSessionStorage<T extends Record<string, number>>(key: string, initialValue: T) {
  const [map, setMap] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(key);
      if (stored) {
        setMap(JSON.parse(stored));
      } else {
        sessionStorage.setItem(key, JSON.stringify(initialValue));
      }
    } catch (error) {
      console.warn(`Error accessing sessionStorage key "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(map));
    } catch (error) {
      console.warn(`Error saving sessionStorage key "${key}":`, error);
    }
  }, [key, map]);

  return [map, setMap] as const;
}
