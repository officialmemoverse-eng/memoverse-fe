'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, KeyRound, Quote } from 'lucide-react';
import { Spinner } from '@mysuf1020/mylib-ui';
import { apiClient } from '@/lib/api-client';
import { GoogleSignInButton } from '@/components/auth/google-sign-in-button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: 'error' | 'info'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotice(null);

    try {
      const res = await apiClient.post('/admin/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('admin_token', res.data.data.access_token);
        localStorage.setItem('admin_user', JSON.stringify(res.data.data.user));
        router.push('/dashboard');
      }
    } catch (err: any) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'Login gagal, silakan periksa email & password Anda.' });
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@memoverse.app');
    setPassword('admin123');
    setNotice(null);
  };

  const handleComingSoon = (feature: string) => {
    setNotice({ type: 'info', message: `${feature} akan segera hadir.` });
  };

  const handleGoogleCredential = async (idToken: string) => {
    setLoading(true);
    setNotice(null);
    try {
      const res = await apiClient.post('/admin/auth/google', { credential: idToken });
      if (res.data.success) {
        localStorage.setItem('admin_token', res.data.data.access_token);
        localStorage.setItem('admin_user', JSON.stringify(res.data.data.user));
        router.push('/dashboard');
      }
    } catch (err: any) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'Login dengan Google gagal.' });
    } finally {
      setLoading(false);
    }
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
              Merangkai Kanvas Digital untuk Kenangan Romantis Kamu
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Platform kreator untuk cerita perjalanan cinta, album kenangan, timeline anniversary, dan halaman romantis yang bisa dibagikan ke pasangan tersayang.
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

      {/* Right Side: Creator Login Form */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Selamat Datang Kembali</h3>
            <p className="text-slate-500 text-sm">Masukkan detail Anda untuk mengakses Creator Studio.</p>
          </div>

          <div className="mb-5">
            <GoogleSignInButton onCredential={handleGoogleCredential} text="signin_with" />
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">Atau Email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {notice && (
            <div
              className={`mb-5 p-3.5 rounded-xl border text-xs font-medium leading-relaxed ${notice.type === 'error'
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-600">Password</label>
                <button
                  type="button"
                  onClick={() => handleComingSoon('Lupa password')}
                  className="text-xs font-semibold text-[#B3223A] hover:text-[#8E1A2E] transition cursor-pointer"
                >
                  Lupa?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan password Anda"
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

            <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-[#B3223A] focus:ring-[#B3223A] cursor-pointer"
              />
              Ingat saya selama 30 hari
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#B3223A] to-[#8E1A2E] hover:from-[#C93A52] hover:to-[#9F1D35] text-white transition shadow-lg shadow-[#B3223A]/25 flex items-center justify-center cursor-pointer"
            >
              {loading ? <Spinner size={18} /> : 'Masuk ke Hatimu'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[#B3223A] text-xs font-semibold transition cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Isi Kredensial Demo Admin</span>
            </button>
            <p className="text-slate-500 text-sm">
              Baru di Memoverse?{' '}
              <Link href="/register" className="text-[#B3223A] font-bold hover:text-[#8E1A2E] transition">
                Buat akun
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
