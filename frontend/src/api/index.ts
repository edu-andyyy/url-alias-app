import type { ApiError, Link, LinkCreate, LinkListResponse, Stats, StatsListResponse, User, UserCreate } from '../types';

const API_BASE = '/api';

// Helper to get auth header
const getAuthHeader = (): string | null => {
  const credentials = localStorage.getItem('credentials');
  if (credentials) {
    return `Basic ${credentials}`;
  }
  return null;
};

// Helper for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const authHeader = getAuthHeader();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authHeader) {
    (headers as Record<string, string>)['Authorization'] = authHeader;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Auth functions
export const login = async (username: string, password: string): Promise<boolean> => {
  const credentials = btoa(`${username}:${password}`);

  // Test credentials by making a request
  const response = await fetch(`${API_BASE}/links/?page=1&page_size=1`, {
    headers: {
      'Authorization': `Basic ${credentials}`,
    },
  });

  if (response.ok) {
    localStorage.setItem('credentials', credentials);
    localStorage.setItem('username', username);
    return true;
  }

  if (response.status === 401) {
    throw new Error('Неверное имя пользователя или пароль');
  }

  if (response.status === 403) {
    throw new Error('Аккаунт деактивирован');
  }

  throw new Error('Ошибка входа');
};

export const logout = (): void => {
  localStorage.removeItem('credentials');
  localStorage.removeItem('username');
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('credentials') !== null;
};

export const getUsername = (): string | null => {
  return localStorage.getItem('username');
};

// User functions
export const registerUser = async (data: UserCreate): Promise<User> => {
  return apiCall<User>('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Link functions
export const createLink = async (data: LinkCreate): Promise<Link> => {
  return apiCall<Link>('/links/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getLinks = async (
  page: number = 1,
  pageSize: number = 10,
  isValid?: boolean,
  isActive?: boolean
): Promise<LinkListResponse> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('page_size', pageSize.toString());

  if (isValid !== undefined) {
    params.append('is_valid', isValid.toString());
  }
  if (isActive !== undefined) {
    params.append('is_active', isActive.toString());
  }

  return apiCall<LinkListResponse>(`/links/?${params.toString()}`);
};

export const deactivateLink = async (shortId: string): Promise<Link> => {
  return apiCall<Link>(`/links/${shortId}/deactivate`, {
    method: 'PATCH',
  });
};

// Stats functions
export const getStats = async (
  top: number = 100,
  sortBy: 'hour' | 'day' | 'all' = 'all'
): Promise<StatsListResponse> => {
  const params = new URLSearchParams();
  params.append('top', top.toString());
  params.append('sort_by', sortBy);

  return apiCall<StatsListResponse>(`/stats/?${params.toString()}`);
};

export const getLinkStats = async (shortId: string): Promise<Stats> => {
  return apiCall<Stats>(`/stats/${shortId}`);
};
