import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { BoardMember } from '../types';
import { 
  Users, 
  Camera, 
  Edit3, 
  Plus, 
  Mail, 
  Linkedin, 
  Sparkles, 
  Award, 
  ChevronRight,
  UserCheck,
  Zap
} from 'lucide-react';
import AnimatedStaffScroll from './AnimatedStaffScroll';

export const BoardOfDirectorsSection: React.FC = () => {
  const { data, isEditMode, setEditingMember, addNewBoardMember } = useCms();
  const [selectedFilter, setSelectedFilter] = useState<'semua' | 'komisaris' | 'direksi' | 'manajemen'>('semua');
  const [viewMode, setViewMode] = useState<'grid' | 'animated'>('animated');

  const filteredMembers = data.boardMembers
    .filter((m) => {
      if (selectedFilter === 'semua') return true;
      return m.category === selectedFilter;
    })
    .sort((a, b) => a.order - b.order);

  // Convert BoardMember to StaffMember format untuk AnimatedStaffScroll
  const convertedMembers = filteredMembers.map((member) => ({
    id: member.id,
    name: member.name,
    position: member.title,
    category: member.category === 'komisaris' ? 'Dewan Komisaris' : 
              member.category === 'direksi' ? 'Dewan Direksi' :
              'Manajemen',
    photo: member.photo,
    bio: member.bio || 'Profesional berpengalaman di PT Sidya Sadaya Sejahtera',
    email: member.email || 'info@sidya.co.id',
    phone: member.phone || '',
    linkedin: member.linkedin,
    location: 'Jakarta, Indonesia',
  }));

  return (
    <section id="jajaran-pengurus" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Geometric Balance Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
            Board of Management
          </h2>
          <div className="h-[1px] flex-1 mx-6 bg-slate-200"></div>
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
            Editable Module
          </div>
        </div>

        {/* Section Title & Add Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
              <Users className="w-3 h-3 text-emerald-700" />
              <span>Kepemimpinan &amp; Tata Kelola</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
              Jajaran Pengurus &amp; <span className="font-bold text-emerald-700 italic">Dewan Direksi</span>
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl leading-relaxed">
              Didukung oleh para profesional berintegritas tinggi dengan rekam jejak panjang dalam logistik nasional, manajemen perhajian, dan teknologi informasi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="btn-add-pengurus-direct"
              onClick={() => {
                addNewBoardMember();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-sm shadow-sm transition-all uppercase tracking-wider"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Tambah Pengurus</span>
            </button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-4 border-b border-slate-200">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('semua')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                selectedFilter === 'semua'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Semua ({data.boardMembers.length})
            </button>
            <button
              onClick={() => setSelectedFilter('komisaris')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                selectedFilter === 'komisaris'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Komisaris &amp; Syariah
            </button>
            <button
              onClick={() => setSelectedFilter('direksi')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                selectedFilter === 'direksi'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Dewan Direksi (BOD)
            </button>
            <button
              onClick={() => setSelectedFilter('manajemen')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                selectedFilter === 'manajemen'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Manajemen Eksekutif
            </button>
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setViewMode('animated')}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                viewMode === 'animated'
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
              title="Tampilan animasi scroll"
            >
              <Zap className="w-3.5 h-3.5" />
              Animasi
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === 'grid'
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
              title="Tampilan grid"
            >
              Grid
            </button>
          </div>
        </div>

        {/* Animated Scroll View */}
        {viewMode === 'animated' && convertedMembers.length > 0 && (
          <div className="mb-12 bg-gradient-to-r from-emerald-50 to-blue-50 p-8 rounded-xl border border-emerald-200">
            <AnimatedStaffScroll
              staffList={convertedMembers}
              title="Geser kartu ke kiri untuk melihat semua pengurus"
              autoScroll={true}
              scrollSpeed={30}
            />
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <>
            <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-6">
              Klik <strong>&ldquo;Ubah Foto &amp; Jabatan&rdquo;</strong> untuk kustomisasi instan
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="group relative bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:border-emerald-600/40 hover:shadow-md transition-all flex flex-col"
                >
                  {/* Photo Area with Geometric Frame */}
                  <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden border-b border-slate-100">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                      }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-slate-900/80 text-amber-300 backdrop-blur-sm border border-slate-700 shadow">
                        {member.category === 'komisaris' && 'Dewan Komisaris'}
                        {member.category === 'direksi' && 'Dewan Direksi'}
                        {member.category === 'manajemen' && 'Manajemen'}
                      </span>
                    </div>

                    {/* Quick Edit Button in corner */}
                    <div className="absolute top-2.5 right-2.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingMember(member)}
                        className="p-1.5 rounded-sm bg-white/95 hover:bg-emerald-700 hover:text-white text-slate-800 shadow-sm transition-all flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                        title="Ganti Foto atau Edit Jabatan"
                      >
                        <Edit3 className="w-3 h-3 text-emerald-600 hover:text-white" />
                        <span>Edit</span>
                      </button>
                    </div>

                    {/* Floating Action Strip on Hover */}
                    <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent flex items-center justify-between text-white">
                      <span className="text-[10px] font-semibold text-emerald-300 truncate uppercase tracking-wider">
                        PT Sidya Sadaya Sejahtera
                      </span>
                      <div className="flex items-center gap-1">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="p-1 rounded-sm bg-slate-800/80 hover:bg-emerald-600 text-slate-200 transition-colors"
                            title={`Kirim email ke ${member.name}`}
                          >
                            <Mail className="w-3 h-3" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded-sm bg-slate-800/80 hover:bg-emerald-600 text-slate-200 transition-colors"
                            title="Profil LinkedIn"
                          >
                            <Linkedin className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Body with Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-[10px] text-emerald-700 font-bold mt-1 uppercase tracking-wider">
                        {member.title}
                      </p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    </div>

                    {/* Bottom Surgical Edit Bar */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">
                        #{member.order}
                      </span>
                      <button
                        onClick={() => setEditingMember(member)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 transition-colors uppercase tracking-wider"
                      >
                        <span>Ubah Foto / Data</span>
                        <ChevronRight className="w-3 h-3 text-emerald-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty State if filter yields zero */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200 p-8">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 font-medium text-sm">
              Belum ada data pengurus untuk kategori ini.
            </p>
            <button
              onClick={() => addNewBoardMember()}
              className="mt-3 px-4 py-2 bg-emerald-700 text-white rounded-sm text-xs font-bold uppercase tracking-wider"
            >
              + Tambah Pengurus Sekarang
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
