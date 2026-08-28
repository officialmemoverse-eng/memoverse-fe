'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, LogOut, ChevronDown } from 'lucide-react';
import { Avatar } from '@mysuf1020/mylib-ui';

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('admin_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser({ name: 'Creator' });
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
    <header className="h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-end sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/my-creations"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#264653] hover:bg-[#D97757] text-white text-xs font-bold shadow-md shadow-[#264653]/25 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create New</span>
        </Link>

        <div className="relative border-l pl-4 border-slate-100">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-50 transition cursor-pointer focus:outline-none"
          >
            <Avatar
              fallback={user?.name ? user.name[0] : 'C'}
              className="bg-gradient-to-tr from-[#264653] to-[#D97757] text-white font-bold"
            />
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
              <div className="p-3 bg-[#264653]/10 rounded-xl mb-2">
                <p className="font-bold text-xs text-slate-700">{user?.name || 'Creator'}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email || ''}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition cursor-pointer text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
