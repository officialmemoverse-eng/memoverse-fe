'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Heart, Share2, Sparkles } from 'lucide-react';
import { resolveCoverGradient, formatEventDate } from '@/lib/story-cover';

type StoryCoverProps = {
  theme: string;
  title: string;
  subtitle?: string;
  eventDate?: string;
  coverPhotoUrl?: string;
  shareUrl?: string;
  onOpen: () => void;
};

export function StoryCover({ theme, title, subtitle, eventDate, coverPhotoUrl, shareUrl, onOpen }: StoryCoverProps) {
  const [shared, setShared] = useState(false);
  const gradient = resolveCoverGradient(theme);
  const metaLine = [subtitle, formatEventDate(eventDate || '')].filter(Boolean).join(' • ');

  const handleShare = async () => {
    const url = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
    if (!url) return;

    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      try {
        await (navigator as any).share({ title, url });
        return;
      } catch {
        // user cancelled the native share sheet — fall back to clipboard copy
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2F0] flex flex-col items-center justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-2xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-600 uppercase tracking-wide mb-4">
          <Heart className="w-3.5 h-3.5 text-[#B3223A] fill-[#B3223A]" />
          Memoverse
        </span>

        <button type="button" onClick={onOpen} className="group block w-full text-left cursor-pointer">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/10] transition-transform duration-300 group-hover:scale-[1.01]">
            {coverPhotoUrl ? (
              <img src={coverPhotoUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            <div className="absolute left-0 right-0 bottom-0 p-6 sm:p-8 text-left">
              <h1 className="text-white text-2xl sm:text-4xl font-extrabold tracking-tight mb-1">{title}</h1>
              {metaLine && <p className="text-white/90 text-sm sm:text-base font-medium">{metaLine}</p>}
            </div>
          </div>
        </button>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-500">
            Created with Memoverse
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              title="Bagikan"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#B3223A] transition cursor-pointer"
            >
              {shared ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B3223A] to-[#8E1A2E] hover:from-[#C93A52] hover:to-[#9F1D35] text-white text-sm font-bold shadow-lg shadow-[#B3223A]/25 transition"
            >
              <span>Create Your Own Story</span>
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
