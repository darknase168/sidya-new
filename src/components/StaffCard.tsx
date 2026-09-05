import React, { useState } from 'react';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';

interface StaffMember {
  id: number;
  name: string;
  position: string;
  category: string;
  photo: string;
  bio: string;
  email: string;
  phone: string;
  linkedin?: string;
  location?: string;
}

interface StaffCardProps {
  staff: StaffMember;
  onHover: (staffId: number | null) => void;
  isHovered: boolean;
}

export default function StaffCard({ staff, onHover, isHovered }: StaffCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-80 h-96"
      onMouseEnter={() => {
        onHover(staff.id);
        setShowDetails(true);
      }}
      onMouseLeave={() => {
        onHover(null);
        setShowDetails(false);
      }}
    >
      {/* Kartu Staff */}
      <div className="w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group">
        {/* Gambar */}
        <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-emerald-100 to-slate-100">
          {staff.photo ? (
            <img
              src={staff.photo}
              alt={staff.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-blue-400">
              <span className="text-6xl text-white">👤</span>
            </div>
          )}

          {/* Badge Kategori */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
              {staff.category}
            </span>
          </div>

          {/* Hover Overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white font-bold text-center px-4">👆 Lihat Detail</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5 bg-white">
          <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1">
            {staff.name}
          </h3>
          <p className="text-sm text-emerald-600 font-semibold mb-3">
            {staff.position}
          </p>

          {/* Bio Short */}
          <p className="text-xs text-slate-600 line-clamp-2 mb-4">
            {staff.bio}
          </p>

          {/* Contact Icons */}
          <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
            {staff.email && (
              <a
                href={`mailto:${staff.email}`}
                className="text-slate-400 hover:text-emerald-600 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            {staff.phone && (
              <a
                href={`tel:${staff.phone}`}
                className="text-slate-400 hover:text-emerald-600 transition-colors"
                title="Telepon"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
            {staff.linkedin && (
              <a
                href={staff.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-600 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Detail Popup - Muncul saat Hover */}
      {showDetails && isHovered && (
        <div className="absolute left-full top-0 ml-3 w-80 bg-white rounded-xl shadow-2xl p-6 z-50 border border-emerald-200 animate-fadeIn">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <img
              src={staff.photo || '👤'}
              alt={staff.name}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800">{staff.name}</h3>
              <p className="text-emerald-600 font-semibold text-sm">{staff.position}</p>
              <span className="inline-block mt-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">
                {staff.category}
              </span>
            </div>
          </div>

          {/* Bio Lengkap */}
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">{staff.bio}</p>

          {/* Contact Info */}
          <div className="space-y-2 mb-4 pt-4 border-t border-slate-200">
            {staff.email && (
              <a
                href={`mailto:${staff.email}`}
                className="flex items-center gap-3 text-sm text-slate-600 hover:text-emerald-600 transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span className="break-all">{staff.email}</span>
              </a>
            )}
            {staff.phone && (
              <a
                href={`tel:${staff.phone}`}
                className="flex items-center gap-3 text-sm text-slate-600 hover:text-emerald-600 transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>{staff.phone}</span>
              </a>
            )}
            {staff.location && (
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>{staff.location}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-slate-200">
            {staff.linkedin && (
              <a
                href={staff.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors text-center"
              >
                LinkedIn
              </a>
            )}
            <a
              href={`mailto:${staff.email}`}
              className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors text-center"
            >
              Email
            </a>
          </div>

          {/* Arrow indicator */}
          <div className="absolute -left-2 top-8 w-4 h-4 bg-white border-l border-t border-emerald-200 transform rotate-45"></div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}