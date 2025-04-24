/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state: { isAuthenticated: any; }) => state.isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/pages/login')
    }
  }, [isAuthenticated, router])

  return isAuthenticated ? <>{children}</> : null
}

