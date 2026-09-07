import React from 'react';

interface AvatarIllustrationProps {
  avatarKey: string;
  className?: string;
  size?: number;
}

export const AvatarIllustration: React.FC<AvatarIllustrationProps> = ({
  avatarKey,
  className = 'w-full h-full',
  size = 100,
}) => {
  const renderAvatar = () => {
    switch (avatarKey) {
      case 'ceo':
        // Male with groomed beard, dark hair, navy suit, white shirt, cyan tie
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="ceo-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
              <linearGradient id="ceo-suit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#ceo-circle)">
              {/* Neck & Shoulders */}
              <rect x="52" y="70" width="16" height="20" fill="#fed7aa" />
              {/* Suit */}
              <path d="M15 120 L30 85 L60 100 L90 85 L105 120 Z" fill="url(#ceo-suit)" />
              {/* Shirt White */}
              <polygon points="46,85 74,85 66,108 54,108" fill="#ffffff" />
              {/* Tie Cyan */}
              <polygon points="57,87 63,87 64,115 60,120 56,115" fill="#06b6d4" />
              {/* Lapels */}
              <polygon points="30,85 52,108 44,120 20,120" fill="#334155" />
              <polygon points="90,85 68,108 76,120 100,120" fill="#334155" />

              {/* Head & Ears */}
              <circle cx="37" cy="58" r="6" fill="#fcd34d" />
              <circle cx="83" cy="58" r="6" fill="#fcd34d" />
              <path
                d="M40 50 C40 33 50 25 60 25 C70 25 80 33 80 50 C80 67 71 78 60 78 C49 78 40 67 40 50 Z"
                fill="#fed7aa"
              />

              {/* Beard & Mustache */}
              <path
                d="M41 55 C41 73 50 82 60 82 C70 82 79 73 79 55 L74 55 C74 71 67 76 60 76 C53 76 46 71 46 55 Z"
                fill="#1e293b"
              />
              <path
                d="M50 63 Q60 67 70 63 Q65 67 60 67 Q55 67 50 63 Z"
                fill="#1e293b"
              />

              {/* Eyes & Eyebrows */}
              <path d="M47 45 Q52 43 56 45" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M64 45 Q68 43 73 45" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <circle cx="52" cy="50" r="2.5" fill="#0f172a" />
              <circle cx="68" cy="50" r="2.5" fill="#0f172a" />

              {/* Nose */}
              <path d="M60 48 L58 56 L62 56" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Hair (Short neat pompadour) */}
              <path
                d="M38 48 C36 28 50 16 60 16 C71 16 84 27 82 48 C78 35 70 30 60 30 C50 30 42 35 38 48 Z"
                fill="#1e293b"
              />
            </g>
          </svg>
        );

      case 'mgr-1':
        // Male with glasses, dark suit, white shirt, light cyan tie
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="mgr1-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
              <linearGradient id="mgr1-suit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#mgr1-circle)">
              <rect x="52" y="70" width="16" height="20" fill="#fed7aa" />
              <path d="M15 120 L30 85 L60 100 L90 85 L105 120 Z" fill="url(#mgr1-suit)" />
              <polygon points="46,85 74,85 66,108 54,108" fill="#ffffff" />
              <polygon points="57,87 63,87 64,115 60,120 56,115" fill="#38bdf8" />
              <polygon points="30,85 52,108 44,120 20,120" fill="#1e293b" />
              <polygon points="90,85 68,108 76,120 100,120" fill="#1e293b" />

              {/* Head & Ears */}
              <circle cx="37" cy="58" r="6" fill="#fcd34d" />
              <circle cx="83" cy="58" r="6" fill="#fcd34d" />
              <path
                d="M40 50 C40 33 50 25 60 25 C70 25 80 33 80 50 C80 67 71 77 60 77 C49 77 40 67 40 50 Z"
                fill="#fed7aa"
              />

              {/* Hair with side part */}
              <path
                d="M38 46 C36 26 48 18 62 18 C75 18 84 27 82 46 C77 34 68 30 58 30 C48 30 42 36 38 46 Z"
                fill="#1e293b"
              />

              {/* Glasses */}
              <rect x="44" y="46" width="13" height="9" rx="2" fill="none" stroke="#0f172a" strokeWidth="2" />
              <rect x="63" y="46" width="13" height="9" rx="2" fill="none" stroke="#0f172a" strokeWidth="2" />
              <line x1="57" y1="50" x2="63" y2="50" stroke="#0f172a" strokeWidth="2" />
              <line x1="38" y1="49" x2="44" y2="49" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="76" y1="49" x2="82" y2="49" stroke="#0f172a" strokeWidth="1.5" />

              {/* Eyes behind glasses */}
              <circle cx="50.5" cy="50.5" r="2" fill="#0f172a" />
              <circle cx="69.5" cy="50.5" r="2" fill="#0f172a" />

              {/* Smile */}
              <path d="M54 65 Q60 69 66 65" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      case 'mgr-2':
        // Female with long dark hair, parted in center, dark blazer
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="mgr2-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#mgr2-circle)">
              {/* Back Hair */}
              <path d="M32 45 C30 75 30 110 32 120 L88 120 C90 110 90 75 88 45 Z" fill="#0f172a" />
              {/* Neck */}
              <rect x="53" y="68" width="14" height="20" fill="#fed7aa" />
              {/* Blazer */}
              <path d="M15 120 L32 86 L60 98 L88 86 L105 120 Z" fill="#1e293b" />
              {/* Blouse White V-neck */}
              <polygon points="50,86 70,86 60,105" fill="#f8fafc" />

              {/* Face */}
              <path
                d="M42 50 C42 35 50 28 60 28 C70 28 78 35 78 50 C78 66 70 75 60 75 C50 75 42 66 42 50 Z"
                fill="#fde68a"
              />

              {/* Front Hair framing face */}
              <path
                d="M40 45 C42 22 52 18 60 22 C68 18 78 22 80 45 C78 33 73 30 60 33 C47 30 42 33 40 45 Z"
                fill="#0f172a"
              />
              <path d="M38 42 C44 58 44 80 36 95 L32 95 C30 75 34 52 38 42 Z" fill="#0f172a" />
              <path d="M82 42 C76 58 76 80 84 95 L88 95 C90 75 86 52 82 42 Z" fill="#0f172a" />

              {/* Eyes & Smile */}
              <path d="M47 47 Q52 45 56 47" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M64 47 Q68 45 73 47" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <circle cx="51.5" cy="51" r="2.2" fill="#0f172a" />
              <circle cx="68.5" cy="51" r="2.2" fill="#0f172a" />
              <path d="M54 64 Q60 69 66 64" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      case 'frm-a':
        // Male Foreman A: light teal shirt, blue tie, dark short hair
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="frma-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#frma-circle)">
              <rect x="52" y="70" width="16" height="20" fill="#fed7aa" />
              {/* Teal shirt */}
              <path d="M15 120 L32 86 L60 96 L88 86 L105 120 Z" fill="#0d9488" />
              <polygon points="50,86 70,86 65,105 55,105" fill="#e0f2fe" />
              <polygon points="58,88 62,88 63,116 60,120 57,116" fill="#0369a1" />

              {/* Head */}
              <path
                d="M41 50 C41 33 50 25 60 25 C70 25 79 33 79 50 C79 67 70 76 60 76 C50 76 41 67 41 50 Z"
                fill="#fed7aa"
              />
              {/* Hair */}
              <path
                d="M38 46 C37 25 48 18 60 18 C72 18 83 25 82 46 C77 34 68 30 60 30 C52 30 43 34 38 46 Z"
                fill="#1e293b"
              />
              {/* Eyes */}
              <circle cx="51" cy="50" r="2.3" fill="#0f172a" />
              <circle cx="69" cy="50" r="2.3" fill="#0f172a" />
              <path d="M54 64 Q60 68 66 64" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      case 'frm-b':
        // Female Foreman B: glasses, teal/dark blazer, hair tied back
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="frmb-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#frmb-circle)">
              <path d="M34 45 C33 70 33 90 35 110 L85 110 C87 90 87 70 86 45 Z" fill="#0f172a" />
              <rect x="53" y="68" width="14" height="20" fill="#fde68a" />
              <path d="M15 120 L32 86 L60 98 L88 86 L105 120 Z" fill="#0f766e" />
              <polygon points="50,86 70,86 60,105" fill="#f0fdfa" />

              <path
                d="M42 50 C42 35 50 28 60 28 C70 28 78 35 78 50 C78 66 70 75 60 75 C50 75 42 66 42 50 Z"
                fill="#fed7aa"
              />
              <path
                d="M40 45 C42 22 52 18 60 22 C68 18 78 22 80 45 C77 33 70 30 60 32 C50 30 43 33 40 45 Z"
                fill="#0f172a"
              />

              {/* Glasses */}
              <circle cx="51" cy="50" r="6" fill="none" stroke="#0f172a" strokeWidth="1.8" />
              <circle cx="69" cy="50" r="6" fill="none" stroke="#0f172a" strokeWidth="1.8" />
              <line x1="57" y1="50" x2="63" y2="50" stroke="#0f172a" strokeWidth="1.8" />
              <circle cx="51" cy="50" r="2" fill="#0f172a" />
              <circle cx="69" cy="50" r="2" fill="#0f172a" />

              <path d="M54 64 Q60 68 66 64" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      case 'sls-a':
        // Male Sales Officer A: dark navy suit, blue tie
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="slsa-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#slsa-circle)">
              <rect x="52" y="70" width="16" height="20" fill="#fed7aa" />
              <path d="M15 120 L30 85 L60 98 L90 85 L105 120 Z" fill="#1e293b" />
              <polygon points="48,85 72,85 64,106 56,106" fill="#ffffff" />
              <polygon points="57,87 63,87 64,115 60,119 56,115" fill="#0284c7" />

              <path
                d="M41 50 C41 33 50 25 60 25 C70 25 79 33 79 50 C79 67 70 76 60 76 C50 76 41 67 41 50 Z"
                fill="#fed7aa"
              />
              <path
                d="M38 46 C37 25 48 18 60 18 C72 18 83 25 82 46 C77 34 68 30 60 30 C52 30 43 34 38 46 Z"
                fill="#1e293b"
              />
              <circle cx="51" cy="50" r="2.3" fill="#0f172a" />
              <circle cx="69" cy="50" r="2.3" fill="#0f172a" />
              <path d="M54 64 Q60 68 66 64" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      case 'sls-b':
        // Male Sales Officer B: light shirt with cyan necktie
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="slsb-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#slsb-circle)">
              <rect x="52" y="70" width="16" height="20" fill="#fed7aa" />
              <path d="M15 120 L30 85 L60 98 L90 85 L105 120 Z" fill="#cbd5e1" />
              <polygon points="48,85 72,85 64,106 56,106" fill="#ffffff" />
              <polygon points="57,87 63,87 64,115 60,119 56,115" fill="#0891b2" />

              <path
                d="M41 50 C41 33 50 25 60 25 C70 25 79 33 79 50 C79 67 70 76 60 76 C50 76 41 67 41 50 Z"
                fill="#fed7aa"
              />
              <path
                d="M38 46 C37 25 48 18 60 18 C72 18 83 25 82 46 C77 34 68 30 60 30 C52 30 43 34 38 46 Z"
                fill="#1e293b"
              />
              <circle cx="51" cy="50" r="2.3" fill="#0f172a" />
              <circle cx="69" cy="50" r="2.3" fill="#0f172a" />
              <path d="M54 64 Q60 68 66 64" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      case 'wrk-1':
        // Worker 1: Male, casual blue collar
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="wrk1-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#wrk1-circle)">
              <rect x="52" y="70" width="16" height="20" fill="#fed7aa" />
              <path d="M20 120 L35 88 L60 98 L85 88 L100 120 Z" fill="#0284c7" />
              <path
                d="M41 50 C41 33 50 25 60 25 C70 25 79 33 79 50 C79 67 70 76 60 76 C50 76 41 67 41 50 Z"
                fill="#fed7aa"
              />
              <path
                d="M38 46 C37 25 48 18 60 18 C72 18 83 25 82 46 C77 34 68 30 60 30 C52 30 43 34 38 46 Z"
                fill="#1e293b"
              />
              <circle cx="51" cy="50" r="2.2" fill="#0f172a" />
              <circle cx="69" cy="50" r="2.2" fill="#0f172a" />
              <path d="M54 64 Q60 68 66 64" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      case 'wrk-2':
        // Worker 2: Male, green polo shirt
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="wrk2-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#wrk2-circle)">
              <rect x="52" y="70" width="16" height="20" fill="#fed7aa" />
              <path d="M20 120 L35 88 L60 98 L85 88 L100 120 Z" fill="#22c55e" />
              <polygon points="56,88 64,88 62,106 58,106" fill="#16a34a" />
              <circle cx="60" cy="94" r="1.5" fill="#ffffff" />
              <circle cx="60" cy="100" r="1.5" fill="#ffffff" />

              <path
                d="M41 50 C41 33 50 25 60 25 C70 25 79 33 79 50 C79 67 70 76 60 76 C50 76 41 67 41 50 Z"
                fill="#fed7aa"
              />
              <path
                d="M38 46 C37 25 48 18 60 18 C72 18 83 25 82 46 C77 34 68 30 60 30 C52 30 43 34 38 46 Z"
                fill="#1e293b"
              />
              <circle cx="51" cy="50" r="2.2" fill="#0f172a" />
              <circle cx="69" cy="50" r="2.2" fill="#0f172a" />
              <path d="M54 64 Q60 68 66 64" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      case 'wrk-3':
        // Worker 3: Male, orange polo/t-shirt
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="wrk3-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#wrk3-circle)">
              <rect x="52" y="70" width="16" height="20" fill="#fed7aa" />
              <path d="M20 120 L35 88 L60 98 L85 88 L100 120 Z" fill="#f97316" />
              <polygon points="56,88 64,88 62,106 58,106" fill="#ea580c" />

              <path
                d="M41 50 C41 33 50 25 60 25 C70 25 79 33 79 50 C79 67 70 76 60 76 C50 76 41 67 41 50 Z"
                fill="#fed7aa"
              />
              <path
                d="M38 46 C37 25 48 18 60 18 C72 18 83 25 82 46 C77 34 68 30 60 30 C52 30 43 34 38 46 Z"
                fill="#1e293b"
              />
              <circle cx="51" cy="50" r="2.2" fill="#0f172a" />
              <circle cx="69" cy="50" r="2.2" fill="#0f172a" />
              <path d="M54 64 Q60 68 66 64" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      case 'wrk-4':
        // Worker 4: Female, ponytail/bun, orange shirt
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="wrk4-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#wrk4-circle)">
              {/* Ponytail */}
              <circle cx="78" cy="40" r="10" fill="#0f172a" />
              <rect x="53" y="68" width="14" height="20" fill="#fde68a" />
              <path d="M20 120 L35 88 L60 98 L85 88 L100 120 Z" fill="#f97316" />

              <path
                d="M42 50 C42 35 50 28 60 28 C70 28 78 35 78 50 C78 66 70 75 60 75 C50 75 42 66 42 50 Z"
                fill="#fed7aa"
              />
              <path
                d="M40 45 C42 22 52 18 60 22 C68 18 78 22 80 45 C77 33 70 30 60 32 C50 30 43 33 40 45 Z"
                fill="#0f172a"
              />
              <circle cx="51" cy="50" r="2" fill="#0f172a" />
              <circle cx="69" cy="50" r="2" fill="#0f172a" />
              <path d="M54 64 Q60 68 66 64" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      case 'slr-1':
        // Saler 1: Female with dark bob hair, green top
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="slr1-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#slr1-circle)">
              <path d="M33 45 C32 68 32 85 34 100 L86 100 C88 85 88 68 87 45 Z" fill="#0f172a" />
              <rect x="53" y="68" width="14" height="20" fill="#fde68a" />
              <path d="M20 120 L35 88 L60 98 L85 88 L100 120 Z" fill="#059669" />

              <path
                d="M42 50 C42 35 50 28 60 28 C70 28 78 35 78 50 C78 66 70 75 60 75 C50 75 42 66 42 50 Z"
                fill="#fed7aa"
              />
              <path
                d="M40 45 C42 22 52 18 60 22 C68 18 78 22 80 45 C77 33 70 30 60 32 C50 30 43 33 40 45 Z"
                fill="#0f172a"
              />
              <circle cx="51" cy="50" r="2" fill="#0f172a" />
              <circle cx="69" cy="50" r="2" fill="#0f172a" />
              <path d="M54 64 Q60 68 66 64" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      case 'slr-2':
        // Saler 2: Male with green shirt and collar
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <defs>
              <clipPath id="slr2-circle">
                <circle cx="60" cy="60" r="58" />
              </clipPath>
            </defs>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <g clipPath="url(#slr2-circle)">
              <rect x="52" y="70" width="16" height="20" fill="#fed7aa" />
              <path d="M20 120 L35 88 L60 98 L85 88 L100 120 Z" fill="#059669" />
              <polygon points="56,88 64,88 62,106 58,106" fill="#047857" />

              <path
                d="M41 50 C41 33 50 25 60 25 C70 25 79 33 79 50 C79 67 70 76 60 76 C50 76 41 67 41 50 Z"
                fill="#fed7aa"
              />
              <path
                d="M38 46 C37 25 48 18 60 18 C72 18 83 25 82 46 C77 34 68 30 60 30 C52 30 43 34 38 46 Z"
                fill="#1e293b"
              />
              <circle cx="51" cy="50" r="2.2" fill="#0f172a" />
              <circle cx="69" cy="50" r="2.2" fill="#0f172a" />
              <path d="M54 64 Q60 68 66 64" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      default:
        // Default generic professional avatar
        return (
          <svg viewBox="0 0 120 120" className={className} width={size} height={size}>
            <circle cx="60" cy="60" r="58" fill="#ffffff" />
            <circle cx="60" cy="48" r="20" fill="#cbd5e1" />
            <path d="M30 110 C30 85 45 75 60 75 C75 75 90 85 90 110 Z" fill="#64748b" />
          </svg>
        );
    }
  };

  return <div className="inline-block flex-shrink-0">{renderAvatar()}</div>;
};
