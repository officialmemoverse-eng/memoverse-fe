'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, User, Eye, EyeOff, Quote } from 'lucide-react';
import { Spinner } from '@mysuf1020/mylib-ui';
import { apiClient } from '@/lib/api-client';
import { GoogleSignInButton } from '@/components/auth/google-sign-in-button';

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

  const handleGoogleCredential = async (idToken: string) => {
    setNotice(null);
    setLoading(true);
    try {
      const res = await apiClient.post('/admin/auth/google', { credential: idToken });
      if (res.data.success) {
        localStorage.setItem('admin_token', res.data.data.access_token);
        localStorage.setItem('admin_user', JSON.stringify(res.data.data.user));
        router.push('/dashboard');
      }
    } catch (err: any) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'Daftar dengan Google gagal.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-white">

      {/* Left Side: MemoVerse Hero */}
      <div className="relative hidden md:flex flex-col justify-between p-10 lg:p-16 bg-[#264653] text-white overflow-hidden">
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D97757]/60 to-[#D97757] shrink-0" />
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

          <div className="mb-5">
            <GoogleSignInButton onCredential={handleGoogleCredential} text="signup_with" />
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
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#264653] focus:border-transparent transition"
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
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#264653] focus:border-transparent transition"
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
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#264653] focus:border-transparent transition"
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
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#264653] focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm bg-[#264653] hover:bg-[#D97757] text-white transition shadow-lg shadow-[#264653]/25 mt-2 flex items-center justify-center cursor-pointer"
            >
              {loading ? <Spinner size={18} /> : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-[#264653] font-bold hover:text-[#D97757] transition">
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
