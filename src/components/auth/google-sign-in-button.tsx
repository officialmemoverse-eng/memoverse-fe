'use client';

import { useEffect, useRef, useState } from 'react';

type GoogleSignInButtonProps = {
  onCredential: (idToken: string) => void;
  text?: 'signin_with' | 'signup_with';
};

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const GSI_SRC = 'https://accounts.google.com/gsi/client';

// Loads the Google Identity Services script exactly once per page session and
// resolves for every caller, regardless of which route first triggered the load.
// (next/script's onLoad only fires for the mount that first requested it, so a
// button on a second page navigated to client-side would otherwise never resolve.)
let gsiLoadPromise: Promise<void> | null = null;

function loadGoogleIdentityServices(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if ((window as any).google?.accounts?.id) return Promise.resolve();

  if (!gsiLoadPromise) {
    gsiLoadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${GSI_SRC}"]`) as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('Failed to load Google Identity script')));
        return;
      }

      const script = document.createElement('script');
      script.src = GSI_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google Identity script'));
      document.head.appendChild(script);
    });
  }

  return gsiLoadPromise;
}

export function GoogleSignInButton({ onCredential, text = 'signin_with' }: GoogleSignInButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    let cancelled = false;

    loadGoogleIdentityServices()
      .then(() => {
        if (cancelled) return;
        const google = (window as any).google;
        if (!google?.accounts?.id || !containerRef.current) return;

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
        }
      })
      .catch((err) => {
        console.error('Failed to load Google Identity Services', err);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-400">
        Login Google belum dikonfigurasi
      </div>
    );
  }

  return (
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
  );
}
