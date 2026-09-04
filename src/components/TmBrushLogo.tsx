import React from 'react';

interface TmBrushLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const TmBrushLogo: React.FC<TmBrushLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    hero: 'w-48 h-48 sm:w-56 sm:h-56',
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Background toxic glow */}
      <div className="absolute inset-0 bg-[#00ff66]/10 blur-2xl rounded-full pointer-events-none -z-10 animate-pulse-glow" />

      {/* Hand-drawn / brush-like TM insignia SVG */}
      <div className={`relative ${sizeMap[size]} flex items-center justify-center`}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_0_12px_rgba(0,255,102,0.4)] transition-transform duration-300 hover:scale-105"
        >
          <defs>
            <filter id="brushRoughness" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            
            <linearGradient id="whiteMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            <linearGradient id="toxicEdge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00FF66" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#052e16" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Hexagonal / Diamond Sharp Shield Frame */}
          <polygon
            points="100,8 185,55 185,145 100,192 15,145 15,55"
            stroke="url(#toxicEdge)"
            strokeWidth="2"
            fill="#050a07"
            fillOpacity="0.85"
            strokeDasharray="4 2"
          />

          {/* Inner Sharp Frame */}
          <polygon
            points="100,18 175,60 175,140 100,182 25,140 25,60"
            stroke="#00ff66"
            strokeWidth="1"
            strokeOpacity="0.3"
            fill="none"
          />

          {/* Brush Marks / Grunge Splatters */}
          <path
            d="M 12 55 L 28 42 M 188 55 L 172 42 M 100 2 L 100 12"
            stroke="#00ff66"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* The TM Hand-Drawn Brush Monogram */}
          {/* 'T' Character with heavy brushed horizontal bar and rough vertical stem */}
          <g filter="url(#brushRoughness)">
            {/* Top Bar of T */}
            <path
              d="M 45 68 C 65 65, 115 64, 155 69 C 148 74, 140 76, 118 75 C 95 74, 60 76, 45 68 Z"
              fill="url(#whiteMetallic)"
            />
            {/* T Secondary scratch */}
            <path
              d="M 48 64 C 70 63, 130 63, 152 66"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="square"
            />
            {/* Vertical Stem of T */}
            <path
              d="M 94 72 C 95 95, 93 125, 92 148 C 96 149, 104 149, 107 148 C 106 125, 105 95, 105 72 Z"
              fill="url(#whiteMetallic)"
            />
          </g>

          {/* 'M' Character overlapping and interlocking with hand-drawn brush slashes */}
          <g filter="url(#brushRoughness)">
            {/* Left upward slash */}
            <path
              d="M 52 144 C 54 118, 62 90, 72 78 C 76 80, 77 86, 75 96 C 70 112, 64 132, 60 146 Z"
              fill="url(#whiteMetallic)"
            />
            {/* Downward diagonal to center */}
            <path
              d="M 72 78 C 82 96, 92 114, 100 128 C 98 122, 92 104, 88 88 Z"
              fill="#E2E8F0"
            />
            {/* Upward diagonal from center to right peak */}
            <path
              d="M 100 128 C 108 114, 118 96, 128 78 C 124 88, 118 104, 112 122 Z"
              fill="#E2E8F0"
            />
            {/* Right downward stem */}
            <path
              d="M 128 78 C 138 90, 146 118, 148 144 C 144 146, 138 132, 134 112 C 132 96, 133 80, 128 78 Z"
              fill="url(#whiteMetallic)"
            />
          </g>

          {/* Accent slash in toxic green */}
          <path
            d="M 38 152 L 162 152"
            stroke="#00ff66"
            strokeWidth="2"
            strokeOpacity="0.8"
            strokeLinecap="round"
          />

          {/* Small corner diamond accents */}
          <rect x="97" y="14" width="6" height="6" fill="#00ff66" transform="rotate(45 100 17)" />
          <rect x="97" y="179" width="6" height="6" fill="#00ff66" transform="rotate(45 100 182)" />
        </svg>
      </div>

      {/* Brand Subtitles as explicitly requested:
          Under the logo:
          TM
          PROCLUBS
      */}
      <div className="flex flex-col items-center mt-3 text-center">
        <span className="font-esports text-2xl sm:text-3xl font-black tracking-[0.25em] text-white leading-none">
          TM
        </span>
        <span className="font-tech text-xs sm:text-sm font-bold tracking-[0.35em] text-[#00ff66] uppercase mt-0.5">
          PROCLUBS
        </span>
      </div>
    </div>
  );
};
