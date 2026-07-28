'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // SaaS Public Dashboard is accessible to everyone
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0F1219] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#C88242] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

