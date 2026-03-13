const API_URL = 'http://localhost:3001/api';

export const api = {
  getStudents: async () => {
    const res = await fetch(`${API_URL}/students`);
    return res.json();
  },
  saveStudentsBulk: async (students) => {
    const res = await fetch(`${API_URL}/students/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(students),
    });
    return res.json();
  },
  updateStudent: async (roll, data) => {
    const res = await fetch(`${API_URL}/students/${roll}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  getAttendance: async () => {
    const res = await fetch(`${API_URL}/attendance`);
    return res.json();
  },
  saveAttendance: async (reportData) => {
    const res = await fetch(`${API_URL}/attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData),
    });
    return res.json();
  },
  clearAttendance: async () => {
    const res = await fetch(`${API_URL}/attendance`, { method: 'DELETE' });
    return res.json();
  },
  getSettings: async (key) => {
    const res = await fetch(`${API_URL}/settings/${key}`);
    return res.json();
  },
  saveSettings: async (key, data) => {
    const res = await fetch(`${API_URL}/settings/${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }
};
