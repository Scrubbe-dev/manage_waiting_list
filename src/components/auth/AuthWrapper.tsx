/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

interface AuthRouteProps {
  children: React.ReactNode
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/pages/dashboard')
    }
  }, [isAuthenticated, router])

  return !isAuthenticated ? <>{children}</> : null
}