'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

const HEADERLESS_ROUTE = /^\/dashboard\/stories\/[^/]+$/;

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showHeader = !HEADERLESS_ROUTE.test(pathname);

  return (
    <div className="flex min-h-screen bg-[#F6F1EB]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {showHeader && <Header />}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

