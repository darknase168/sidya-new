import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StaffCard from './StaffCard';

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

interface AnimatedStaffScrollProps {
  staffList: StaffMember[];
  title: string;
  autoScroll?: boolean;
  scrollSpeed?: number; // px per second
}

export default function AnimatedStaffScroll({
  staffList,
  title,
  autoScroll = true,
  scrollSpeed = 50,
}: AnimatedStaffScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredStaffId, setHoveredStaffId] = useState<number | null>(null);
  const animationRef = useRef<number>();
  const lastScrollTimeRef = useRef<number>(Date.now());

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll || isHovering || !scrollContainerRef.current) return;

    const scroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const now = Date.now();
      const timeDelta = (now - lastScrollTimeRef.current) / 1000; // dalam detik
      const scrollAmount = scrollSpeed * timeDelta;

      container.scrollLeft += scrollAmount;
      lastScrollTimeRef.current = now;

      // Reset scroll jika sudah di akhir
      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth - 10
      ) {
        container.scrollLeft = 0;
      }

      checkScroll();
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoScroll, isHovering, scrollSpeed]);

  // Check scroll position
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScroll);
    checkScroll();

    return () => {
      container.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400; // pixels
    const targetScroll =
      container.scrollLeft +
      (direction === 'left' ? -scrollAmount : scrollAmount);

    // Smooth scroll
    const start = container.scrollLeft;
    const startTime = Date.now();
    const duration = 500; // ms

    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      container.scrollLeft = start + (targetScroll - start) * progress;

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateScroll);
      } else {
        checkScroll();
      }
    };

    animationRef.current = requestAnimationFrame(animateScroll);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-500">
          {staffList.length} anggota
        </p>
      </div>

      {/* Scroll Container */}
      <div className="relative group">
        {/* Left Button */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute -left-6 top-1/3 -translate-y-1/2 z-20 p-2 rounded-full transition-all duration-300 ${
            canScrollLeft
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg opacity-100'
              : 'bg-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
          }`}
          title="Scroll ke kiri"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Button */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute -right-6 top-1/3 -translate-y-1/2 z-20 p-2 rounded-full transition-all duration-300 ${
            canScrollRight
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg opacity-100'
              : 'bg-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
          }`}
          title="Scroll ke kanan"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scroll Area */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setHoveredStaffId(null);
          }}
          className="w-full overflow-x-auto scrollbar-hide"
          style={{
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex gap-6 pb-4">
            {staffList.map((staff) => (
              <StaffCard
                key={staff.id}
                staff={staff}
                onHover={setHoveredStaffId}
                isHovered={hoveredStaffId === staff.id}
              />
            ))}

            {/* Loop indicator */}
            {staffList.length > 0 && (
              <div className="flex-shrink-0 w-80 h-96 rounded-xl bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-dashed border-emerald-300 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-700 mb-2">
                    🔄 Loop
                  </p>
                  <p className="text-xs text-slate-600">
                    Akan berulang dari awal
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Text */}
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
        <span>💡 Arahkan mouse ke kartu untuk melihat detail profil</span>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}