import { useState, useEffect } from 'react';
import { api } from '../services/api';

/**
 * useSql hook 
 * Similar to useLocalStorage but syncs with a SQLite backend via API.
 * @param {string} key - The setting key or entity name
 * @param {any} initialValue - Fallback value
 * @param {string} type - 'settings' | 'students' | 'attendance'
 */
export const useSql = (key, initialValue, type = 'settings') => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        let result;
        if (type === 'settings') {
          result = await api.getSettings(key);
        } else if (type === 'students') {
          result = await api.getStudents();
        } else if (type === 'attendance') {
           result = await api.getAttendance();
        }
        
        if (result !== null && result !== undefined) {
          setData(result);
        }
      } catch (err) {
        console.error(`Error fetching SQL data for ${key}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, [key, type]);

  const updateData = async (newValue) => {
    const valueToStore = newValue instanceof Function ? newValue(data) : newValue;
    setData(valueToStore);
    
    try {
      if (type === 'settings') {
        await api.saveSettings(key, valueToStore);
      } else if (type === 'students') {
        // Bulk save for simplicity in this implementation
        await api.saveStudentsBulk(valueToStore);
      } else if (type === 'attendance') {
        // Save the latest report if we can detect it, or just full sync
        // For simplicity, we'll just save the full history as setting for now
        // OR we can use the specific attendance API.
        // Let's use the specific API for individual reports if possible.
        // But the state is a full object.
        await api.saveSettings('attendanceHistory', valueToStore);
      }
    } catch (err) {
      console.error(`Error updating SQL data for ${key}:`, err);
    }
  };

  return [data, updateData, loading];
};
