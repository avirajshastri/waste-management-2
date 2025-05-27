import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname
   console.log("idhar",path)

   const isPublicPath = path ==='/login' || path ==='/register' || path === '/'

   const token = request.cookies.get('token')?.value || ''

   console.log(isPublicPath, token)

  //  if(isPublicPath && token){
  //   return NextResponse.redirect(new URL('/',request.nextUrl))
  //  }
  const isProtectedPath = path.startsWith('/user') || path.startsWith('/collector')
   if(isProtectedPath && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
   }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/user/:path*', '/collector/:path*', '/login', '/register', '/'
  ],
}