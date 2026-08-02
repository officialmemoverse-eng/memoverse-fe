'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { ArrowLeft, Heart } from 'lucide-react';
import { Spinner } from '@mysuf1020/mylib-ui';
import { API_BASE_URL } from '@/lib/api-client';
import { StoryView, StoryViewMedia } from '@/components/story/story-view';
import { StoryCover } from '@/components/story/story-cover';

type Story = {
  id: string;
  title: string;
  theme: string;
  subtitle: string;
  event_date: string;
  cover_media_id: string | null;
  media: StoryViewMedia[];
};

export default function PublicStoryPage() {
  const params = useParams();
  const id = params.id as string;

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    let cancelled = false;

    axios
      .get(`${API_BASE_URL}/public/stories/${id}`)
      .then((res) => {
        if (!cancelled && res.data.success) setStory({ ...res.data.data, media: res.data.data.media || [] });
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1219]">
        <Spinner size={32} />
      </div>
    );
  }

  if (notFound || !story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F1219] text-center px-4">
        <Heart className="w-8 h-8 text-slate-600 mb-4" />
        <h1 className="text-lg font-bold text-white mb-1">Cerita Tidak Ditemukan</h1>
        <p className="text-slate-400 text-sm max-w-sm">
          Kisah ini belum dipublikasikan atau tautannya sudah tidak berlaku.
        </p>
      </div>
    );
  }

  if (!opened) {
    const coverPhoto = story.media.find((m) => m.id === story.cover_media_id);
    return (
      <StoryCover
        theme={story.theme}
        title={story.title}
        subtitle={story.subtitle}
        eventDate={story.event_date}
        coverPhotoUrl={coverPhoto?.url}
        onOpen={() => setOpened(true)}
      />
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpened(false)}
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white text-xs font-semibold transition cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Sampul</span>
      </button>
      <StoryView title={story.title} theme={story.theme} media={story.media} />
    </div>
  );
}
