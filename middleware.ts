// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {useAuthStore} from '@/store/authStore' 
export async function middleware(request: NextRequest) {
  const token = useAuthStore((state)=>state.token)
  const { pathname } = request.nextUrl
  const authRoutes = ['/pages/login']
  const protectedRoutes = ['/pages/dashboard']

  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/pages/login', request.url))
  }

  if (token && authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/pages/dashboard', request.url))
  }

  return NextResponse.next()
}