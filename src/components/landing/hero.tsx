'use client';

import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export function LandingHero() {
  const router = useRouter();

  return (
    <section className="px-4 sm:px-8 pt-10 pb-16 md:py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Text Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F07865]/10 border border-[#F07865]/20 text-[#E25C47] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#F07865]" />
            <span>FAMILY MEMORY PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E2229] tracking-tight leading-[1.15]">
            Satu Cerita, Satu Link, <span className="text-[#F07865]">Seumur Hidup!</span>
          </h1>

          <p className="text-[#646A78] text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            Preserve your legacy in a beautiful, interactive digital home. Sharing meaningful
            stories and memories, crafted for generations.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => router.push('/login')}
              className="px-7 py-3.5 rounded-full bg-[#F07865] hover:bg-[#E25C47] text-white text-sm font-bold shadow-lg shadow-[#F07865]/30 transition hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span>Mulai Merekam Momen Keren</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-[#F5F3EF] text-[#1E2229] border border-[#EFECE6] text-sm font-bold transition shadow-xs cursor-pointer"
            >
              <span>Pelajari Fiturnya</span>
            </button>
          </div>
        </div>

        {/* Right Image Collage Column */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#F07865]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative w-full max-w-md">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-[4/3] relative group">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                alt="Family Memory"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="absolute -bottom-10 -left-6 sm:-left-10 w-64 sm:w-72 bg-white rounded-2xl p-3 shadow-2xl border-2 border-white backdrop-blur-md">
              <div className="bg-[#F8F6F2] rounded-xl p-3 space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-[#EFECE6]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F07865]" />
                  <span className="text-[11px] font-bold text-[#1E2229]">Koleksi Kenangan</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=300&q=80"
                    alt="Moment 1"
                    className="rounded-lg aspect-square object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80"
                    alt="Moment 2"
                    className="rounded-lg aspect-square object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
