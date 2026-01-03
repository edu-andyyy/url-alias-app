// Types for API responses and requests

export interface User {
  id: number;
  username: string;
  is_active: boolean;
}

export interface UserCreate {
  username: string;
  password: string;
}

export interface Link {
  id: number;
  orig_url: string;
  short_id: string;
  short_url: string;
  user_id: number;
  created_at: string;
  expire_at: string;
  is_active: boolean;
}

export interface LinkCreate {
  orig_url: string;
  expire_seconds?: number;
}

export interface LinkListResponse {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  items: Link[];
}

export interface Stats {
  orig_url: string;
  short_url: string;
  last_hour_clicks: number;
  last_day_clicks: number;
  all_clicks: number;
}

export interface StatsListResponse {
  items: Stats[];
}

export interface ApiError {
  detail: string;
}
