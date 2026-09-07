import React, { useState } from 'react';
import { User } from 'lucide-react';

interface EmployeeAvatarProps {
  avatarUrl?: string;
  name: string;
  size?: number;
  className?: string;
}

export const EmployeeAvatar: React.FC<EmployeeAvatarProps> = ({
  avatarUrl,
  name,
  size = 80,
  className = 'w-full h-full',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Extract initials for fallback
  const initials = name
    ? name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('')
    : 'ID';

  if (!avatarUrl || hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 font-bold select-none ${className}`}
        style={{ width: size, height: size }}
      >
        {initials ? (
          <span style={{ fontSize: Math.max(12, Math.floor(size * 0.35)) }}>{initials}</span>
        ) : (
          <User className="text-slate-400" style={{ width: size * 0.5, height: size * 0.5 }} />
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center bg-slate-100 ${className}`}
      style={{ width: size, height: size }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <User className="text-slate-300" style={{ width: size * 0.4, height: size * 0.4 }} />
        </div>
      )}
      <img
        src={avatarUrl}
        alt={name}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </div>
  );
};
