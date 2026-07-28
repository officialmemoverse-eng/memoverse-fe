'use client';

import { Lock, Volume2, Video, Camera, FileText } from 'lucide-react';

export function BentoFeatures() {
  return (
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

        {/* Top-Right Card (Pasti Privat) */}
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

        {/* Bottom-Left Card */}
        <div className="lg:col-span-4 bg-[#F5F3EF] rounded-3xl p-8 text-left border border-[#EFECE6] flex items-center justify-center min-h-[220px]">
          <div className="text-center space-y-2">
            <BookOpenIcon className="w-10 h-10 text-[#F07865] mx-auto" />
            <div className="font-bold text-sm text-[#1E2229]">Digital Family Album</div>
            <div className="text-xs text-[#8C8F96]">Cetak & Simpan Abadi</div>
          </div>
        </div>

        {/* Bottom-Right Card (Multi-Format Support) */}
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
