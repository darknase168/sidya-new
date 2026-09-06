import React from 'react';
import { EmployeeNode, ViewMode } from '../../types';
import { EmployeeAvatar } from './EmployeeAvatar';

interface OrgNodeCardProps {
  node: EmployeeNode;
  viewMode: ViewMode;
  isSelected?: boolean;
  isHighlighted?: boolean;
  onClick: (node: EmployeeNode) => void;
}

export const OrgNodeCard: React.FC<OrgNodeCardProps> = ({
  node,
  viewMode,
  isSelected,
  isHighlighted,
  onClick,
}) => {
  // Sleek theme color definitions for rings, pins, and badges
  const themeConfig = {
    pink: {
      ringGradient: 'from-rose-500 via-rose-600 to-pink-600',
      pinColor: '#e11d48',
      badgeBg: 'bg-gradient-to-r from-rose-600 to-pink-600',
      shadowColor: 'shadow-rose-500/20',
      activeRing: 'ring-rose-500',
      glow: 'from-rose-500 to-pink-500',
    },
    orange: {
      ringGradient: 'from-amber-500 via-orange-500 to-orange-600',
      pinColor: '#ea580c',
      badgeBg: 'bg-gradient-to-r from-orange-500 to-amber-600',
      shadowColor: 'shadow-orange-500/20',
      activeRing: 'ring-orange-500',
      glow: 'from-amber-500 to-orange-500',
    },
    green: {
      ringGradient: 'from-emerald-500 via-emerald-600 to-teal-600',
      pinColor: '#059669',
      badgeBg: 'bg-gradient-to-r from-emerald-600 to-teal-600',
      shadowColor: 'shadow-emerald-500/20',
      activeRing: 'ring-emerald-500',
      glow: 'from-emerald-500 to-teal-500',
    },
    blue: {
      ringGradient: 'from-sky-500 via-blue-600 to-indigo-600',
      pinColor: '#2563eb',
      badgeBg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      shadowColor: 'shadow-blue-500/20',
      activeRing: 'ring-indigo-500',
      glow: 'from-sky-500 to-indigo-500',
    },
  }[node.colorTheme];

  const isLevel4 = node.level === 4;
  const isCeo = node.level === 1;
  const isManager = node.level === 2;

  // Sizes tailored to hierarchy levels
  const avatarSize = isCeo ? 92 : isManager ? 82 : isLevel4 ? 64 : 76;
  const outerCircleSize = isCeo ? 'w-[104px] h-[104px]' : isManager ? 'w-[94px] h-[94px]' : isLevel4 ? 'w-[74px] h-[74px]' : 'w-[86px] h-[86px]';
  const badgeWidth = isCeo ? 'w-44 sm:w-48' : isManager ? 'w-40 sm:w-44' : isLevel4 ? 'w-24 sm:w-28' : 'w-36 sm:w-40';

  const displayName = viewMode === 'image-literal' ? node.placeholderName : node.realisticName;
  const displayRole = viewMode === 'image-literal' ? node.roleLabel : node.officialTitle;

  return (
    <div
      id={`org-node-${node.id}`}
      onClick={() => onClick(node)}
      className={`relative flex flex-col items-center cursor-pointer transition-all duration-200 ease-out group hover:-translate-y-1 select-none ${
        isSelected ? 'scale-105 z-30' : 'z-10'
      } ${isHighlighted ? 'scale-105 z-30' : ''}`}
    >
      {/* Circle Avatar with Pin Style Ring */}
      <div className="relative flex flex-col items-center">
        {/* Subtle glowing aura on hover or selection */}
        <div
          className={`absolute inset-0 rounded-full blur-md opacity-25 group-hover:opacity-75 transition-opacity ${
            themeConfig.badgeBg
          } ${isSelected || isHighlighted ? 'opacity-90 ring-4 ' + themeConfig.activeRing : ''}`}
        />

        {/* Outer Circular Gradient Ring */}
        <div
          className={`relative rounded-full p-[4px] bg-gradient-to-tr ${themeConfig.ringGradient} ${outerCircleSize} flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Inner White Cutout Background */}
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden ring-1 ring-white/80 shadow-inner">
            <EmployeeAvatar avatarUrl={node.avatarUrl} name={displayName} size={avatarSize} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Pin Stem Pointer (Triangle connection between circle and badge) */}
        <div
          className="w-0 h-0 border-x-[7px] border-x-transparent border-t-[9px] -mt-[1px] z-10 transition-transform duration-200 group-hover:translate-y-0.5"
          style={{ borderTopColor: themeConfig.pinColor }}
        />
      </div>

      {/* Badge Box (Rounded Rectangle) */}
      <div
        className={`-mt-1.5 ${badgeWidth} ${themeConfig.badgeBg} text-white rounded-xl px-2.5 py-1.5 text-center shadow-md ${themeConfig.shadowColor} border-t border-white/30 border-b border-black/10 transition-all duration-200 group-hover:shadow-lg`}
      >
        {isLevel4 ? (
          // Level 4 (Workers / Salers): Single prominent label like in the image
          <div className="text-[12px] sm:text-[13px] font-bold tracking-wider uppercase leading-tight py-0.5 drop-shadow-xs">
            {viewMode === 'image-literal' ? node.roleLabel : node.realisticName}
          </div>
        ) : (
          // Levels 1, 2, 3: Name on top, Role below in parentheses
          <>
            <div className="text-[11px] sm:text-[12px] font-bold tracking-tight uppercase leading-tight truncate drop-shadow-xs">
              {displayName}
            </div>
            <div className="text-[9.5px] sm:text-[10px] font-medium text-white/90 uppercase tracking-wide leading-tight mt-0.5 truncate">
              {displayRole}
            </div>
          </>
        )}
      </div>

      {/* Quick interaction badge indicator */}
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
        Detail
      </div>
    </div>
  );
};
