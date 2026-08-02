export const COVER_GRADIENTS: Record<string, string> = {
  classic: 'from-slate-600 via-slate-700 to-slate-900',
  romantic: 'from-rose-400 via-[#B3223A] to-[#4A0F1C]',
  minimal: 'from-stone-400 via-stone-500 to-stone-700',
  dark: 'from-slate-800 via-slate-900 to-black',
};

export function resolveCoverGradient(theme: string): string {
  return COVER_GRADIENTS[theme] || COVER_GRADIENTS.classic;
}

export function formatEventDate(dateStr: string): string {
  if (!dateStr) return '';
  const parsed = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
