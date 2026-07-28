'use client';

import { Globe, Layers, Heart } from 'lucide-react';

export function LegacyFeatures() {
  return (
    <section id="features" className="bg-[#F5F3EF] py-16 sm:py-24 px-4 sm:px-8 border-y border-[#EFECE6]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2229] tracking-tight">
            How We Preserve Your Legacy
          </h2>
          <p className="text-[#646A78] text-sm sm:text-base leading-relaxed">
            MoreThanMemories provides a sacred, interactive space that's designed for emotional resonance and ease of use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-8 rounded-3xl border border-[#EFECE6] shadow-sm hover:shadow-md transition space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#F07865]/15 text-[#F07865] flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1E2229]">Digital Home</h3>
            <p className="text-[#646A78] text-sm leading-relaxed">
              A dedicated space for every memory. Think of it as a living museum for your life's most precious moments, accessible via a single personal link.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#EFECE6] shadow-sm hover:shadow-md transition space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#1F6F78]/15 text-[#1F6F78] flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1E2229]">No Coding</h3>
            <p className="text-[#646A78] text-sm leading-relaxed">
              Beautiful design should be for everyone. Like an intuitive blog, built to drag and drop your photo and story without a line of code.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#EFECE6] shadow-sm hover:shadow-md transition space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#4F46E5]/15 text-[#4F46E5] flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1E2229]">Interactive Memories</h3>
            <p className="text-[#646A78] text-sm leading-relaxed">
              No boring photo albums. Add voice notes, video clips, and interactive timeline that allow viewers to truly feel the moment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
