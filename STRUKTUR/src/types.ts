export type RoleLevel = 'ceo' | 'manager' | 'officer' | 'staff';

export type NodeColorTheme = 'pink' | 'orange' | 'green' | 'blue';

export interface EmployeeNode {
  id: string;
  code: string; // e.g. CEO, MGR-1, MGR-2, FRM-A, FRM-B, SLS-A, SLS-B, WRK-1, etc.
  placeholderName: string;
  roleLabel: string; // e.g. "( CEO )", "( MANAGER )", "( FOREMAN A )", "WORKERS", "SALERS"
  realisticName: string;
  officialTitle: string;
  department: string;
  level: number; // 1, 2, 3, 4
  colorTheme: NodeColorTheme;
  avatarUrl: string;
  avatarKey?: string;
  email: string;
  phone: string;
  location: string;
  responsibilities: string[];
  parentId?: string;
  childrenIds: string[];
}

export type ViewMode = 'image-literal' | 'realistic';
export type FilterDepartment = 'all' | 'executive' | 'management' | 'operations' | 'sales';
