'use client';

import { Flex } from '@mysuf1020/mylib-ui';
import { LoginBanner } from './components/login-banner';
import { LoginForm } from './components/login-form';

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-white font-sans selection:bg-[#F07865] selection:text-white">
      <Flex className="min-h-screen w-full flex-col md:flex-row">
        <div className="w-full md:w-1/2 min-h-[480px] md:min-h-screen">
          <LoginBanner />
        </div>
        <div className="w-full md:w-1/2 min-h-screen">
          <LoginForm />
        </div>
      </Flex>
    </main>
  );
}
