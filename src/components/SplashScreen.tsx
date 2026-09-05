import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  duration?: number;
  onComplete?: () => void;
}

export default function SplashScreen({ duration = 3000, onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setLoadingProgress(Math.min(progress, 100));
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, duration / 100);

    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        {/* Logo Container dengan animasi */}
        <div className="mb-8 relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-20 animate-pulse"></div>
          
          {/* Outer ring */}
          <div className="relative w-40 h-40 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-spin-slow">
            {/* Inner circle */}
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
              {/* Logo dari folder icon */}
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-50 shadow-inner">
                <img 
                  src="/sidya-logo.png" 
                  alt="SIDYA Logo" 
                  className="w-full h-full object-contain bg-white p-3"
                  onError={(e) => {
                    // Fallback jika logo tidak ditemukan
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="w-full h-full bg-emerald-500 rounded-full flex items-center justify-center"><div class="text-white text-2xl font-bold">SIDYA</div></div>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2 animate-fade-in">SIDYA</h1>
            <p className="text-white/90 text-xl font-medium">Distribusi Perlengkapan Haji & Umroh</p>
          </div>
          
          {/* Progress Bar */}
          <div className="w-64 mt-6">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-300 to-blue-300 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-white/70 text-sm">Memuat...</span>
              <span className="text-white font-medium text-sm">{loadingProgress}%</span>
            </div>
          </div>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
          </div>
          
          <p className="text-white/60 text-sm mt-6 animate-pulse">
            Menyiapkan panel admin...
          </p>
        </div>
      </div>

      {/* Style untuk animasi tambahan */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}