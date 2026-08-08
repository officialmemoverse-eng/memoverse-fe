'use client';

import { useState, useRef } from 'react';
import Script from 'next/script';

type GoogleSignInButtonProps = {
  onCredential: (idToken: string) => void;
  text?: 'signin_with' | 'signup_with';
};

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export function GoogleSignInButton({ onCredential, text = 'signin_with' }: GoogleSignInButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const renderButton = () => {
    const google = (window as any).google;
    if (!GOOGLE_CLIENT_ID || !google?.accounts?.id || !containerRef.current) return;

    try {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: { credential: string }) => onCredential(response.credential),
      });

      google.accounts.id.renderButton(containerRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        text,
        width: containerRef.current.offsetWidth || 320,
      });
    } catch (err) {
      console.error('Failed to render Google sign-in button', err);
    } finally {
      setReady(true);
    }
  };

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-400">
        Login Google belum dikonfigurasi
      </div>
    );
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={renderButton} />
      <div className="relative w-full h-10">
        {!ready && (
          <div className="absolute inset-0 rounded-full border border-slate-200 bg-slate-100 animate-pulse" />
        )}
        <div
          ref={containerRef}
          className={`absolute inset-0 flex justify-center [&>div]:!w-full transition-opacity ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </>
  );
}
