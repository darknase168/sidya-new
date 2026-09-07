/**
 * Service for communicating with PHP backend API
 * Handles fetching and saving katalog items from/to MySQL database
 */

import { CatalogItem } from '../types';

// Determine API base URL based on environment
const getApiBaseUrl = (): string => {
  // Check if VITE_API_URL is set (for Vercel deployment pointing to Hostinger API)
  const envApiUrl = import.meta.env.VITE_API_URL;
  if (envApiUrl) {
    return envApiUrl;
  }
  
  const hostname = window.location.hostname;
  const port = window.location.port;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Local development
    return `http://${hostname}:${port || 3000}/api`;
  } else {
    // Production - same domain
    return `${window.location.origin}/api`;
  }
};

const API_BASE = getApiBaseUrl();

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  updated?: number;
  inserted?: number;
  deleted?: number;
  total_records?: number;
  timestamp?: string;
}

/**
 * Fetch all katalog items from database
 * Optional: filter by category
 */
export const fetchKatalogFromDatabase = async (
  category?: string
): Promise<CatalogItem[]> => {
  try {
    let url = `${API_BASE}/get-katalog.php`;
    
    if (category && category !== 'all') {
      url += `?category=${encodeURIComponent(category)}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: ApiResponse<CatalogItem[]> = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch katalog');
    }

    return result.data || [];
  } catch (error) {
    console.error('Error fetching katalog from database:', error);
    throw error;
  }
};

/**
 * Save katalog items to database
 * Updates existing and inserts new ones
 */
export const saveKatalogToDatabase = async (
  items: CatalogItem[]
): Promise<{ updated: number; inserted: number; deleted: number; total: number }> => {
  try {
    const response = await fetch(`${API_BASE}/save-katalog.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: ApiResponse = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to save katalog');
    }

    return {
      updated: result.updated || 0,
      inserted: result.inserted || 0,
      deleted: result.deleted || 0,
      total: result.total_records || 0,
    };
  } catch (error) {
    console.error('Error saving katalog to database:', error);
    throw error;
  }
};

/**
 * Sync katalog data: fetch from database and update localStorage
 * Called on page load to ensure data is current
 */
export const syncKatalogData = async (
  category?: string
): Promise<CatalogItem[] | null> => {
  try {
    const dbItems = await fetchKatalogFromDatabase(category);
    
    if (dbItems && dbItems.length > 0) {
      // Save to localStorage for faster access
      localStorage.setItem('catalog_data_v2', JSON.stringify(dbItems));
      localStorage.setItem('catalog_version', '2.0');
      localStorage.setItem('last_catalog_sync', new Date().toISOString());
      
      return dbItems;
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to sync katalog from database, using localStorage:', error);
    return null;
  }
};

/**
 * Check if database is reachable for katalog
 */
export const checkKatalogDatabaseConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/get-katalog.php`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.ok;
  } catch (error) {
    console.warn('Katalog database connection check failed:', error);
    return false;
  }
};
