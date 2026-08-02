export type ThemeId = 'classic' | 'romantic' | 'minimal' | 'dark';

export const THEMES: { id: ThemeId; label: string; swatch: string }[] = [
  { id: 'classic', label: 'Classic', swatch: 'from-slate-200 to-slate-400' },
  { id: 'romantic', label: 'Romantic', swatch: 'from-[#F5C984] to-rose-400' },
  { id: 'minimal', label: 'Minimal', swatch: 'from-white to-slate-300' },
  { id: 'dark', label: 'Dark', swatch: 'from-slate-700 to-[#0F1219]' },
];

type ThemeStyle = {
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  heading: string;
  body: string;
  caption: string;
};

export const THEME_STYLES: Record<ThemeId, ThemeStyle> = {
  classic: {
    pageBg: 'bg-gradient-to-b from-slate-100 to-slate-200',
    cardBg: 'bg-white',
    cardBorder: 'border-slate-200',
    heading: 'text-slate-900',
    body: 'text-slate-600',
    caption: 'text-slate-500',
  },
  romantic: {
    pageBg: 'bg-gradient-to-b from-rose-50 via-amber-50 to-rose-100',
    cardBg: 'bg-white/80',
    cardBorder: 'border-rose-200',
    heading: 'text-rose-950',
    body: 'text-rose-900/70',
    caption: 'text-rose-900/60',
  },
  minimal: {
    pageBg: 'bg-white',
    cardBg: 'bg-white',
    cardBorder: 'border-slate-100',
    heading: 'text-slate-900',
    body: 'text-slate-500',
    caption: 'text-slate-400',
  },
  dark: {
    pageBg: 'bg-[#0F1219]',
    cardBg: 'bg-[#161922]',
    cardBorder: 'border-[#2A2E3D]',
    heading: 'text-white',
    body: 'text-slate-400',
    caption: 'text-slate-400',
  },
};

export const DEFAULT_THEME: ThemeId = 'classic';

export function resolveThemeStyle(theme: string): ThemeStyle {
  return THEME_STYLES[theme as ThemeId] || THEME_STYLES[DEFAULT_THEME];
}
