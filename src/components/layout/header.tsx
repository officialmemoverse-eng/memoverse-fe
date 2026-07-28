'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, LogOut, LogIn, Sparkles, ChevronDown, Share2 } from 'lucide-react';
import { Flex, Avatar, Badge, Button } from '@mysuf1020/mylib-ui';

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('admin_user');
      const token = localStorage.getItem('admin_token');
      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser({ name: 'Admin Creator', email: 'admin@memoverse.app' });
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      localStorage.removeItem('token');
    }
    setUser(null);
    setShowUserMenu(false);
    router.push('/login');
  };

  return (
    <header className="h-16 bg-[#161922] border-b border-[#2A2E3D] px-6 flex items-center justify-between sticky top-0 z-30 shadow-lg backdrop-blur-md">
      {/* Brand Header */}
      <div className="text-sm font-bold text-white flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#C88242] to-[#D9944D] flex items-center justify-center shadow-md shadow-[#C88242]/30">
          <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-extrabold tracking-wide text-sm flex items-center gap-1.5">
            MemoVerse SaaS <Sparkles className="w-3.5 h-3.5 text-[#D9944D]" />
          </span>
          <span className="text-[11px] text-amber-200/60 font-medium">Public Couple Template Platform</span>
        </div>
      </div>

      <Flex alignItems="center" gap="4">
        {/* Quick Share Link Preview */}
        <button
          onClick={() => {
            if (typeof navigator !== 'undefined') {
              navigator.clipboard?.writeText(window.location.href);
              alert('Link template public berhasil disalin! Kirimkan ke pasangan kamu â¤ï¸');
            }
          }}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#1E222D] hover:bg-[#252B3A] border border-[#2A2E3D] text-xs font-semibold text-amber-200 transition cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-[#D9944D]" />
          <span>Bagikan Link Template</span>
        </button>

        {/* User Account / Login Action */}
        {user ? (
          <div className="relative border-l pl-4 border-[#2A2E3D]">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-1 rounded-xl hover:bg-[#1E222D] transition cursor-pointer focus:outline-none"
            >
              <Avatar fallback={user.name ? user.name[0] : 'A'} className="bg-gradient-to-tr from-[#C88242] to-[#B57335] text-white font-bold" />
              <div className="text-left text-xs hidden sm:block">
                <div className="font-semibold text-white">{user.name || 'Admin Creator'}</div>
                <div className="text-amber-200/70 text-[11px]">Creator Session</div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#161922] rounded-2xl shadow-2xl border border-[#2A2E3D] p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-3 bg-[#1E222D] rounded-xl mb-2 border border-[#2A2E3D]">
                  <p className="font-bold text-xs text-white">{user.name || 'Admin Creator'}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user.email || 'admin@memoverse.app'}</p>
                  <Badge variant="success" className="mt-1 text-[10px]">Active Session</Badge>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="border-l pl-4 border-[#2A2E3D]">
            <Button
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-[#C88242] to-[#B57335] hover:from-[#D9944D] hover:to-[#C88242] text-white border-none shadow-lg shadow-[#C88242]/25 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk / Login</span>
            </Button>
          </div>
        )}
      </Flex>
    </header>
  );
}
