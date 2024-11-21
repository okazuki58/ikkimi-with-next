import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // メンテナンスモードのチェック
  const isMaintenanceMode = true; // メンテナンスモードを有効にする場合は true に設定

  if (isMaintenanceMode && request.nextUrl.pathname !== "/maintenance") {
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance"; // メンテナンスページのパス
    return NextResponse.redirect(url);
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ユーザーがログインせずに、/login か /signup 以外にアクセスしようとしている場合
  // if (
  //   !user &&
  //   !request.nextUrl.pathname.startsWith("/login") &&
  //   !request.nextUrl.pathname.startsWith("/auth") &&
  //   !request.nextUrl.pathname.startsWith("/")
  // ) {
  //   // ログインページにリダイレクト
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }

  // ログインせずにアカウント設定にアクセスする場合、ログインページにリダイレクト
  if (!user && request.nextUrl.pathname.startsWith("/[username]/settings")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
