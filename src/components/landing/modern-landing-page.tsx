'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Heart,
  Shield,
  Layers,
  ArrowRight,
  Menu,
  X,
  Lock,
  Volume2,
  Video,
  Camera,
  FileText,
  CheckCircle2,
  ChevronRight,
  Globe,
  Share2
} from 'lucide-react';

export function ModernLandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1E2229] font-sans selection:bg-[#F07865] selection:text-white">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER / NAVBAR                                           */}
      {/* ------------------------------------------------------------- */}
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
              className="px-5 py-2.5 rounded-full bg-[#1E2229] hover:bg-[#2D333E] text-white text-xs font-bold transition shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Learn More</span>
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

      {/* ------------------------------------------------------------- */}
      {/* 2. HERO SECTION                                               */}
      {/* ------------------------------------------------------------- */}
      <section className="px-4 sm:px-8 pt-10 pb-16 md:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F07865]/10 border border-[#F07865]/20 text-[#E25C47] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F07865]" />
              <span>FAMILY MEMORY PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E2229] tracking-tight leading-[1.15]">
              Satu Cerita, Satu Link,{' '}
              <span className="text-[#F07865]">Seumur Hidup!</span>
            </h1>

            <p className="text-[#646A78] text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Preserve your legacy in a beautiful, interactive digital home. Sharing meaningful stories and memories, crafted for generations.
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
            {/* Soft Glow Circles Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#F07865]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-md">
              {/* Main Photo Card (Grandfather & Grandchild) */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-[4/3] relative group">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                  alt="Family Memory"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlapping Floating Tablet / Card Mockup */}
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

      {/* ------------------------------------------------------------- */}
      {/* 3. SECTION: HOW WE PRESERVE YOUR LEGACY                      */}
      {/* ------------------------------------------------------------- */}
      <section id="features" className="bg-[#F5F3EF] py-16 sm:py-24 px-4 sm:px-8 border-y border-[#EFECE6]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Centered Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2229] tracking-tight">
              How We Preserve Your Legacy
            </h2>
            <p className="text-[#646A78] text-sm sm:text-base leading-relaxed">
              MoreThanMemories provides a sacred, interactive space that's designed for emotional resonance and ease of use.
            </p>
          </div>

          {/* 3 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Digital Home */}
            <div className="bg-white p-8 rounded-3xl border border-[#EFECE6] shadow-sm hover:shadow-md transition space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#F07865]/15 text-[#F07865] flex items-center justify-center font-bold">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1E2229]">Digital Home</h3>
              <p className="text-[#646A78] text-sm leading-relaxed">
                A dedicated space for every memory. Think of it as a living museum for your life's most precious moments, accessible via a single personal link.
              </p>
            </div>

            {/* Card 2: No Coding */}
            <div className="bg-white p-8 rounded-3xl border border-[#EFECE6] shadow-sm hover:shadow-md transition space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#1F6F78]/15 text-[#1F6F78] flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1E2229]">No Coding</h3>
              <p className="text-[#646A78] text-sm leading-relaxed">
                Beautiful design should be for everyone. Like an intuitive blog, built to drag and drop your photo and story without a line of code.
              </p>
            </div>

            {/* Card 3: Interactive Memories */}
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

      {/* ------------------------------------------------------------- */}
      {/* 4. SUNSET QUOTE PANORAMIC BANNER                              */}
      {/* ------------------------------------------------------------- */}
      <section className="px-4 sm:px-8 py-16 sm:py-20 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden min-h-[420px] flex items-center p-8 sm:p-14 shadow-2xl border border-[#EFECE6]">
          {/* Panoramic Background Image */}
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
            alt="Sunset Coastal View"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />

          {/* Quote Content */}
          <div className="relative z-10 max-w-xl text-left text-white space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight">
              Setiap keluarga punya legenda. Apa legendamu?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              "Bumi MoreThanMemories membantu Anda mengabadikan foto dan cerita unik yang bernilai historis, membawa kenangan indah keluarga kapanpun waktunya."
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-11 h-11 rounded-full border-2 border-[#F07865] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Rudi Yulianto"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-white">Rudi Yulianto</div>
                <div className="text-xs text-amber-200/80">Founder MoreThanMemories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. BENTO GRID FEATURE SHOWCASE                                */}
      {/* ------------------------------------------------------------- */}
      <section id="moments" className="px-4 sm:px-8 pb-16 sm:pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top-Left Card (Timeline Storyteller) */}
          <div className="lg:col-span-7 bg-[#EFECE6] rounded-3xl p-8 sm:p-10 text-left flex flex-col justify-between border border-[#E5E2DC] shadow-sm">
            <div className="space-y-3 mb-8">
              <h3 className="text-2xl font-bold text-[#1E2229]">Timeline Storyteller</h3>
              <p className="text-[#646A78] text-sm leading-relaxed max-w-md">
                Organisasi kenangan berdasarkan waktu, lokasi, atau momen. Struktur yang rapi untuk cerita yang tak lekang oleh waktu.
              </p>
            </div>

            {/* Interactive Timeline Diagram Preview */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E2DC] space-y-3">
              <div className="flex items-center gap-3 p-2.5 bg-[#F8F6F2] rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-[#F07865] text-white flex items-center justify-center font-bold text-xs">
                  2020
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E2229]">Pernikahan Pertama</div>
                  <div className="text-[10px] text-[#8C8F96]">Jakarta, Indonesia</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-[#F8F6F2] rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-[#1F6F78] text-white flex items-center justify-center font-bold text-xs">
                  2022
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E2229]">Kelahiran Putri Pertama</div>
                  <div className="text-[10px] text-[#8C8F96]">Rumah Sakit Bunda</div>
                </div>
              </div>
            </div>
          </div>

          {/* Top-Right Card (Pasti Privat - Dark Terracotta Brown #7A2E16) */}
          <div className="lg:col-span-5 bg-[#7A2E16] text-white rounded-3xl p-8 sm:p-10 text-left flex flex-col justify-between shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">Pasti Privat</h3>
              <p className="text-amber-100/80 text-sm leading-relaxed">
                Hanya siapa yang bisa melihat momenmu. Dari publik hingga akses terbatas khusus untuk keluarga Anda.
              </p>
            </div>
          </div>

          {/* Bottom-Left Card (Soft Off-White Image Mockup) */}
          <div className="lg:col-span-4 bg-[#F5F3EF] rounded-3xl p-8 text-left border border-[#EFECE6] flex items-center justify-center min-h-[220px]">
            <div className="text-center space-y-2">
              <BookOpenIcon className="w-10 h-10 text-[#F07865] mx-auto" />
              <div className="font-bold text-sm text-[#1E2229]">Digital Family Album</div>
              <div className="text-xs text-[#8C8F96]">Cetak & Simpan Abadi</div>
            </div>
          </div>

          {/* Bottom-Right Card (Multi-Format Support - Dark Navy Teal #0B2533) */}
          <div className="lg:col-span-8 bg-[#0B2533] text-white rounded-3xl p-8 sm:p-10 text-left flex flex-col justify-between shadow-xl">
            <div className="space-y-3 mb-6">
              <h3 className="text-2xl font-bold text-white">Multi-Format Support</h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                Foto HD, Audio MP3, dan Video/Dokumen penting terakomodasi sesuai kebutuhan cerita kamu.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <span className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#F07865]" /> Audio
              </span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-amber-300" /> Video
              </span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-400" /> Photos
              </span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-400" /> PDF
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. PRE-FOOTER CTA                                             */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white border-t border-[#EFECE6]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-[#1E2229] tracking-tight leading-tight">
            Waktunya Ceritamu Menemukan Rumahnya
          </h2>
          <p className="text-[#646A78] text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Bergabunglah dengan ribuan keluarga lainnya yang telah mulai mengabadikan legacy mereka hari ini.
          </p>

          <div className="pt-4 space-y-3">
            <button
              onClick={() => router.push('/login')}
              className="px-8 py-4 rounded-full bg-[#F07865] hover:bg-[#E25C47] text-white text-base font-bold shadow-xl shadow-[#F07865]/30 transition hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Mulai Buat Kenangan Gratis</span>
            </button>
            <p className="text-xs text-[#8C8F96] font-medium">
              Tanpa kartu kredit. Selesai dalam 2 menit.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. FOOTER                                                     */}
      {/* ------------------------------------------------------------- */}
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
    </div>
  );
}

function BookOpenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}
