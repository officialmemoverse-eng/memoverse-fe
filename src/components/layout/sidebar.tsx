'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutGrid, BookHeart, PenTool, Heart, Tag, Settings, LifeBuoy, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Templates', href: '/dashboard', icon: LayoutGrid },
  { name: 'My Creations', href: '/dashboard/my-creations', icon: BookHeart },
  { name: 'Editor', icon: PenTool, editorLink: true },
  { name: 'Collections', icon: Heart, comingSoon: true },
  { name: 'Pricing', icon: Tag, comingSoon: true },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      localStorage.removeItem('token');
    }
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-white min-h-screen flex flex-col border-r border-slate-100 shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="text-lg font-extrabold text-[#264653] tracking-tight">Memoverse</div>
        <div className="text-xs text-slate-400">Creator Studio</div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5">
        {navigation.map((item) => {
          const Icon = item.icon;

          if (item.comingSoon) {
            return (
              <div
                key={item.name}
                title="Segera hadir"
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl text-slate-300 cursor-not-allowed select-none"
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                <span>{item.name}</span>
              </div>
            );
          }

          const isEditorContext = item.editorLink && pathname.startsWith('/dashboard/stories');
          const href = item.editorLink ? (isEditorContext ? pathname : '/dashboard/my-creations') : item.href!;
          const isActive = item.editorLink
            ? isEditorContext
            : pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href!));

          return (
            <Link
              key={item.name}
              href={href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-[#264653] text-white shadow-md shadow-[#264653]/25'
                  : 'text-slate-500 hover:bg-[#264653]/10 hover:text-[#264653]'
              )}
            >
              <Icon className={cn('w-4.5 h-4.5 shrink-0', isActive ? 'text-white' : 'text-[#264653]')} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 space-y-3">
        <div className="rounded-2xl bg-[#264653]/10 border border-[#264653]/20 p-4">
          <p className="text-xs font-semibold text-slate-600 mb-2">Ready for more?</p>
          <button
            type="button"
            className="w-full py-2 rounded-lg bg-[#264653] hover:bg-[#D97757] text-white text-xs font-bold shadow-md shadow-[#264653]/20 transition cursor-pointer"
          >
            Upgrade to Pro
          </button>
        </div>

        <div className="space-y-1 pt-2 border-t border-slate-100">
          <button
            type="button"
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <LifeBuoy className="w-4 h-4" />
            <span>Support</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-[#264653] transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
