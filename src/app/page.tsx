'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  Sparkles,
  ImageIcon,
  Palette,
  Link2,
  Lock,
  ChevronRight,
  Upload,
  Eye,
  CreditCard,
  Share2,
  Menu,
  X,
} from 'lucide-react';

// add comment

const navLinks = [
  { href: '#cara-kerja', label: 'Cara Kerja' },
  { href: '#fitur', label: 'Fitur' },
];

const steps = [
  {
    icon: Heart,
    title: 'Buat Cerita',
    desc: 'Beri nama kisahmu, misalnya "Kisah Kami".',
  },
  {
    icon: Upload,
    title: 'Susun Momen',
    desc: 'Unggah foto & video, tulis caption, pilih tema favorit.',
  },
  {
    icon: Eye,
    title: 'Preview',
    desc: 'Lihat tampilan akhir sebelum dibagikan.',
  },
  {
    icon: CreditCard,
    title: 'Bayar Sekali',
    desc: 'Satu kali pembayaran untuk membuka publikasi.',
  },
  {
    icon: Share2,
    title: 'Bagikan',
    desc: 'Publikasikan dan kirim satu tautan ke orang tersayang.',
  },
];

const features = [
  {
    icon: ImageIcon,
    title: 'Foto & Video Tanpa Batas Cerita',
    desc: 'Susun galeri momen berharga lengkap dengan caption personal.',
  },
  {
    icon: Palette,
    title: 'Tema yang Bisa Disesuaikan',
    desc: 'Pilih nuansa yang paling menggambarkan kisahmu.',
  },
  {
    icon: Link2,
    title: 'Satu Tautan untuk Dibagikan',
    desc: 'Cukup kirim satu link, kisahmu bisa dibuka kapan saja.',
  },
  {
    icon: Lock,
    title: 'Privat Sampai Kamu Siap',
    desc: 'Cerita tetap tersimpan aman sebelum kamu publikasikan.',
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F1EB] text-slate-900 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#264653]/10 rounded-full blur-3xl pointer-events-none animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D97757]/10 rounded-full blur-3xl pointer-events-none animate-[float_12s_ease-in-out_infinite_1s]" />

      {/* Floating Header */}
      <header className="fixed top-4 inset-x-4 sm:top-6 sm:inset-x-6 z-50 max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-lg shadow-black/5 px-4 sm:px-6 py-3">
          <span className="text-lg sm:text-xl font-extrabold text-[#264653] tracking-tight">Memoverse</span>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-500 hover:text-[#264653] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-slate-500 hover:text-[#264653] transition-colors">
              Masuk
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm bg-[#264653] hover:bg-[#D97757] text-white shadow-md shadow-[#264653]/25 transition-all hover:scale-105"
            >
              Daftar
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 rounded-xl text-[#264653] hover:bg-[#264653]/10 transition cursor-pointer"
            aria-label="Buka menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-[82%] max-w-xs bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-extrabold text-[#264653] tracking-tight">Memoverse</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 mb-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-[#264653]/10 hover:text-[#264653] transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full text-center px-4 py-3 rounded-xl font-bold text-sm bg-white border border-slate-200 text-slate-700 hover:border-[#264653]/50 transition"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="w-full text-center px-4 py-3 rounded-xl font-bold text-sm bg-[#264653] hover:bg-[#D97757] text-white shadow-md shadow-[#264653]/25 transition"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative z-10 px-4 sm:px-8 pt-32 sm:pt-40 pb-20 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#264653]/10 text-[#264653] border border-[#264653]/20 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Rangkai kenangan jadi cerita</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-5">
          Abadikan Kisahmu, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#264653] to-[#D97757]">
            Bagikan dengan Satu Tautan
          </span>
        </h1>

        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
          Kumpulkan foto, video, dan cerita menjadi satu halaman yang indah. Buat, sesuaikan temanya, lalu bagikan ke orang yang paling berarti bagimu.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-[#264653] hover:bg-[#D97757] text-white transition-all hover:scale-105 shadow-lg shadow-[#264653]/25"
          >
            <span>Mulai</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-sm bg-white border border-slate-200 hover:border-[#264653]/50 text-slate-700 transition-all hover:scale-105"
          >
            Masuk
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section id="cara-kerja" className="relative z-10 px-4 sm:px-8 pb-20 max-w-5xl mx-auto scroll-mt-28">
        <h2 className="text-center text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
          Empat Langkah Menuju Kisahmu
        </h2>
        <p className="text-center text-slate-500 text-xs sm:text-sm mb-10">
          Dari ide sampai dibagikan, semua bisa selesai dalam hitungan menit.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#264653]/10 border border-[#264653]/20 flex items-center justify-center text-[#264653] shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section id="fitur" className="relative z-10 px-4 sm:px-8 pb-20 max-w-5xl mx-auto scroll-mt-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#264653]/10 border border-[#264653]/20 flex items-center justify-center text-[#264653] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{feature.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative z-10 px-4 sm:px-8 pb-16 max-w-3xl mx-auto text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#264653] shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
            Siap merangkai kisahmu?
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mb-6">
            Gratis untuk mulai membuat, cukup bayar sekali saat siap membagikannya.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-white text-[#264653] hover:bg-[#264653]/10 transition-all hover:scale-105 shadow-lg"
          >
            <span>Mulai Sekarang</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 px-4 sm:px-8 py-6 text-center text-slate-400 text-[11px]">
        © {new Date().getFullYear()} Memoverse. Dibuat dengan <Heart className="w-3 h-3 inline fill-[#264653] text-[#264653]" /> untuk cerita-cerita berharga.
      </footer>
    </div>
  );
}
