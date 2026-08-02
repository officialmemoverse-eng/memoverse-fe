'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, Copy, ExternalLink, Rocket } from 'lucide-react';
import { Spinner } from '@mysuf1020/mylib-ui';
import { apiClient } from '@/lib/api-client';
import { StoryView, StoryViewMedia } from '@/components/story/story-view';
import { StoryCover } from '@/components/story/story-cover';

type Story = {
  id: string;
  title: string;
  theme: string;
  status: string;
  subtitle: string;
  event_date: string;
  cover_media_id: string | null;
  media: StoryViewMedia[];
};

export default function StoryPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState('');
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin);
  }, []);

  const fetchStory = async () => {
    try {
      const res = await apiClient.get(`/stories/${id}`);
      if (res.data.success) setStory({ ...res.data.data, media: res.data.data.media || [] });
    } catch (err) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const shareUrl = origin ? `${origin}/s/${id}` : '';

  const handlePublish = async () => {
    setPublishing(true);
    setPublishError('');
    try {
      const res = await apiClient.post(`/stories/${id}/publish`);
      if (res.data.success) {
        setStory((prev) => (prev ? { ...prev, status: res.data.data.status } : prev));
      }
    } catch (err: any) {
      setPublishError(err.response?.data?.message || 'Gagal mempublikasikan cerita.');
    } finally {
      setPublishing(false);
    }
  };

  const handleCopy = async () => {
    if (!shareUrl || typeof navigator === 'undefined') return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy share link', err);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => router.push(`/dashboard/stories/${id}`)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#B3223A] transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Edit</span>
            </button>

            {story && story.status !== 'published' && (
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#B3223A] to-[#8E1A2E] hover:from-[#C93A52] hover:to-[#9F1D35] text-white transition shadow-lg shadow-[#B3223A]/25 cursor-pointer disabled:opacity-60"
              >
                {publishing ? <Spinner size={16} /> : <Rocket className="w-4 h-4" />}
                <span>{publishing ? 'Mempublikasikan...' : 'Publikasikan'}</span>
              </button>
            )}
          </div>

          {publishError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
              {publishError}
            </div>
          )}

          {story?.status === 'published' && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-emerald-700 mb-0.5">Cerita sudah terbit</p>
                <p className="text-xs text-slate-500 truncate">{shareUrl}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin Tautan'}</span>
                </button>
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16 bg-[#F7F1EF] min-h-screen">
          <Spinner size={32} />
        </div>
      ) : notFound || !story ? (
        <div className="p-12 text-center bg-[#F7F1EF] min-h-screen text-slate-500">
          Cerita tidak ditemukan.
        </div>
      ) : !opened ? (
        <StoryCover
          theme={story.theme}
          title={story.title}
          subtitle={story.subtitle}
          eventDate={story.event_date}
          coverPhotoUrl={story.media.find((m) => m.id === story.cover_media_id)?.url}
          shareUrl={shareUrl}
          onOpen={() => setOpened(true)}
        />
      ) : (
        <div className="relative">
          <button
            onClick={() => setOpened(false)}
            className="fixed left-4 top-20 z-40 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white text-xs font-semibold transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Sampul</span>
          </button>
          <StoryView title={story.title} theme={story.theme} media={story.media} />
        </div>
      )}
    </div>
  );
}
