'use client';

import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { Flex, TypographyContent, TypographyH1, TypographyH2 } from '@mysuf1020/mylib-ui';

export function LoginBanner() {
  return (
    <Flex
      direction="col"
      justifyContent="space-between"
      className="relative w-full h-full min-h-[480px] md:min-h-screen p-8 md:p-16 overflow-hidden bg-slate-900"
    >
      {/* Background Image with Warm Overlay */}
      <Image
        src="/images/family-login-banner.png"
        alt="Family gathering memories"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none" />

      {/* Top Logo / Brand Title */}
      <div className="relative z-10">
        <TypographyH2 className="text-white font-semibold text-sm tracking-wide drop-shadow-sm">
          More Than Memories
        </TypographyH2>
      </div>

      {/* Middle Headline & Paragraph */}
      <div className="relative z-10 my-auto py-8 max-w-lg">
        <TypographyH1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight drop-shadow-md">
          Every story deserves to be remembered.
        </TypographyH1>
        <TypographyContent className="mt-4 text-white/90 text-sm md:text-base leading-relaxed font-sans drop-shadow-sm">
          Join a community dedicated to preserving the essence of human connection through thoughtfully crafted digital legacies.
        </TypographyContent>
      </div>

      {/* Bottom Privacy Pill Badge */}
      <div className="relative z-10 pt-4">
        <Flex
          alignItems="center"
          gap="2"
          className="inline-flex px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium"
        >
          <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
          <TypographyContent className="text-white/90 text-xs font-medium">
            Your privacy is our cornerstone.
          </TypographyContent>
        </Flex>
      </div>
    </Flex>
  );
}
