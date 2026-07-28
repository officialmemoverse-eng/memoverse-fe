'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Menu, X } from 'lucide-react';

export function LandingHeader() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FDFCFB]/90 backdrop-blur-md border-b border-[#EFECE6] px-4 sm:px-8 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => router.push('/')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#F07865] flex items-center justify-center text-white shadow-md shadow-[#F07865]/25 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-[#1E2229] tracking-tight leading-none">
              MoreThanMemories
            </span>
            <span className="text-[10px] text-[#8C8F96] font-medium tracking-wide uppercase mt-0.5">
              by MemoVerse
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#525866]">
          <a href="#moments" className="hover:text-[#F07865] transition-colors">
            My Moments
          </a>
          <a href="#features" className="hover:text-[#F07865] transition-colors">
            Story Board
          </a>
          <a href="#legacy" className="hover:text-[#F07865] transition-colors">
            Digital Book
          </a>
        </nav>

        {/* Desktop Right Action */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => router.push('/login')}
            className="px-5 py-2.5 rounded-full bg-[#1E2229] hover:bg-[#2D333E] text-white text-xs font-bold transition shadow-md cursor-pointer"
          >
            Learn More
          </button>
          <div className="w-9 h-9 rounded-full bg-[#F07865]/10 border border-[#F07865]/30 overflow-hidden flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1E2229] hover:bg-[#F3EFEA] rounded-xl transition"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-white rounded-2xl border border-[#EFECE6] shadow-xl space-y-3 animate-in fade-in">
          <a
            href="#moments"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1E2229] p-2 hover:bg-[#FDFCFB] rounded-lg"
          >
            My Moments
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1E2229] p-2 hover:bg-[#FDFCFB] rounded-lg"
          >
            Story Board
          </a>
          <a
            href="#legacy"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1E2229] p-2 hover:bg-[#FDFCFB] rounded-lg"
          >
            Digital Book
          </a>
          <button
            onClick={() => router.push('/login')}
            className="w-full py-3 rounded-xl bg-[#F07865] text-white text-xs font-bold transition cursor-pointer"
          >
            Learn More / Login Portal
          </button>
        </div>
      )}
    </header>
  );
}
