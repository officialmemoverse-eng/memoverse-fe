'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Plus, X, BookHeart, Clock, ChevronRight } from 'lucide-react';
import { Spinner } from '@mysuf1020/mylib-ui';
import { Page } from '@/components/common/page';
import { Container } from '@/components/common/container';
import { apiClient } from '@/lib/api-client';

type Story = {
  id: string;
  title: string;
  status: string;
  created_at: string;
};

export default function MyCreationsPage() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/stories');
      if (res.data.success) {
        setStories(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to load stories', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setCreating(true);
    setError('');
    try {
      const res = await apiClient.post('/stories', { title: title.trim() });
      if (res.data.success) {
        setTitle('');
        setShowCreateForm(false);
        router.push(`/dashboard/stories/${res.data.data.id}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal membuat cerita baru.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <Page className="bg-[#F6F1EB]">
      <Container>
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden mb-8 border border-slate-100">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#264653]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#264653]/10 text-[#264653] border border-[#264653]/20 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-[#264653]" />
                <span>Cerita Saya</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Semua Kisahmu di Sini
              </h1>
              <p className="text-slate-500 text-sm leading-relaxed">
                Kelola cerita yang sedang kamu susun, atau mulai cerita baru untuk dibagikan.
              </p>
            </div>

            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-[#264653] hover:bg-[#D97757] text-white transition shadow-lg shadow-[#264653]/25 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Cerita Baru</span>
            </button>
          </div>
        </div>

        {/* Story List */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size={32} />
          </div>
        ) : stories.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white border border-slate-100 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#264653]/10 border border-[#264653]/20 flex items-center justify-center text-[#264653] mx-auto mb-4">
              <BookHeart className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Belum Ada Cerita</h2>
            <p className="text-slate-500 text-sm mb-6">
              Mulai buat cerita pertamamu dan abadikan momen berharga.
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#264653] hover:bg-[#D97757] text-white transition shadow-lg shadow-[#264653]/25 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Mulai Cerita Baru</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stories.map((story) => (
              <div
                key={story.id}
                onClick={() => router.push(`/dashboard/stories/${story.id}`)}
                className="group p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#264653]/10 border border-[#264653]/20 flex items-center justify-center text-[#264653] shrink-0">
                    <BookHeart className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                      story.status === 'published'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}
                  >
                    {story.status === 'published' ? 'Terbit' : 'Draft'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2 truncate">{story.title}</h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {new Date(story.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#264653] transition-colors">
                  <span>Lanjutkan</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Story Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-6 sm:p-8 relative">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setError('');
                }}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-[#264653]/10 border border-[#264653]/20 flex items-center justify-center text-[#264653] mb-4">
                <BookHeart className="w-6 h-6" />
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-1">Beri Nama Ceritamu</h2>
              <p className="text-slate-500 text-xs mb-6">
                Misalnya "Kisah Kami" — kamu bisa mengubahnya kapan saja.
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleCreate} className="space-y-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoFocus
                  placeholder="Kisah Kami"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#264653] focus:border-transparent transition"
                />

                <button
                  type="submit"
                  disabled={creating || !title.trim()}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-[#264653] hover:bg-[#D97757] text-white transition shadow-lg shadow-[#264653]/25 flex items-center justify-center cursor-pointer disabled:opacity-60"
                >
                  {creating ? <Spinner size={18} /> : 'Buat Cerita'}
                </button>
              </form>
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
}
