'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, CheckCircle2, KeyRound, Heart, Sparkles } from 'lucide-react';
import { Button, Spinner } from '@mysuf1020/mylib-ui';
import { apiClient } from '@/lib/api-client';
import { AstharaLogo } from '@/components/common/asthara-logo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await apiClient.post('/admin/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('admin_token', res.data.data.access_token);
        localStorage.setItem('admin_user', JSON.stringify(res.data.data.user));
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login gagal, silakan periksa email & password Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@memoverse.app');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#0F1219] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C88242]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#965821]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl bg-[#161922]/90 border border-[#2A2E3D] shadow-2xl backdrop-blur-2xl overflow-hidden z-10">
        
        {/* Left Side: MemoVerse SaaS Hero */}
        <div className="p-8 md:p-10 bg-gradient-to-br from-[#1E222D] via-[#161922] to-[#0F1219] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#2A2E3D]">
          <div>
            <div className="mb-8">
              <AstharaLogo className="w-10 h-10" />
            </div>

            <div className="space-y-4 my-8">
              <h2 className="text-2xl font-extrabold text-white leading-snug tracking-tight">
                MemoVerse Couple Space Creator Portal
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Platform SaaS pembuatan web template romantis pasangan. Kelola cerita perjalanan cinta, album kenangan, timeline anniversary, dan bagikan tautan publik untuk pasangan tersayang.
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-6 border-t border-[#2A2E3D]/80">
            <div className="flex items-center gap-2 text-xs text-amber-100/90 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#D9944D] shrink-0" />
              <span>Public Link Sharing for Loved Ones</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-100/90 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#D9944D] shrink-0" />
              <span>Customizable Romantic Themes & Music Player</span>
            </div>
          </div>
        </div>

        {/* Right Side: Creator Login Form */}
        <div className="p-8 md:p-10 flex flex-col justify-center bg-[#161922]">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-1">Masuk Portal Creator</h3>
            <p className="text-slate-400 text-xs">Masukkan akun creator untuk mengelola template bucin kamu</p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Email Creator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="creator@memoverse.app"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F1219] border border-[#2A2E3D] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#C88242] focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan password Anda"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#0F1219] border border-[#2A2E3D] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#C88242] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#C88242] to-[#B57335] hover:from-[#D9944D] hover:to-[#C88242] text-white transition shadow-lg shadow-[#C88242]/25 mt-2 flex items-center justify-center cursor-pointer"
            >
              {loading ? <Spinner size={18} /> : 'Masuk Portal Creator'}
            </button>
          </form>

          {/* Quick Demo Autofill Button */}
          <div className="mt-6 pt-5 border-t border-[#2A2E3D] text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C88242]/10 hover:bg-[#C88242]/20 border border-[#C88242]/30 text-[#D9944D] text-xs font-semibold transition cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Isi Kredensial Demo Admin</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
