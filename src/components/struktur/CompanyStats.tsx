import React from 'react';
import { EmployeeNode } from '../../types';
import { Users, ShieldCheck, Factory, TrendingUp, MapPin } from 'lucide-react';

interface CompanyStatsProps {
  nodes: EmployeeNode[];
  onFilterDivision: (deptKeyword: string) => void;
}

export const CompanyStats: React.FC<CompanyStatsProps> = ({ nodes, onFilterDivision }) => {
  const totalEmployees = nodes.length;
  const execCount = nodes.filter((n) => n.department === 'Eksekutif').length;
  const opsCount = nodes.filter((n) => n.department === 'Operasional').length;
  const salesCount = nodes.filter((n) => n.department.includes('Penjualan') || n.department.includes('Pemasaran')).length;

  const cards = [
    {
      title: 'Dewan Eksekutif',
      count: execCount,
      role: 'CEO & Direksi Eksekutif',
      icon: ShieldCheck,
      color: 'from-rose-500 to-pink-600',
      badge: 'bg-rose-50 text-rose-700 border-rose-200/80',
      keyword: 'Eksekutif',
    },
    {
      title: 'Divisi Operasional',
      count: opsCount,
      role: '1 Manager, 2 Foreman, 4 Workers',
      icon: Factory,
      color: 'from-emerald-500 to-teal-600',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      keyword: 'Operasional',
    },
    {
      title: 'Divisi Penjualan & Komersial',
      count: salesCount,
      role: '1 Manager, 2 Sales Officers, 2 Salers',
      icon: TrendingUp,
      color: 'from-blue-600 to-indigo-600',
      badge: 'bg-blue-50 text-blue-700 border-blue-200/80',
      keyword: 'Pemasaran',
    },
    {
      title: 'Total Sumber Daya Manusia',
      count: totalEmployees,
      role: '4 Tingkatan Hierarki Struktural',
      icon: Users,
      color: 'from-indigo-600 to-violet-600',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      keyword: 'all',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 my-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            onClick={() => onFilterDivision(card.keyword)}
            className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${card.badge}`}>
                {card.count} Personel
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {card.title}
            </h4>
            <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">{card.role}</p>
          </div>
        );
      })}
    </div>
  );
};
