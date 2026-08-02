'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, PartyPopper, Coffee, Mail, Sunset, Gem, X } from 'lucide-react';
import { Spinner } from '@mysuf1020/mylib-ui';
import { apiClient } from '@/lib/api-client';

type Category = 'all' | 'anniversary' | 'first-dates' | 'wedding' | 'love-letters' | 'proposal';

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All Templates' },
  { key: 'anniversary', label: 'Anniversary' },
  { key: 'first-dates', label: 'First Dates' },
  { key: 'wedding', label: 'Wedding' },
  { key: 'love-letters', label: 'Love Letters' },
  { key: 'proposal', label: 'Proposal' },
];

const templates = [
  {
    id: 'anniversary-celebration',
    title: 'Anniversary Celebration',
    description: 'Celebrate years of togetherness with timeless elegance.',
    category: 'anniversary' as Category,
    tag: 'Anniversary',
    icon: PartyPopper,
    gradient: 'from-rose-400 via-rose-500 to-[#8E1A2E]',
  },
  {
    id: 'first-date-memory',
    title: 'First Date Memory',
    description: 'Recall the magic of where it all began in a beautiful story layout.',
    category: 'first-dates' as Category,
    tag: 'Memories',
    icon: Coffee,
    gradient: 'from-amber-400 via-amber-600 to-stone-700',
  },
  {
    id: 'eternal-love-letter',
    title: 'Eternal Love Letter',
    description: 'When words matter most. A classic, refined design for heartfelt notes.',
    category: 'love-letters' as Category,
    tag: 'Letters',
    icon: Mail,
    gradient: 'from-stone-300 via-stone-400 to-stone-600',
  },
  {
    id: 'destination-vows',
    title: 'Destination Vows',
    description: 'Capture the grandeur of your special day with panoramic layouts and gold-leaf accents.',
    category: 'wedding' as Category,
    tag: 'Wedding Collection',
    icon: Sunset,
    gradient: 'from-orange-300 via-rose-400 to-indigo-500',
  },
  {
    id: 'the-big-question',
    title: 'The Big Question',
    description: "A suspenseful and beautiful journey leading to 'Yes'.",
    category: 'proposal' as Category,
    tag: 'Proposal',
    icon: Gem,
    gradient: 'from-emerald-700 via-emerald-900 to-black',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [category, setCategory] = useState<Category>('all');
  const [search, setSearch] = useState('');
  const [creatingId, setCreatingId] = useState<string | null>(null);
  const [showScratchModal, setShowScratchModal] = useState(false);
  const [scratchTitle, setScratchTitle] = useState('');
  const [notice, setNotice] = useState<{ type: 'error' | 'info'; message: string } | null>(null);
  const [userName, setUserName] = useState('Creator');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('admin_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUserName((parsed.name || 'Creator').split(' ')[0]);
        } catch {
          // ignore malformed stored user
        }
      }
    }
  }, []);

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchesCategory = category === 'all' || t.category === category;
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const createStory = async (title: string) => {
    setNotice(null);
    try {
      const res = await apiClient.post('/stories', { title });
      if (res.data.success) {
        router.push(`/dashboard/stories/${res.data.data.id}`);
      }
    } catch (err: any) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'Gagal membuat cerita baru.' });
    }
  };

  const handleUseTemplate = async (templateId: string, title: string) => {
    setCreatingId(templateId);
    await createStory(title);
    setCreatingId(null);
  };

  const handleStartFromScratch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scratchTitle.trim()) return;
    setCreatingId('scratch');
    await createStory(scratchTitle.trim());
    setCreatingId(null);
    setShowScratchModal(false);
    setScratchTitle('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#B3223A] mb-1">Hello, {userName}</h1>
          <p className="text-slate-500 text-sm max-w-lg">
            Find the perfect template to express your heart. Our gallery is curated with love and designed for effortless creation.
          </p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="pl-10 pr-4 py-2.5 w-64 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B3223A] focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setCategory(c.key)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              category === c.key
                ? 'bg-gradient-to-r from-[#B3223A] to-[#8E1A2E] text-white shadow-md shadow-[#B3223A]/20'
                : 'bg-rose-50 text-[#B3223A] hover:bg-rose-100'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {notice && (
        <div
          className={`mb-6 p-3.5 rounded-xl border text-xs font-medium leading-relaxed ${
            notice.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          {notice.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filtered.map((template) => {
          const Icon = template.icon;
          const isCreating = creatingId === template.id;
          return (
            <div
              key={template.id}
              className="group rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden"
            >
              <div className={`relative h-40 bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
                <span className="absolute left-3 top-3 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wide">
                  {template.tag}
                </span>
                <Icon className="w-10 h-10 text-white/80" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-800 text-sm mb-1">{template.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{template.description}</p>
                <button
                  type="button"
                  onClick={() => handleUseTemplate(template.id, template.title)}
                  disabled={isCreating}
                  className="w-full py-2 rounded-lg font-bold text-xs bg-rose-50 text-[#B3223A] group-hover:bg-gradient-to-r group-hover:from-[#B3223A] group-hover:to-[#8E1A2E] group-hover:text-white transition flex items-center justify-center cursor-pointer disabled:opacity-60"
                >
                  {isCreating ? <Spinner size={14} /> : 'Use This Template'}
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400 text-sm">
            Tidak ada template yang cocok dengan pencarianmu.
          </div>
        )}
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-[#B3223A] to-[#6E1626] p-8 sm:p-10 text-center text-white shadow-xl mb-10">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-2">Don&rsquo;t see what you&rsquo;re looking for?</h2>
        <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto">
          Upload your own photos and our AI-guided editor will craft a custom romantic template just for you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowScratchModal(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-white text-[#B3223A] hover:bg-rose-50 transition cursor-pointer"
          >
            Start from Scratch
          </button>
          <button
            type="button"
            onClick={() => setNotice({ type: 'info', message: 'Premium Assets akan segera hadir.' })}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm border border-white/40 text-white hover:bg-white/10 transition cursor-pointer"
          >
            Browse Premium Assets
          </button>
        </div>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100 text-xs text-slate-400">
        <div>
          <span className="font-bold text-[#B3223A]">Memoverse</span>
          <span className="ml-2">&copy; {new Date().getFullYear()} Memoverse SaaS. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Contact Us</span>
        </div>
      </footer>

      {showScratchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-6 sm:p-8 relative">
            <button
              type="button"
              onClick={() => setShowScratchModal(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Beri Nama Ceritamu</h2>
            <p className="text-slate-500 text-xs mb-6">Misalnya "Kisah Kami" — kamu bisa mengubahnya kapan saja.</p>
            <form onSubmit={handleStartFromScratch} className="space-y-4">
              <input
                type="text"
                value={scratchTitle}
                onChange={(e) => setScratchTitle(e.target.value)}
                required
                autoFocus
                placeholder="Kisah Kami"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B3223A] focus:border-transparent transition"
              />
              <button
                type="submit"
                disabled={creatingId === 'scratch' || !scratchTitle.trim()}
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#B3223A] to-[#8E1A2E] text-white transition shadow-lg shadow-[#B3223A]/25 flex items-center justify-center cursor-pointer disabled:opacity-60"
              >
                {creatingId === 'scratch' ? <Spinner size={18} /> : 'Buat Cerita'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
