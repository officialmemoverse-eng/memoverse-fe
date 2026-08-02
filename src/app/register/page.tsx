'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, User, Eye, EyeOff, Quote } from 'lucide-react';
import { Spinner } from '@mysuf1020/mylib-ui';
import { apiClient } from '@/lib/api-client';

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.42-.22-2.05H12v3.72h6.6c-.13 1.09-.86 2.74-2.47 3.85l-.02.15 3.59 2.78.25.02c2.28-2.1 3.57-5.19 3.57-8.47Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.78-2.93c-1.02.7-2.4 1.19-4.15 1.19-3.18 0-5.88-2.1-6.84-5.02l-.14.01-3.72 2.88-.05.14C3.24 21.3 7.28 24 12 24Z" />
      <path fill="#FBBC05" d="M5.16 14.34A7.4 7.4 0 0 1 4.75 12c0-.81.14-1.6.4-2.34l-.01-.16-3.77-2.93-.12.06A11.96 11.96 0 0 0 0 12c0 1.93.46 3.76 1.25 5.37l3.9-3.03Z" />
      <path fill="#EA4335" d="M12 4.75c2.26 0 3.79.98 4.66 1.8l3.4-3.32C17.94 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.25 6.63l3.9 3.03C6.12 6.85 8.82 4.75 12 4.75Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.36 1.05c.1 1.02-.3 2.02-.93 2.75-.65.75-1.72 1.34-2.72 1.26-.12-1 .36-2.05.98-2.72.68-.75 1.85-1.3 2.67-1.29Zm3.36 16.8c-.5 1.15-.74 1.66-1.38 2.67-.9 1.4-2.16 3.14-3.73 3.16-1.4.02-1.76-.9-3.66-.89-1.9.01-2.29.9-3.69.88-1.57-.02-2.76-1.59-3.66-2.99C1.03 17.5.2 13.2 1.9 10.3c.85-1.44 2.37-2.35 4.03-2.37 1.44-.03 2.8.97 3.68.97.87 0 2.52-1.2 4.25-1.02.72.03 2.75.29 4.05 2.19-.1.07-2.42 1.42-2.39 4.23.03 3.35 2.94 4.47 2.97 4.48-.03.09-.46 1.6-1.17 3.07Z" />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: 'error' | 'info'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    if (password !== confirmPassword) {
      setNotice({ type: 'error', message: 'Konfirmasi password tidak cocok.' });
      return;
    }
    if (password.length < 6) {
      setNotice({ type: 'error', message: 'Password minimal 6 karakter.' });
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/admin/auth/register', { name, email, password });
      if (res.data.success) {
        localStorage.setItem('admin_token', res.data.data.access_token);
        localStorage.setItem('admin_user', JSON.stringify(res.data.data.user));
        router.push('/dashboard');
      }
    } catch (err: any) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'Registrasi gagal, silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  const handleComingSoon = (feature: string) => {
    setNotice({ type: 'info', message: `${feature} akan segera hadir.` });
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-white">

      {/* Left Side: MemoVerse Hero */}
      <div className="relative hidden md:flex flex-col justify-between p-10 lg:p-16 bg-gradient-to-br from-[#4A0F1C] via-[#6E1626] to-[#2A0A12] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.10),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="text-2xl font-extrabold tracking-tight mb-8">Memoverse</div>

          <div className="space-y-4 max-w-sm">
            <h2 className="text-3xl lg:text-4xl font-extrabold leading-snug tracking-tight">
              Mulai Ceritakan Perjalanan Cinta Kamu
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Bergabung sebagai creator dan bangun halaman romantis, album kenangan, serta timeline anniversary untuk dibagikan ke pasangan tersayang.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-10 max-w-sm rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-5">
          <Quote className="w-5 h-5 text-white/40 mb-2" />
          <p className="text-sm text-white/90 leading-relaxed italic">
            &ldquo;Memoverse mengubah cara kami merangkai kenangan pernikahan. Antarmukanya seindah konten yang ia bantu ciptakan.&rdquo;
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">Sarah Wijaya</div>
              <div className="text-[10px] text-white/60 uppercase tracking-wide">Wedding Planner Profesional</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Creator Register Form */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Buat Akun Creator</h3>
            <p className="text-slate-500 text-sm">Mulai kelola template romantis kamu bersama Memoverse.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              type="button"
              onClick={() => handleComingSoon('Daftar dengan Google')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition text-sm font-medium text-slate-700 cursor-pointer"
            >
              <GoogleIcon />
              Google
            </button>
            <button
              type="button"
              onClick={() => handleComingSoon('Daftar dengan Apple')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition text-sm font-medium text-slate-700 cursor-pointer"
            >
              <AppleIcon />
              Apple
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">Atau Email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {notice && (
            <div
              className={`mb-5 p-3.5 rounded-xl border text-xs font-medium leading-relaxed ${
                notice.type === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              {notice.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Nama Creator
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Nama lengkap Anda"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B3223A] focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Email Creator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="creator@memoverse.app"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B3223A] focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B3223A] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Ulangi password Anda"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B3223A] focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#B3223A] to-[#8E1A2E] hover:from-[#C93A52] hover:to-[#9F1D35] text-white transition shadow-lg shadow-[#B3223A]/25 mt-2 flex items-center justify-center cursor-pointer"
            >
              {loading ? <Spinner size={18} /> : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-[#B3223A] font-bold hover:text-[#8E1A2E] transition">
                Masuk di sini
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-center gap-2.5 text-[11px] text-slate-400">
            <span>Kebijakan Privasi</span>
            <span>·</span>
            <span>&copy; 2026 Memoverse</span>
            <span>·</span>
            <span>Ketentuan Layanan</span>
          </div>
        </div>
      </div>

    </div>
  );
}
