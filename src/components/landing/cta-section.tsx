'use client';

import { useRouter } from 'next/navigation';

export function CtaSection() {
  const router = useRouter();

  return (
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
  );
}
