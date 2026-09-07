import React, { createContext, useContext, useState, useEffect } from 'react';
import { SidyaData, BoardMember, CatalogItem, Article } from '../types';
import { initialSidyaData } from '../data/defaultData';

const STORAGE_KEY = 'sidya_platform_cms_data_v1';
const EDIT_MODE_KEY = 'sidya_platform_edit_mode_active';

interface CmsContextType {
  data: SidyaData;
  isEditMode: boolean;
  toggleEditMode: () => void;
  // Board Members management
  editingMember: BoardMember | null;
  setEditingMember: (member: BoardMember | null) => void;
  saveBoardMember: (member: BoardMember) => void;
  deleteBoardMember: (id: string) => void;
  addNewBoardMember: () => void;
  // Articles management
  editingArticle: Article | null;
  setEditingArticle: (article: Article | null) => void;
  saveArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  addNewArticle: () => void;
  // Full CMS Admin Drawer / Modal
  isCmsModalOpen: boolean;
  setIsCmsModalOpen: (open: boolean) => void;
  activeCmsTab: 'artikel' | 'pengurus' | 'profil' | 'aplikasi' | 'katalog' | 'kontak' | 'backup';
  setActiveCmsTab: (tab: 'artikel' | 'pengurus' | 'profil' | 'aplikasi' | 'katalog' | 'kontak' | 'backup') => void;
  // General Updates
  updateCompanyProfile: (company: Partial<SidyaData['company']>) => void;
  updateContactInfo: (contact: Partial<SidyaData['contact']>) => void;
  updateAppsInfo: (apps: Partial<SidyaData['apps']>) => void;
  saveCatalogItem: (item: CatalogItem) => void;
  deleteCatalogItem: (id: string) => void;
  addNewCatalogItem: () => void;
  // System actions
  resetToDefaults: () => void;
  exportDataAsJson: () => void;
  importDataFromJson: (jsonStr: string) => boolean;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SidyaData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const version = localStorage.getItem('sidya_cms_version');
      
      // Force reset to new data if version mismatch
      if (version !== '2.0') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem('sidya_cms_version', '2.0');
        return initialSidyaData;
      }
      
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored CMS data:', e);
      localStorage.removeItem(STORAGE_KEY);
    }
    localStorage.setItem('sidya_cms_version', '2.0');
    return initialSidyaData;
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(EDIT_MODE_KEY);
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  const [editingMember, setEditingMember] = useState<BoardMember | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCmsModalOpen, setIsCmsModalOpen] = useState(false);
  const [activeCmsTab, setActiveCmsTab] = useState<'artikel' | 'pengurus' | 'profil' | 'aplikasi' | 'katalog' | 'kontak' | 'backup'>('artikel');
  const [notification, setNotification] = useState<string | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(EDIT_MODE_KEY, JSON.stringify(isEditMode));
    } catch (e) {
      console.error('Failed to save edit mode status:', e);
    }
  }, [isEditMode]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => {
      const next = !prev;
      showNotification(next ? 'Mode Edit WordPress Aktif! Anda dapat langsung mengubah foto, jabatan, dan teks.' : 'Mode Edit dinonaktifkan. Menampilkan tampilan publik.');
      return next;
    });
  };

  const saveBoardMember = (member: BoardMember) => {
    setData((prev) => {
      const exists = prev.boardMembers.some((m) => m.id === member.id);
      let updated: BoardMember[];
      if (exists) {
        updated = prev.boardMembers.map((m) => (m.id === member.id ? member : m));
      } else {
        updated = [...prev.boardMembers, member];
      }
      return { ...prev, boardMembers: updated };
    });
    setEditingMember(null);
    showNotification(`Jajaran pengurus "${member.name}" berhasil disimpan!`);
  };

  const deleteBoardMember = (id: string) => {
    setData((prev) => ({
      ...prev,
      boardMembers: prev.boardMembers.filter((m) => m.id !== id)
    }));
    showNotification('Pengurus telah berhasil dihapus.');
  };

  const addNewBoardMember = () => {
    const newMember: BoardMember = {
      id: `board-${Date.now()}`,
      name: 'Nama Pengurus Lengkap, Gelar',
      title: 'Jabatan Baru',
      category: 'direksi',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Tuliskan deskripsi pengalaman, amanah, dan peran strategis pengurus di PT Sidya Sadaya Sejahtera.',
      linkedin: 'https://linkedin.com',
      email: 'pengurus@sidya.co.id',
      order: data.boardMembers.length + 1
    };
    setEditingMember(newMember);
  };

  const updateCompanyProfile = (companyUpdate: Partial<SidyaData['company']>) => {
    setData((prev) => ({
      ...prev,
      company: { ...prev.company, ...companyUpdate }
    }));
    showNotification('Profil perusahaan berhasil diperbarui!');
  };

  const updateContactInfo = (contactUpdate: Partial<SidyaData['contact']>) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contactUpdate }
    }));
    showNotification('Informasi kontak berhasil diperbarui!');
  };

  const updateAppsInfo = (appsUpdate: Partial<SidyaData['apps']>) => {
    setData((prev) => ({
      ...prev,
      apps: { ...prev.apps, ...appsUpdate }
    }));
    showNotification('Informasi aplikasi Sidya berhasil diperbarui!');
  };

  const saveCatalogItem = (item: CatalogItem) => {
    setData((prev) => {
      const exists = prev.catalog.some((c) => c.id === item.id);
      const updated = exists ? prev.catalog.map((c) => (c.id === item.id ? item : c)) : [...prev.catalog, item];
      return { ...prev, catalog: updated };
    });
    showNotification(`Item katalog "${item.name}" berhasil disimpan!`);
  };

  const deleteCatalogItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      catalog: prev.catalog.filter((c) => c.id !== id)
    }));
    showNotification('Item katalog berhasil dihapus.');
  };

  const addNewCatalogItem = () => {
    const newItem: CatalogItem = {
      id: `cat-${Date.now()}`,
      name: 'Item Perlengkapan Baru',
      category: 'koper',
      description: 'Deskripsi spesifikasi perlengkapan haji dan umroh serta keunggulannya.',
      image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=600&q=80',
      customLogoAvailable: true,
      minOrder: '20 Unit',
      specifications: ['Spesifikasi mutu 1', 'Spesifikasi mutu 2']
    };
    saveCatalogItem(newItem);
  };

  const saveArticle = (article: Article) => {
    setData((prev) => {
      const exists = prev.articles.some((a) => a.id === article.id);
      const updated = exists ? prev.articles.map((a) => (a.id === article.id ? article : a)) : [...prev.articles, article];
      return { ...prev, articles: updated };
    });
    setEditingArticle(null);
    showNotification(`Artikel "${article.title}" berhasil disimpan!`);
  };

  const deleteArticle = (id: string) => {
    setData((prev) => ({
      ...prev,
      articles: prev.articles.filter((a) => a.id !== id)
    }));
    showNotification('Artikel berhasil dihapus.');
  };

  const addNewArticle = () => {
    const newArticle: Article = {
      id: `art-${Date.now()}`,
      title: 'Judul Artikel Baru',
      slug: 'judul-artikel-baru',
      category: 'Tips & Trik',
      featured: false,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Ringkasan singkat artikel untuk ditampilkan di daftar artikel.',
      content: 'Konten lengkap artikel Anda di sini. Anda dapat menulis berbagai paragraf, tips, dan informasi berguna untuk jamaah.',
      author: 'Admin Sidya',
      publishedDate: new Date().toISOString().split('T')[0],
      readTime: '5 menit'
    };
    setEditingArticle(newArticle);
  };

  const resetToDefaults = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh data web dan pengurus ke data awal (default)? Perubahan Anda akan di-reset.')) {
      setData(initialSidyaData);
      localStorage.removeItem(STORAGE_KEY);
      showNotification('Seluruh data berhasil dikembalikan ke pengaturan awal.');
    }
  };

  const exportDataAsJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `sidya-backup-cms-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('File backup JSON berhasil diunduh!');
  };

  const importDataFromJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.company && parsed.boardMembers && parsed.apps) {
        setData(parsed);
        showNotification('Data website berhasil diimpor!');
        return true;
      } else {
        alert('Format file JSON tidak valid untuk skema Sidya.');
        return false;
      }
    } catch {
      alert('Gagal memproses file JSON. Pastikan format dokumen benar.');
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        data,
        isEditMode,
        toggleEditMode,
        editingMember,
        setEditingMember,
        saveBoardMember,
        deleteBoardMember,
        addNewBoardMember,
        editingArticle,
        setEditingArticle,
        saveArticle,
        deleteArticle,
        addNewArticle,
        isCmsModalOpen,
        setIsCmsModalOpen,
        activeCmsTab,
        setActiveCmsTab,
        updateCompanyProfile,
        updateContactInfo,
        updateAppsInfo,
        saveCatalogItem,
        deleteCatalogItem,
        addNewCatalogItem,
        resetToDefaults,
        exportDataAsJson,
        importDataFromJson,
        notification,
        showNotification,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
