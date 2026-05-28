import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5030/api';
const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('hk_admin_token');
    if (token) {
      axios.get(`${API}/admin/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => setAdmin({ username: r.data.username, token }))
        .catch(() => localStorage.removeItem('hk_admin_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const r = await axios.post(`${API}/admin/login`, { username, password });
    localStorage.setItem('hk_admin_token', r.data.token);
    setAdmin({ username: r.data.username, token: r.data.token });
  };

  const logout = () => {
    localStorage.removeItem('hk_admin_token');
    setAdmin(null);
  };

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('hk_admin_token')}` }
  });

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout, authHeader, API }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
