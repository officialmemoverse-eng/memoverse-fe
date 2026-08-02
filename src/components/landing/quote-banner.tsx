'use client';

export function QuoteBanner() {
  return (
    <section className="px-4 sm:px-8 py-16 sm:py-20 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden min-h-[420px] flex items-center p-8 sm:p-14 shadow-2xl border border-[#EFECE6]">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
          alt="Sunset Coastal View"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />

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
  );
}
