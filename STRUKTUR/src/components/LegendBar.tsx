import React from 'react';
import { NodeColorTheme } from '../types';

interface LegendBarProps {
  activeTheme?: NodeColorTheme | null;
  onSelectTheme: (theme: NodeColorTheme | null) => void;
}

export const LegendBar: React.FC<LegendBarProps> = ({ activeTheme, onSelectTheme }) => {
  const items: {
    theme: NodeColorTheme;
    label: string;
    description: string;
    badgeBg: string;
    ringColor: string;
  }[] = [
    {
      theme: 'pink',
      label: 'Level 1: CEO',
      description: 'Pimpinan Eksekutif Tertinggi',
      badgeBg: 'bg-rose-500',
      ringColor: 'border-rose-400',
    },
    {
      theme: 'orange',
      label: 'Level 2: Manager',
      description: 'Manajemen Divisi & Operasional',
      badgeBg: 'bg-orange-500',
      ringColor: 'border-orange-400',
    },
    {
      theme: 'green',
      label: 'Level 3: Foreman / Sales Officer',
      description: 'Supervisor Lapangan & Sales Regional',
      badgeBg: 'bg-emerald-500',
      ringColor: 'border-emerald-400',
    },
    {
      theme: 'blue',
      label: 'Level 4: Workers & Salers',
      description: 'Operator Produksi & Pelaksana Sales',
      badgeBg: 'bg-sky-500',
      ringColor: 'border-sky-400',
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 mb-3 border-b border-slate-100">
        <span className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-2">
          Panduan Warna Hierarki (Sesuai Diagram)
        </span>
        {activeTheme && (
          <button
            onClick={() => onSelectTheme(null)}
            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            ✕ Reset Filter Level
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        {items.map((item) => {
          const isCurrent = activeTheme === item.theme;
          return (
            <button
              key={item.theme}
              onClick={() => onSelectTheme(isCurrent ? null : item.theme)}
              className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all duration-150 ${
                isCurrent
                  ? 'bg-indigo-50/70 border border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-white hover:bg-slate-50/80 border border-slate-200/70'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full ${item.badgeBg} ring-2 ${item.ringColor} shadow-xs flex-shrink-0`}
              />
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-slate-900 leading-tight truncate">
                  {item.label}
                </div>
                <div className="text-[10.5px] font-medium text-slate-500 leading-tight truncate mt-0.5">
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
