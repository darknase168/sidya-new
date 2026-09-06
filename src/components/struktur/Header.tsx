import React from 'react';
import { ViewMode, FilterDepartment } from '../../types';
import {
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Printer,
  Building2,
  Users,
  Layers,
  Sparkles,
  Eye,
} from 'lucide-react';

interface HeaderProps {
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterDept: FilterDepartment;
  onFilterDeptChange: (dept: FilterDepartment) => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onPrint: () => void;
  totalMembers: number;
  companyName: string;
  onUpdateCompanyName: (name: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onToggleViewMode,
  searchQuery,
  onSearchChange,
  filterDept,
  onFilterDeptChange,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onPrint,
  totalMembers,
  companyName,
  onUpdateCompanyName,
}) => {
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [titleInput, setTitleInput] = React.useState(companyName);

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleInput.trim()) {
      onUpdateCompanyName(titleInput.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Brand & Actions Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 p-0.5 shadow-sm">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div>
              {isEditingTitle ? (
                <form onSubmit={handleTitleSubmit} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    className="text-base font-bold text-slate-900 border border-indigo-500 rounded-lg px-2.5 py-0.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
                    autoFocus
                    onBlur={handleTitleSubmit}
                  />
                </form>
              ) : (
                <h1
                  onClick={() => setIsEditingTitle(true)}
                  className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors"
                  title="Klik untuk mengubah nama perusahaan"
                >
                  {companyName}
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 px-2 py-0.5 rounded-md transition-colors">
                    Edit
                  </span>
                </h1>
              )}
              <p className="text-[12px] font-medium text-slate-500">
                Bagan Struktur & Hierarki Organisasi Perusahaan
              </p>
            </div>
          </div>

          {/* Quick Stats on Mobile/Desktop */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200/80">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-bold text-slate-900">{totalMembers}</span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">Anggota</span>
          </div>
        </div>

        {/* View Mode Switcher + Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 text-xs">
            <button
              id="viewmode-literal-btn"
              onClick={() => onToggleViewMode('image-literal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'image-literal'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Sesuai Gambar</span>
            </button>
            <button
              id="viewmode-realistic-btn"
              onClick={() => onToggleViewMode('realistic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'realistic'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Nama Riil & Gelar</span>
            </button>
          </div>

          {/* Zoom & Canvas Actions */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 text-xs">
            <button
              id="zoom-out-btn"
              onClick={onZoomOut}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
              title="Perkecil (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-1.5 text-[11px] font-bold text-slate-700 min-w-[42px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              id="zoom-in-btn"
              onClick={onZoomIn}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
              title="Perbesar (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-slate-300 mx-0.5" />
            <button
              id="zoom-reset-btn"
              onClick={onResetZoom}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
              title="Reset Zoom (100%)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Print/Download Button */}
          <button
            id="print-chart-btn"
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-xl shadow-xs transition-colors"
            title="Cetak atau Simpan PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* Secondary Bar: Search & Department Filters */}
      <div className="bg-slate-50/80 border-t border-slate-200/60 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="search-employee-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama, jabatan (CEO, Foreman, dsb.)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Department Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mr-1 flex-shrink-0">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              Filter:
            </span>
            {[
              { id: 'all', label: 'Semua Posisi' },
              { id: 'executive', label: 'Eksekutif (CEO)' },
              { id: 'management', label: 'Manajemen' },
              { id: 'operations', label: 'Operasional & Foreman' },
              { id: 'sales', label: 'Sales & Komersial' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => onFilterDeptChange(f.id as FilterDepartment)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterDept === f.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
