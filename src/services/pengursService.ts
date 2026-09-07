/**
 * Service for communicating with PHP backend API
 * Handles fetching and saving pengurus data from/to MySQL database
 */

import { EmployeeNode } from '../types';

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

console.log('[Pengurus Service] API Base URL:', API_BASE);

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  updated?: number;
  inserted?: number;
  total_records?: number;
  timestamp?: string;
}

/**
 * Fetch all pengurus from database
 */
export const fetchPengurusFromDatabase = async (): Promise<EmployeeNode[]> => {
  try {
    const response = await fetch(`${API_BASE}/get-pengurus.php`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: ApiResponse<EmployeeNode[]> = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch pengurus');
    }

    return result.data || [];
  } catch (error) {
    console.error('Error fetching pengurus from database:', error);
    throw error;
  }
};

/**
 * Save pengurus data to database
 * Updates existing records and inserts new ones
 */
export const savePengurusToDatabase = async (
  nodes: EmployeeNode[]
): Promise<{ updated: number; inserted: number; total: number }> => {
  try {
    // Prepare data for API
    const payload = nodes.map((node) => ({
      id: node.id,
      code: node.code,
      placeholderName: node.placeholderName,
      roleLabel: node.roleLabel,
      realisticName: node.realisticName,
      officialTitle: node.officialTitle,
      department: node.department,
      level: node.level,
      colorTheme: node.colorTheme,
      avatarUrl: node.avatarUrl,
      avatarKey: node.avatarKey,
      email: node.email,
      phone: node.phone,
      location: node.location,
      responsibilities: node.responsibilities || [],
      parentId: node.parentId || null,
      childrenIds: node.childrenIds || [],
    }));

    const response = await fetch(`${API_BASE}/save-pengurus.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: ApiResponse = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to save pengurus');
    }

    return {
      updated: result.updated || 0,
      inserted: result.inserted || 0,
      total: result.total_records || 0,
    };
  } catch (error) {
    console.error('Error saving pengurus to database:', error);
    throw error;
  }
};

/**
 * Sync pengurus data: fetch from database and update localStorage
 * Called on page load to ensure data is current
 */
export const syncPengurusData = async (): Promise<EmployeeNode[] | null> => {
  try {
    const dbNodes = await fetchPengurusFromDatabase();
    
    if (dbNodes && dbNodes.length > 0) {
      // Save to localStorage for faster access
      localStorage.setItem('org_chart_nodes_data_v2', JSON.stringify(dbNodes));
      localStorage.setItem('org_chart_version', '2.0');
      localStorage.setItem('last_db_sync', new Date().toISOString());
      
      return dbNodes;
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to sync from database, using localStorage:', error);
    return null;
  }
};

/**
 * Check if database is reachable
 * Useful for determining if backend is available
 */
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/get-pengurus.php`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.ok;
  } catch (error) {
    console.warn('Database connection check failed:', error);
    return false;
  }
};
