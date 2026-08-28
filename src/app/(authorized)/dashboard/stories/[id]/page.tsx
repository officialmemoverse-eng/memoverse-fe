'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Check,
  Cloud,
  Eye,
  Image as ImageIcon,
  ImagePlus,
  Link2,
  Loader2,
  Monitor,
  Music,
  Palette,
  Pencil,
  Smartphone,
  Trash2,
  Upload,
  ChevronDown,
} from 'lucide-react';
import { Spinner } from '@mysuf1020/mylib-ui';
import { apiClient } from '@/lib/api-client';
import { THEMES } from '@/lib/themes';
import { COVER_GRADIENTS } from '@/lib/story-cover';

type Media = {
  id: string;
  type: 'photo' | 'video';
  url: string;
  caption: string;
  sort_order: number;
};

type Story = {
  id: string;
  title: string;
  theme: string;
  status: string;
  subtitle: string;
  event_date: string;
  music_key: string;
  cover_media_id: string | null;
  created_at: string;
  media: Media[];
};

type CoverMeta = {
  subtitle: string;
  eventDate: string;
  musicKey: string;
  coverMediaId: string;
};

const MUSIC_OPTIONS = [
  { key: 'none', label: 'Tanpa Musik' },
  { key: 'first-dance', label: 'First Dance' },
  { key: 'golden-hour', label: 'Golden Hour' },
  { key: 'quiet-piano', label: 'Quiet Piano' },
  { key: 'sunset-waltz', label: 'Sunset Waltz' },
];

export default function StoryEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [tab, setTab] = useState<'cover' | 'gallery'>('cover');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const [title, setTitle] = useState('');
  const [savingTitle, setSavingTitle] = useState(false);
  const [savingTheme, setSavingTheme] = useState(false);

  const [subtitle, setSubtitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [musicKey, setMusicKey] = useState('none');
  const [coverMediaId, setCoverMediaId] = useState('');
  const [savingCover, setSavingCover] = useState(false);
  const savedMetaRef = useRef<CoverMeta>({ subtitle: '', eventDate: '', musicKey: 'none', coverMediaId: '' });

  const [uploading, setUploading] = useState(false);
  const [uploadCaption, setUploadCaption] = useState('');
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);
  const [captionDraft, setCaptionDraft] = useState('');
  const [savingCaption, setSavingCaption] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [origin, setOrigin] = useState('');
  const [copied, setCopied] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin);
  }, []);

  const shareUrl = origin ? `${origin}/s/${id}` : '';

  const fetchStory = async () => {
    try {
      const res = await apiClient.get(`/stories/${id}`);
      if (res.data.success) {
        const data = res.data.data;
        setStory({ ...data, media: data.media || [] });
        setTitle(data.title);

        const initialMeta: CoverMeta = {
          subtitle: data.subtitle || '',
          eventDate: data.event_date || '',
          musicKey: data.music_key || 'none',
          coverMediaId: data.cover_media_id || '',
        };
        setSubtitle(initialMeta.subtitle);
        setEventDate(initialMeta.eventDate);
        setMusicKey(initialMeta.musicKey);
        setCoverMediaId(initialMeta.coverMediaId);
        savedMetaRef.current = initialMeta;
      }
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

  // Debounced autosave for cover fields (subtitle, date, music, cover photo).
  useEffect(() => {
    if (!story) return;
    const current: CoverMeta = { subtitle, eventDate, musicKey, coverMediaId };
    const saved = savedMetaRef.current;
    const unchanged = (Object.keys(current) as (keyof CoverMeta)[]).every((key) => current[key] === saved[key]);
    if (unchanged) return;

    setSavingCover(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await apiClient.put(`/stories/${id}`, {
          subtitle: current.subtitle,
          event_date: current.eventDate,
          music_key: current.musicKey,
          cover_media_id: current.coverMediaId,
        });
        if (res.data.success) {
          savedMetaRef.current = current;
        }
      } catch (err) {
        console.error('Failed to save cover details', err);
      } finally {
        setSavingCover(false);
      }
    }, 700);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtitle, eventDate, musicKey, coverMediaId, story, id]);

  const handleSaveTitle = async () => {
    if (!story || !title.trim() || title === story.title) return;
    setSavingTitle(true);
    try {
      const res = await apiClient.put(`/stories/${id}`, { title: title.trim() });
      if (res.data.success) {
        setStory((prev) => (prev ? { ...prev, title: res.data.data.title } : prev));
      }
    } catch (err) {
      console.error('Failed to save title', err);
    } finally {
      setSavingTitle(false);
    }
  };

  const handleSelectTheme = async (theme: string) => {
    if (!story || story.theme === theme) return;
    setSavingTheme(true);
    try {
      const res = await apiClient.put(`/stories/${id}`, { theme });
      if (res.data.success) {
        setStory((prev) => (prev ? { ...prev, theme: res.data.data.theme } : prev));
      }
    } catch (err) {
      console.error('Failed to save theme', err);
    } finally {
      setSavingTheme(false);
    }
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !story) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('caption', uploadCaption);

      const res = await apiClient.post(`/stories/${id}/media`, formData, {
        headers: { 'Content-Type': undefined },
      });

      if (res.data.success) {
        setStory((prev) => (prev ? { ...prev, media: [...prev.media, res.data.data] } : prev));
        setUploadCaption('');
      }
    } catch (err) {
      console.error('Failed to upload media', err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const startEditCaption = (media: Media) => {
    setEditingCaptionId(media.id);
    setCaptionDraft(media.caption);
  };

  const handleSaveCaption = async (mediaId: string) => {
    setSavingCaption(true);
    try {
      const res = await apiClient.put(`/stories/${id}/media/${mediaId}`, { caption: captionDraft });
      if (res.data.success) {
        setStory((prev) =>
          prev
            ? { ...prev, media: prev.media.map((m) => (m.id === mediaId ? res.data.data : m)) }
            : prev
        );
      }
    } catch (err) {
      console.error('Failed to save caption', err);
    } finally {
      setSavingCaption(false);
      setEditingCaptionId(null);
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    setDeletingId(mediaId);
    try {
      const res = await apiClient.delete(`/stories/${id}/media/${mediaId}`);
      if (res.data.success) {
        setStory((prev) => (prev ? { ...prev, media: prev.media.filter((m) => m.id !== mediaId) } : prev));
        if (coverMediaId === mediaId) setCoverMediaId('');
      }
    } catch (err) {
      console.error('Failed to delete media', err);
    } finally {
      setDeletingId(null);
    }
  };

  const copyShareLink = async () => {
    if (!shareUrl || typeof navigator === 'undefined' || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Clipboard access can fail for reasons unrelated to publishing (permissions,
      // insecure context, etc.) — don't let it look like the publish itself failed.
      console.error('Failed to copy share link', err);
    }
  };

  const handleGenerateLink = async () => {
    if (!story) return;

    if (story.status === 'published') {
      await copyShareLink();
      return;
    }

    setPublishing(true);
    setPublishError('');
    try {
      const res = await apiClient.post(`/stories/${id}/publish`);
      if (res.data.success) {
        setStory((prev) => (prev ? { ...prev, status: res.data.data.status } : prev));
        await copyShareLink();
      }
    } catch (err: any) {
      setPublishError(err.response?.data?.message || 'Gagal mempublikasikan cerita.');
    } finally {
      setPublishing(false);
    }
  };

  const photoMedia = story?.media.filter((m) => m.type === 'photo') || [];
  const coverPhoto = photoMedia.find((m) => m.id === coverMediaId);
  const activeThemeLabel = THEMES.find((t) => t.id === story?.theme)?.label || 'Classic';
  const coverGradient = COVER_GRADIENTS[story?.theme || 'classic'] || COVER_GRADIENTS.classic;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size={32} />
      </div>
    );
  }

  if (notFound || !story) {
    return (
      <div className="max-w-xl mx-auto p-10 text-center">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Cerita Tidak Ditemukan</h2>
        <p className="text-slate-500 text-sm">Cerita ini mungkin sudah dihapus atau bukan milikmu.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0EDEB]">
      {/* Custom editor toolbar — replaces the shared app header on this route */}
      <div className="h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => router.push('/dashboard/my-creations')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#264653] transition cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Live WYSIWYG Editor</div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold">
            <Cloud className="w-3.5 h-3.5" />
            {savingTitle || savingTheme || savingCover ? 'Menyimpan...' : 'Tersimpan otomatis'}
          </span>
          <button
            onClick={() => router.push(`/dashboard/stories/${id}/preview`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs bg-white border border-slate-200 hover:border-[#264653]/50 text-slate-600 transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pratinjau</span>
          </button>
          <button
            onClick={handleGenerateLink}
            disabled={publishing}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs bg-[#264653] hover:bg-[#D97757] text-white shadow-md shadow-[#264653]/25 transition cursor-pointer disabled:opacity-60"
          >
            {publishing ? <Spinner size={14} /> : <Link2 className="w-3.5 h-3.5" />}
            <span>
              {publishing
                ? 'Memublikasikan...'
                : story.status === 'published'
                ? copied
                  ? 'Tersalin!'
                  : 'Salin Tautan Publik'
                : 'Buat Tautan Publik'}
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {publishError && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
            {publishError}
          </div>
        )}

        {/* Tabs */}
        <div className="inline-flex bg-white rounded-xl border border-slate-200 p-1 mb-6">
          <button
            onClick={() => setTab('cover')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              tab === 'cover' ? 'bg-[#264653] text-white' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sampul
          </button>
          <button
            onClick={() => setTab('gallery')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              tab === 'gallery' ? 'bg-[#264653] text-white' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Galeri{story.media.length > 0 ? ` (${story.media.length})` : ''}
          </button>
        </div>

        {tab === 'cover' ? (
          <div className="space-y-6">
            {/* Title (real, persisted field) */}
            <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                Nama Cerita
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleSaveTitle}
                  className="w-full px-4 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#264653] focus:border-transparent transition"
                />
                {savingTitle && (
                  <Loader2 className="w-4 h-4 text-[#264653] animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
                )}
              </div>
            </div>

            {/* Live editing status + device toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                MODE EDIT LANGSUNG: {activeThemeLabel} Theme
              </span>
              <div className="inline-flex bg-white rounded-xl border border-slate-200 p-1">
                <button
                  onClick={() => setDevice('mobile')}
                  className={`p-2 rounded-lg transition cursor-pointer ${
                    device === 'mobile' ? 'bg-[#264653] text-white' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDevice('desktop')}
                  className={`p-2 rounded-lg transition cursor-pointer ${
                    device === 'desktop' ? 'bg-[#264653] text-white' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Live cover canvas */}
            <div className="flex justify-center py-4">
              <div
                className={`relative overflow-hidden rounded-3xl shadow-2xl border border-black/10 transition-all duration-300 ${
                  device === 'desktop' ? 'w-full max-w-2xl aspect-[16/10]' : 'w-[300px] aspect-[9/16]'
                }`}
              >
                {coverPhoto ? (
                  <img src={coverPhoto.url} alt="Sampul" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${coverGradient}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <button
                  onClick={() => setTab('gallery')}
                  className="absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold transition cursor-pointer"
                >
                  <ImageIcon className="w-3 h-3" />
                  Ganti Foto Sampul
                </button>

                <div className="absolute left-0 right-0 bottom-0 z-10 p-5 sm:p-8 text-left">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleSaveTitle}
                    placeholder="Judul Ceritamu"
                    className="w-full bg-transparent text-white text-xl sm:text-3xl font-extrabold tracking-tight placeholder-white/40 focus:outline-none focus:bg-white/10 rounded-lg -mx-2 px-2 py-1 transition"
                  />
                  <div className="flex items-center gap-1 mt-1">
                    <input
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Nama pasangan atau catatan singkat"
                      className="min-w-0 flex-1 bg-transparent text-white/90 text-xs sm:text-sm font-medium placeholder-white/50 focus:outline-none focus:bg-white/10 rounded-lg -mx-2 px-2 py-1 transition"
                    />
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="shrink-0 bg-transparent text-white/90 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white/10 rounded-lg px-2 py-1 [color-scheme:dark] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cover photo picker */}
            {photoMedia.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 justify-center">
                <button
                  onClick={() => setCoverMediaId('')}
                  title="Gunakan gradien tema"
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${coverGradient} border-2 transition cursor-pointer ${
                    !coverMediaId ? 'border-[#264653]' : 'border-transparent'
                  }`}
                />
                {photoMedia.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setCoverMediaId(m.id)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                      coverMediaId === m.id ? 'border-[#264653]' : 'border-transparent'
                    }`}
                  >
                    <img src={m.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Ambient music + theme preset controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="relative inline-flex items-center gap-2 pl-4 pr-8 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm">
                <Music className="w-4 h-4 text-[#264653] shrink-0" />
                <select
                  value={musicKey}
                  onChange={(e) => setMusicKey(e.target.value)}
                  className="appearance-none bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer pr-2"
                >
                  {MUSIC_OPTIONS.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      Ambient: {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative inline-flex items-center gap-2 pl-4 pr-8 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm">
                <Palette className="w-4 h-4 text-[#264653] shrink-0" />
                <select
                  value={story.theme}
                  onChange={(e) => handleSelectTheme(e.target.value)}
                  disabled={savingTheme}
                  className="appearance-none bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer pr-2 disabled:opacity-60"
                >
                  {THEMES.map((t) => (
                    <option key={t.id} value={t.id}>
                      Preset: {t.label}
                    </option>
                  ))}
                </select>
                {savingTheme ? (
                  <Loader2 className="w-3.5 h-3.5 text-[#264653] animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                )}
              </div>
            </div>

            <p className="text-center text-[11px] text-slate-400 max-w-lg mx-auto">
              Semua perubahan pada sampul tersimpan otomatis ke server.
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Unggah Foto & Video</h2>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                value={uploadCaption}
                onChange={(e) => setUploadCaption(e.target.value)}
                placeholder="Tulis caption untuk momen ini (opsional)"
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#264653] focus:border-transparent transition"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelected}
                className="hidden"
                id="media-upload-input"
              />
              <label
                htmlFor="media-upload-input"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-[#264653] hover:bg-[#D97757] text-white transition shadow-lg shadow-[#264653]/25 cursor-pointer shrink-0"
              >
                {uploading ? <Spinner size={16} /> : <Upload className="w-4 h-4" />}
                <span>{uploading ? 'Mengunggah...' : 'Unggah'}</span>
              </label>
            </div>

            {story.media.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed border-slate-200 text-center">
                <ImagePlus className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Belum ada foto atau video. Mulai unggah momenmu.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {story.media.map((media) => (
                  <div key={media.id} className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                    <div className="aspect-video bg-black flex items-center justify-center overflow-hidden">
                      {media.type === 'video' ? (
                        <video src={media.url} controls className="w-full h-full object-cover" />
                      ) : (
                        <img src={media.url} alt={media.caption || 'Story media'} className="w-full h-full object-cover" />
                      )}
                    </div>

                    <div className="p-3.5 space-y-2">
                      {editingCaptionId === media.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={captionDraft}
                            onChange={(e) => setCaptionDraft(e.target.value)}
                            autoFocus
                            className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#264653]"
                          />
                          <button
                            onClick={() => handleSaveCaption(media.id)}
                            disabled={savingCaption}
                            className="text-[#264653] hover:text-[#D97757] transition cursor-pointer shrink-0"
                          >
                            {savingCaption ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-slate-600 truncate">
                            {media.caption || <span className="text-slate-400 italic">Tanpa caption</span>}
                          </p>
                          <div className="flex items-center gap-2 shrink-0">
                            {media.type === 'photo' && (
                              <button
                                onClick={() => {
                                  setCoverMediaId(media.id);
                                  setTab('cover');
                                }}
                                title="Jadikan sampul"
                                className="text-slate-400 hover:text-[#264653] transition cursor-pointer"
                              >
                                <ImageIcon className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => startEditCaption(media)}
                              className="text-slate-400 hover:text-[#264653] transition cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteMedia(media.id)}
                              disabled={deletingId === media.id}
                              className="text-slate-400 hover:text-rose-600 transition cursor-pointer"
                            >
                              {deletingId === media.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
