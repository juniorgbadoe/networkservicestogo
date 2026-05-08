import { useState, useCallback } from 'react';

function resolveApiUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL || '';

  if (!configuredUrl || typeof window === 'undefined') {
    return configuredUrl;
  }

  try {
    const url = new URL(configuredUrl);
    const currentHost = window.location.hostname;

    if ((url.hostname === 'localhost' && currentHost === '127.0.0.1') ||
        (url.hostname === '127.0.0.1' && currentHost === 'localhost')) {
      url.hostname = currentHost;
      return url.toString().replace(/\/$/, '');
    }
  } catch {
    return configuredUrl;
  }

  return configuredUrl;
}

const API_URL = resolveApiUrl();

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: BodyInit | Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface AuthUser {
  id: number;
  email: string;
  nom: string;
  role: string;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApi = useCallback(async <T>(endpoint: string, options: FetchOptions = {}): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const { method = 'GET', body, headers = {} } = options;

      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
      };

      const config: RequestInit = {
        method,
        headers: requestHeaders,
        credentials: 'include',
      };

      if (body && method !== 'GET') {
        if (body instanceof FormData) {
          delete requestHeaders['Content-Type'];
          config.body = body;
        } else if (body instanceof Blob || body instanceof URLSearchParams || typeof body === 'string') {
          config.body = body;
        } else {
          config.body = JSON.stringify(body);
        }
      }

      const response = await fetch(`${API_URL}${endpoint}`, config);
      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await response.json() as { error?: string; message?: string }
        : { error: await response.text() };

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Erreur API');
      }

      return data as T;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur API';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchApi, loading, error };
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const { fetchApi } = useApi();

  const checkAuth = useCallback(async () => {
    const data = await fetchApi<{ user: AuthUser }>('/api/auth/me');
    if (data?.user) {
      setUser(data.user);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [fetchApi]);

  const login = async (email: string, password: string) => {
    const data = await fetchApi<{ success: boolean; user: AuthUser }>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });

    if (data?.success) {
      setUser(data.user);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await fetchApi('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return { user, loading, login, logout, checkAuth, setUser };
}
