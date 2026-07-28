'use client';

import { Share2 } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-[#F5F3EF] border-t border-[#EFECE6] py-12 px-4 sm:px-8 text-xs text-[#646A78]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left space-y-1">
          <div className="font-bold text-sm text-[#1E2229]">MoreThanMemories</div>
          <div className="text-[11px] text-[#8C8F96]">
            © 2026 More Than Memories. Preserving memories for generations.
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 font-semibold">
          <a href="#" className="hover:text-[#F07865] transition">Privacy Policy</a>
          <a href="#" className="hover:text-[#F07865] transition">Terms of Service</a>
          <a href="#" className="hover:text-[#F07865] transition">Contact Us</a>
          <a href="#" className="hover:text-[#F07865] transition">About MemoVerse</a>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white border border-[#EFECE6] flex items-center justify-center cursor-pointer hover:text-[#F07865]">
            <Share2 className="w-4 h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}
