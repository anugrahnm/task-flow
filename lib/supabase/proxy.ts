import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'



function getEnvironmentVariables(): { supabaseUrl: string; supabaseDefaultKey: string } {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseDefaultKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

    if (!supabaseUrl || !supabaseDefaultKey) {
        throw new Error(
            "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!"
        );
    }

    return { supabaseUrl, supabaseDefaultKey };
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })
  const { supabaseUrl, supabaseDefaultKey } = getEnvironmentVariables();
  const supabase = createServerClient(
    supabaseUrl, supabaseDefaultKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data } = await supabase.auth.getClaims()

  const user = data?.claims

  if (!user && request.nextUrl.pathname.startsWith('/tasks') && request.nextUrl.pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }


  return supabaseResponse
}