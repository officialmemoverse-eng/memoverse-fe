'use client';

export function AstharaLogo({ className = "w-8 h-8", textClassName = "" }: { className?: string; textClassName?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          className={className}
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="astharaGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5C984" />
              <stop offset="35%" stopColor="#D9944D" />
              <stop offset="70%" stopColor="#C88242" />
              <stop offset="100%" stopColor="#965821" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Infinity Loop 'A' Emblem */}
          <path
            d="M30 65C18 52 20 32 40 18C60 4 78 18 86 36C94 54 84 66 70 66C56 66 46 53 36 38L66 54C78 62 86 50 79 36C70 19 52 10 36 24C20 38 18 52 28 65Z"
            fill="url(#astharaGold)"
            filter="url(#goldGlow)"
          />
        </svg>
      </div>

      <div className={textClassName}>
        <div className="font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#F5C984] via-[#D9944D] to-[#A86427] text-lg leading-none">
          MEMOVERSE
        </div>
        <div className="text-[9px] tracking-widest text-amber-200/70 font-semibold uppercase mt-0.5 leading-none">
          Romantic Couple SaaS
        </div>
      </div>
    </div>
  );
}
