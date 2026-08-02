'use client';

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
} from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-[#F7F1EF] text-slate-900 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B3223A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8E1A2E]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Nav */}
      <header className="relative z-10 px-4 sm:px-8 py-6 flex items-center justify-between max-w-6xl mx-auto">
        <span className="text-xl font-extrabold text-[#B3223A] tracking-tight">Memoverse</span>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold text-slate-500 hover:text-[#B3223A] transition">
            Masuk
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm bg-gradient-to-r from-[#B3223A] to-[#8E1A2E] hover:from-[#C93A52] hover:to-[#9F1D35] text-white shadow-md shadow-[#B3223A]/25 transition"
          >
            Daftar
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-4 sm:px-8 pt-10 pb-20 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-[#B3223A] border border-rose-100 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Rangkai kenangan jadi cerita</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-5">
          Abadikan Kisahmu, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B3223A] to-[#8E1A2E]">
            Bagikan dengan Satu Tautan
          </span>
        </h1>

        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
          Kumpulkan foto, video, dan cerita menjadi satu halaman yang indah. Buat, sesuaikan temanya, lalu bagikan ke orang yang paling berarti bagimu.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#B3223A] to-[#8E1A2E] hover:from-[#C93A52] hover:to-[#9F1D35] text-white transition shadow-lg shadow-[#B3223A]/25"
          >
            <span>Mulai</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-sm bg-white border border-slate-200 hover:border-[#B3223A]/50 text-slate-700 transition"
          >
            Sudah Punya Akun
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 px-4 sm:px-8 pb-20 max-w-5xl mx-auto">
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
                className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm relative"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#B3223A] shrink-0">
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
      <section className="relative z-10 px-4 sm:px-8 pb-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#B3223A] shrink-0">
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
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#B3223A] to-[#4A0F1C] shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
            Siap merangkai kisahmu?
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mb-6">
            Gratis untuk mulai membuat, cukup bayar sekali saat siap membagikannya.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-white text-[#B3223A] hover:bg-rose-50 transition shadow-lg"
          >
            <span>Mulai Sekarang</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 px-4 sm:px-8 py-6 text-center text-slate-400 text-[11px]">
        © {new Date().getFullYear()} Memoverse. Dibuat dengan <Heart className="w-3 h-3 inline fill-[#B3223A] text-[#B3223A]" /> untuk cerita-cerita berharga.
      </footer>
    </div>
  );
}
