'use client';

export function SocialAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {/* Google Button */}
      <button
        type="button"
        onClick={() => alert('Google authentication service')}
        className="flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition duration-150 shadow-sm cursor-pointer"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Google</span>
      </button>

      {/* Apple Button */}
      <button
        type="button"
        onClick={() => alert('Apple authentication service')}
        className="flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition duration-150 shadow-sm cursor-pointer"
      >
        <svg className="w-4 h-4 text-slate-900 fill-current shrink-0" viewBox="0 0 170 170">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.94.13-9.8-1.92-14.58-6.14-3.21-2.77-7.07-7.44-11.58-14.03-6.53-9.49-11.66-19.86-15.39-31.1-3.73-11.25-5.6-22.12-5.6-32.61 0-15.06 3.86-27.42 11.58-37.07 7.72-9.66 17.51-14.57 29.37-14.74 4.58 0 9.77 1.15 15.57 3.45 5.8 2.3 9.94 3.45 12.43 3.45 2.1 0 6.17-1.15 12.22-3.45 6.04-2.3 11.13-3.37 15.26-3.2 11.27.47 20.61 4.58 28.02 12.33-10.02 6.04-14.93 14.54-14.73 25.5.2 8.5 3.48 15.77 9.84 21.8 6.36 6.04 14.07 9.38 23.12 10.02-.91 4.88-2.22 9.72-3.92 14.52zM119.22 31.02c0-7.3 2.65-14.28 7.94-20.93 5.29-6.65 11.96-10.49 20.02-11.51.13.9.2 1.74.2 2.52 0 7.37-2.74 14.47-8.22 21.29-5.48 6.82-12.19 10.63-20.12 11.43-.07-.79-.11-1.72-.11-2.8z" />
        </svg>
        <span>Apple</span>
      </button>
    </div>
  );
}
