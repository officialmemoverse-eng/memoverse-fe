'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Flex, Spinner, TypographyContent, TypographyH2 } from '@mysuf1020/mylib-ui';
import { SocialAuthButtons } from './social-auth-buttons';
import { apiClient } from '@/lib/api-client';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      direction="col"
      justifyContent="space-between"
      className="w-full h-full min-h-screen p-8 md:p-16 bg-white"
    >
      <div className="w-full max-w-sm mx-auto my-auto py-4">
        {/* Header Title */}
        <div className="mb-6">
          <TypographyH2 className="text-2xl md:text-3xl font-serif font-bold text-[#1E2229] tracking-tight">
            Welcome back
          </TypographyH2>
          <TypographyContent className="text-slate-500 text-xs md:text-sm mt-1">
            Continue your family&apos;s narrative journey.
          </TypographyContent>
        </div>

        {/* Social Auth Option Buttons */}
        <SocialAuthButtons />

        {/* Divider */}
        <Flex alignItems="center" justifyContent="center" className="relative my-6">
          <div className="border-t border-slate-200 w-full" />
          <span className="absolute bg-white px-3 text-[11px] text-slate-400 font-medium tracking-wider uppercase">
            or with email
          </span>
        </Flex>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Main Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
            />
          </div>

          <div>
            <Flex alignItems="center" justifyContent="space-between" className="mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <Link
                href="#"
                className="text-[11px] font-medium text-slate-500 hover:text-slate-900 transition"
              >
                Forgot password?
              </Link>
            </Flex>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
            />
          </div>

          {/* Sign In Action Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-sm bg-[#0D2E3A] hover:bg-[#071D25] text-white transition shadow-sm mt-2 flex items-center justify-center cursor-pointer"
          >
            {loading ? <Spinner size={18} /> : 'Sign In'}
          </Button>
        </form>

        {/* Create Account Prompt */}
        <div className="mt-8 text-center space-y-1">
          <TypographyContent className="text-xs text-slate-500">
            New to More Than Memories?
          </TypographyContent>
          <Link
            href="#"
            className="text-xs font-bold text-slate-900 hover:underline inline-block"
          >
            Create an account
          </Link>
        </div>
      </div>

      {/* Page Footer */}
      <Flex
        alignItems="center"
        justifyContent="space-between"
        className="pt-6 border-t border-slate-100 flex-wrap text-[11px] text-slate-400 gap-2"
      >
        <TypographyContent className="text-[11px] text-slate-400">
          © 2026 More Than Memories
        </TypographyContent>
        <Flex alignItems="center" gap="4">
          <Link href="#" className="hover:text-slate-600 transition">
            Privacy
          </Link>
          <Link href="#" className="hover:text-slate-600 transition">
            Terms
          </Link>
          <Link href="#" className="hover:text-slate-600 transition">
            Help
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
