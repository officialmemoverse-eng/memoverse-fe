'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Heart, Calendar, Image as ImageIcon, Music, Mail, Sparkles, Settings, Bookmark, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MemoVerseLogo } from '@/components/common/memoverse-logo';

const navigation = [
  { name: 'Public Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Love Timeline & Story', href: '/timeline', icon: Calendar },
  { name: 'Photo Gallery', href: '/gallery', icon: ImageIcon },
  { name: 'Love Letters & Notes', href: '/letters', icon: Mail },
  { name: 'Romantic Music Player', href: '/music', icon: Music },
  { name: 'Anniversary Countdown', href: '/anniversary', icon: Heart },
  { name: 'Special Wishlist', href: '/wishlist', icon: Star },
  { name: 'Template Customizer', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#141721] text-white min-h-screen flex flex-col border-r border-[#242938] shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#242938] bg-[#10121B]">
        <MemoVerseLogo className="w-9 h-9" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-[#C88242] to-[#B26F30] text-white shadow-md shadow-[#C88242]/25 font-bold'
                  : 'text-slate-300 hover:bg-[#1E2333] hover:text-amber-200'
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : "text-[#D9944D]")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#242938] text-[11px] text-amber-200/50 text-center bg-[#10121B]">
        MemoVerse SaaS Platform v1.0
      </div>
    </aside>
  );
}
