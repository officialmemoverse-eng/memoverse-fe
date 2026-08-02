import { Heart } from 'lucide-react';
import { resolveThemeStyle } from '@/lib/themes';

export type StoryViewMedia = {
  id: string;
  type: 'photo' | 'video';
  url: string;
  caption: string;
};

type StoryViewProps = {
  title: string;
  theme: string;
  media: StoryViewMedia[];
};

export function StoryView({ title, theme, media }: StoryViewProps) {
  const style = resolveThemeStyle(theme);

  return (
    <div className={`min-h-screen ${style.pageBg}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="text-center mb-12">
          <Heart className="w-6 h-6 mx-auto mb-4 fill-[#D9944D] text-[#D9944D]" />
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${style.heading}`}>
            {title}
          </h1>
        </div>

        {media.length === 0 ? (
          <p className={`text-center text-sm ${style.body}`}>Belum ada momen di cerita ini.</p>
        ) : (
          <div className="space-y-8">
            {media.map((m) => (
              <div
                key={m.id}
                className={`rounded-2xl overflow-hidden border ${style.cardBorder} ${style.cardBg} shadow-xl`}
              >
                <div className="bg-black flex items-center justify-center overflow-hidden">
                  {m.type === 'video' ? (
                    <video src={m.url} controls className="w-full max-h-[70vh] object-contain" />
                  ) : (
                    <img src={m.url} alt={m.caption || 'Story media'} className="w-full max-h-[70vh] object-contain" />
                  )}
                </div>
                {m.caption && (
                  <p className={`px-5 py-4 text-sm leading-relaxed ${style.caption}`}>{m.caption}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
