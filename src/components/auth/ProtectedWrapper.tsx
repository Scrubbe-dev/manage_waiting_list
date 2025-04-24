'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface ProtectedWrapperProps {
  children: React.ReactNode;
}

const ProtectedWrapper = ({ children }: ProtectedWrapperProps) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state: { isAuthenticated: any; }) => state.isAuthenticated);
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  // Show nothing while checking authentication
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedWrapper;