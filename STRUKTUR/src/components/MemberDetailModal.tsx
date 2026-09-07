import React, { useState, useRef } from 'react';
import { EmployeeNode, ViewMode } from '../types';
import { EmployeeAvatar } from './EmployeeAvatar';
import { REAL_AVATAR_PRESETS } from '../data/orgData';
import {
  X,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Save,
  UserCheck,
  Building2,
  Camera,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';

interface MemberDetailModalProps {
  node: EmployeeNode | null;
  allNodes: EmployeeNode[];
  viewMode: ViewMode;
  onClose: () => void;
  onSelectNode: (node: EmployeeNode) => void;
  onUpdateNode: (updatedNode: EmployeeNode) => void;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  node,
  allNodes,
  viewMode,
  onClose,
  onSelectNode,
  onUpdateNode,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<EmployeeNode>>({});
  const [photoTab, setPhotoTab] = useState<'presets' | 'upload' | 'url'>('presets');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!node) return null;

  const parentNode = node.parentId ? allNodes.find((n) => n.id === node.parentId) : null;
  const childNodes = allNodes.filter((n) => node.childrenIds.includes(n.id));

  const startEdit = () => {
    setEditForm({
      avatarUrl: node.avatarUrl,
      placeholderName: node.placeholderName,
      realisticName: node.realisticName,
      officialTitle: node.officialTitle,
      department: node.department,
      email: node.email,
      phone: node.phone,
      location: node.location,
    });
    setUploadError(null);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateNode({
      ...node,
      ...editForm,
    } as EmployeeNode);
    setIsEditing(false);
  };

  const handleFileUpload = (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith('image/')) {
      setUploadError('Harap pilih file gambar (JPG, PNG, WEBP, atau GIF).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Ukuran gambar maksimal adalah 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setEditForm((prev) => ({ ...prev, avatarUrl: dataUrl }));
      }
    };
    reader.onerror = () => {
      setUploadError('Gagal membaca file gambar.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleResetPhoto = () => {
    const defaultItem = allNodes.find((n) => n.id === node.id);
    if (defaultItem) {
      setEditForm((prev) => ({ ...prev, avatarUrl: defaultItem.avatarUrl }));
    }
  };

  const themeBadges = {
    pink: 'bg-rose-50 text-rose-700 border-rose-200/80',
    orange: 'bg-orange-50 text-orange-700 border-orange-200/80',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    blue: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
  }[node.colorTheme];

  const currentAvatarUrl = isEditing ? editForm.avatarUrl || node.avatarUrl : node.avatarUrl;
  const currentDisplayName = isEditing
    ? (viewMode === 'image-literal' ? editForm.placeholderName : editForm.realisticName) || node.realisticName
    : viewMode === 'image-literal' ? node.placeholderName : node.realisticName;

  return (
    <div
      id="member-detail-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="member-detail-modal"
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-member-detail-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Tutup detail anggota"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Avatar & Basic Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-100">
          {/* Avatar with change action button */}
          <div className="relative group flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 ring-4 ring-slate-100 shadow-md flex items-center justify-center">
              <EmployeeAvatar
                avatarUrl={currentAvatarUrl}
                name={currentDisplayName}
                size={96}
                className="w-full h-full object-cover"
              />
            </div>

            {!isEditing ? (
              <button
                onClick={startEdit}
                className="absolute inset-0 rounded-full bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-medium"
                title="Klik untuk ubah foto & profil"
              >
                <Camera className="w-5 h-5 mb-0.5" />
                <span>Ganti Foto</span>
              </button>
            ) : (
              <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1.5 rounded-full shadow-md">
                <Camera className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${themeBadges}`}>
                {node.roleLabel}
              </span>
              <span className="px-2.5 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded-md">
                Kode: {node.code}
              </span>
              <span className="px-2.5 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded-md">
                Level {node.level}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {currentDisplayName}
            </h3>
            <p className="text-sm font-semibold text-slate-600 mt-0.5">
              {isEditing ? editForm.officialTitle : node.officialTitle}
            </p>
            <p className="text-xs font-medium text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              Divisi: {isEditing ? editForm.department : node.department}
            </p>
          </div>

          <div>
            {!isEditing ? (
              <button
                id="edit-member-btn"
                onClick={startEdit}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors border border-transparent hover:border-indigo-100"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Data & Foto
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  id="save-member-btn"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  Simpan
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Editing Section */}
        {isEditing ? (
          <div className="py-5 space-y-6">
            {/* PHOTO EDITING SECTION */}
            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                    Pengaturan Foto Profil (Real Image)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={handleResetPhoto}
                  className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-indigo-600"
                  title="Kembalikan foto ke asal"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Foto</span>
                </button>
              </div>

              {/* Tabs for changing photo */}
              <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200/80 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setPhotoTab('presets')}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    photoTab === 'presets'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pilihan Foto Real</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoTab('upload')}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    photoTab === 'upload'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Unggah File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoTab('url')}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    photoTab === 'url'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Tautan URL</span>
                </button>
              </div>

              {/* TAB 1: PRESET REAL HEADSHOTS */}
              {photoTab === 'presets' && (
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] text-slate-500">
                    Pilih salah satu foto riil profesional dari koleksi mock data berikut:
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 max-h-48 overflow-y-auto p-1">
                    {REAL_AVATAR_PRESETS.map((preset) => {
                      const isSelected = editForm.avatarUrl === preset.url;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setEditForm((prev) => ({ ...prev, avatarUrl: preset.url }))}
                          className={`group relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                            isSelected
                              ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm scale-95'
                              : 'border-slate-200 hover:border-indigo-300'
                          }`}
                          title={`${preset.label} (${preset.roleHint})`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center text-white">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: FILE UPLOAD & DRAG DROP */}
              {photoTab === 'upload' && (
                <div className="pt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-indigo-500 bg-indigo-50/50'
                        : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="w-10 h-10 mx-auto rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-800">
                      Tarik & lepas foto ke sini, atau klik untuk memilih file
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Mendukung format JPG, PNG, WEBP (Maksimal 5MB)
                    </p>
                  </div>
                  {uploadError && (
                    <p className="text-xs text-rose-500 font-medium mt-1.5 text-center">
                      {uploadError}
                    </p>
                  )}
                </div>
              )}

              {/* TAB 3: CUSTOM IMAGE URL */}
              {photoTab === 'url' && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-[11px] font-medium text-slate-600">
                    Masukkan URL Gambar Foto:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={editForm.avatarUrl || ''}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, avatarUrl: e.target.value }))}
                      className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden"
                    />
                    {editForm.avatarUrl && (
                      <button
                        type="button"
                        onClick={() => setEditForm((prev) => ({ ...prev, avatarUrl: '' }))}
                        className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Tips: Gunakan tautan langsung gambar HTTPS dari Unsplash atau sumber foto lainnya.
                  </p>
                </div>
              )}
            </div>

            {/* EMPLOYEE DATA FIELDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">
                  Nama Asli / Riil Karyawan
                </label>
                <input
                  type="text"
                  value={editForm.realisticName || ''}
                  onChange={(e) => setEditForm({ ...editForm, realisticName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">
                  Nama Format Gambar (NAME LASTNAME)
                </label>
                <input
                  type="text"
                  value={editForm.placeholderName || ''}
                  onChange={(e) => setEditForm({ ...editForm, placeholderName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">
                  Jabatan / Posisi Resmi
                </label>
                <input
                  type="text"
                  value={editForm.officialTitle || ''}
                  onChange={(e) => setEditForm({ ...editForm, officialTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Divisi / Departemen</label>
                <input
                  type="text"
                  value={editForm.department || ''}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Lokasi Kerja</label>
                <input
                  type="text"
                  value={editForm.location || ''}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Email Resmi</label>
                <input
                  type="email"
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Nomor Telepon / WhatsApp</label>
                <input
                  type="text"
                  value={editForm.phone || ''}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
              >
                Simpan Semua Perubahan
              </button>
            </div>
          </div>
        ) : (
          /* Viewing Details Mode */
          <div className="py-5 space-y-6">
            {/* Contact & Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                <Mail className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-slate-400 text-[10px] font-medium">Email Kantor</div>
                  <div className="font-semibold text-slate-800 truncate">{node.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-slate-400 text-[10px] font-medium">Telepon / WhatsApp</div>
                  <div className="font-semibold text-slate-800 truncate">{node.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 sm:col-span-2">
                <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-slate-400 text-[10px] font-medium">Penempatan Kerja</div>
                  <div className="font-semibold text-slate-800 truncate">{node.location}</div>
                </div>
              </div>
            </div>

            {/* Responsibilities */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                Tanggung Jawab Utama & Peran
              </h4>
              <ul className="space-y-2">
                {node.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reporting Line (Superior & Subordinates) */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                Jalur Pelaporan & Bawahan Langsung
              </h4>

              {parentNode && (
                <div className="text-xs">
                  <span className="text-slate-400 text-[11px] block mb-1">Atasan Langsung:</span>
                  <button
                    onClick={() => onSelectNode(parentNode)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 hover:bg-indigo-50/50 border border-slate-200/70 hover:border-indigo-200 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                        <EmployeeAvatar
                          avatarUrl={parentNode.avatarUrl}
                          name={parentNode.realisticName}
                          size={32}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {viewMode === 'image-literal' ? parentNode.placeholderName : parentNode.realisticName}
                        </div>
                        <div className="text-[11px] text-slate-500">{parentNode.roleLabel} • {parentNode.officialTitle}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                  </button>
                </div>
              )}

              {childNodes.length > 0 && (
                <div className="text-xs">
                  <span className="text-slate-400 text-[11px] block mb-1">Bawahan Langsung ({childNodes.length} Orang):</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {childNodes.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => onSelectNode(child)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 hover:bg-indigo-50/50 border border-slate-200/70 hover:border-indigo-200 transition-all text-left group"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                            <EmployeeAvatar
                              avatarUrl={child.avatarUrl}
                              name={child.realisticName}
                              size={28}
                            />
                          </div>
                          <div className="truncate">
                            <div className="font-semibold text-slate-900 text-[11px] truncate group-hover:text-indigo-600 transition-colors">
                              {viewMode === 'image-literal' ? child.placeholderName : child.realisticName}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">{child.roleLabel}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
