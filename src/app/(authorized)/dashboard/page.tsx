'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Sparkles,
  Calendar,
  Image as ImageIcon,
  Music,
  Share2,
  Clock,
  Star,
  MessageCircle,
  ChevronRight,
  Gift,
  Flame,
  Award,
  LogIn
} from 'lucide-react';
import { Badge, Spinner, Flex, Typography, TypographyH2, Button } from '@mysuf1020/mylib-ui';
import { Page } from '@/components/common/page';
import { Container } from '@/components/common/container';

export default function PublicMemoVerseDashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      setIsLoggedIn(!!token);
    }
  }, []);

  const coupleStats = [
    {
      label: 'Hari Bersama',
      value: '728 Hari',
      subtext: 'Sejak 14 Februari 2024',
      icon: Heart,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      href: '/anniversary',
    },
    {
      label: 'Momen Spesial Shared',
      value: '142 Kenangan',
      subtext: 'Foto & Video Terabadikan',
      icon: ImageIcon,
      color: 'text-[#D9944D]',
      bg: 'bg-[#C88242]/10',
      border: 'border-[#C88242]/30',
      href: '/gallery',
    },
    {
      label: 'Surat Cinta & Notes',
      value: '38 Surat',
      subtext: 'Pesan Romantis Tersimpan',
      icon: MessageCircle,
      color: 'text-amber-300',
      bg: 'bg-amber-400/10',
      border: 'border-amber-400/20',
      href: '/letters',
    },
    {
      label: 'Lagu Pasangan',
      value: '12 Playlist',
      subtext: 'BGM Kenangan Bersama',
      icon: Music,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      href: '/music',
    },
    {
      label: 'Wishlist Kencan',
      value: '8 Impian',
      subtext: 'Rencana Liburan Berdua',
      icon: Star,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      href: '/wishlist',
    },
    {
      label: 'Anniversary Berikutnya',
      value: '18 Hari Lagi',
      subtext: 'Menuju 2 Tahun Bersama',
      icon: Gift,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      href: '/anniversary',
    },
  ];

  const recentMemories = [
    { id: 1, title: 'Kencan Pertama di Cafe Rooftop', date: '14 Feb 2024', tag: 'First Date' },
    { id: 2, title: 'Liburan Pantai Sunset Bersama', date: '10 Jun 2024', tag: 'Vacation' },
    { id: 3, title: 'Merayakan Ulang Tahun Pasangan', date: '05 Nov 2024', tag: 'Birthday' },
  ];

  return (
    <Page>
      <Container>
        {/* MemoVerse Hero Banner (Dark Luxury & Gold Theme) */}
        <div className="bg-gradient-to-r from-[#1A1D28] via-[#161922] to-[#0F1219] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-8 border border-[#2A2E3D]">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#C88242]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-40 -top-10 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          <Flex justifyContent="space-between" alignItems="center" className="flex-wrap gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C88242]/20 text-[#D9944D] border border-[#C88242]/40 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-[#D9944D]" />
                <span>Public Couple Template Space</span>
              </div>
              <TypographyH2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Ruang Kenangan Cinta & Template MemoVerse
              </TypographyH2>
              <Typography className="text-slate-300 text-sm leading-relaxed">
                Selamat datang di platform ruang kenangan pasangan! Bagikan keindahan perjalanan cinta kamu dengan tampilan romantis yang dapat diakses publik kapan saja.
              </Typography>
            </div>

            <Flex alignItems="center" gap="3" className="flex-wrap">
              <div className="bg-[#1E222D]/90 backdrop-blur-sm border border-[#2A2E3D] px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs text-amber-200 shadow-inner">
                <Calendar className="w-4 h-4 text-[#D9944D] shrink-0" />
                <span className="font-semibold text-slate-200">
                  {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              {!isLoggedIn && (
                <Button
                  onClick={() => router.push('/login')}
                  className="bg-gradient-to-r from-[#C88242] to-[#B57335] hover:from-[#D9944D] hover:to-[#C88242] text-white border-none shadow-lg shadow-[#C88242]/25 font-bold text-xs"
                >
                  <Flex alignItems="center" gap="2">
                    <LogIn className="w-4 h-4" />
                    <span>Masuk Portal Creator</span>
                  </Flex>
                </Button>
              )}
            </Flex>
          </Flex>
        </div>

        {/* Dynamic Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {coupleStats.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={() => router.push(card.href)}
                className={`group p-5 rounded-2xl border ${card.border} bg-[#161922] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 cursor-pointer relative overflow-hidden`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Typography level="sm" className="font-semibold text-slate-400 text-xs tracking-wide">
                      {card.label}
                    </Typography>
                    <TypographyH2 className="text-2xl font-extrabold text-white tracking-tight">
                      {card.value}
                    </TypographyH2>
                    <Typography level="sm" className="text-xs text-amber-200/60 font-medium">
                      {card.subtext}
                    </Typography>
                  </div>

                  <div className={`p-3.5 rounded-2xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform duration-200 shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2A2E3D] flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#D9944D] transition-colors">
                  <span>Lihat Detail</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section: Recent Memory Timeline Highlights */}
        <div className="bg-[#161922] rounded-2xl border border-[#2A2E3D] p-6 shadow-xl">
          <Flex justifyContent="space-between" alignItems="center" className="pb-4 mb-4 border-b border-[#2A2E3D]">
            <Flex alignItems="center" gap="2.5">
              <div className="p-2 rounded-xl bg-[#C88242]/20 text-[#D9944D]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <TypographyH2 className="text-base font-bold text-white">
                  Highlight Kenangan Terkini
                </TypographyH2>
                <Typography className="text-slate-400 text-xs">
                  Perjalanan momen paling berkesan bersama pasangan
                </Typography>
              </div>
            </Flex>

            <button
              onClick={() => router.push('/gallery')}
              className="text-xs font-bold text-[#D9944D] hover:text-[#F5C984] inline-flex items-center gap-1 cursor-pointer hover:underline"
            >
              <span>Lihat Semua Foto</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </Flex>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentMemories.map((mem) => (
              <div
                key={mem.id}
                className="p-4 rounded-xl bg-[#1E222D] border border-[#2A2E3D] hover:border-[#C88242]/50 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="default" className="text-[10px] bg-[#C88242]/20 text-[#D9944D] border border-[#C88242]/40">
                      {mem.tag}
                    </Badge>
                    <span className="text-[11px] text-slate-400">{mem.date}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug">{mem.title}</h4>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2A2E3D]/60 flex items-center justify-between text-xs text-amber-200/70">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> Abadi
                  </span>
                  <span className="text-xs text-[#D9944D] font-semibold">Buka Memory &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Page>
  );
}
