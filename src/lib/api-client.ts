import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isLoggingIn = false;

apiClient.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    let token = localStorage.getItem('admin_token') || localStorage.getItem('token');

    // Auto-login as Super Admin in local dev if token is missing
    if (!token && !isLoggingIn && !config.url?.includes('/auth/login')) {
      isLoggingIn = true;
      try {
        const loginRes = await axios.post(`${API_BASE_URL}/admin/auth/login`, {
          email: 'admin@memoverse.app',
          password: 'admin123',
        });
        if (loginRes.data?.success && loginRes.data?.data?.access_token) {
          token = loginRes.data.data.access_token;
          localStorage.setItem('admin_token', token as string);
          localStorage.setItem('admin_user', JSON.stringify(loginRes.data.data.user));
        }
      } catch (err) {
        console.error('Auto login error', err);
      } finally {
        isLoggingIn = false;
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
