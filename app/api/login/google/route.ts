import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://ikki-mi.com",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (data?.url) {
    return NextResponse.redirect(data.url); // Google認証ページにリダイレクト
  }

  return new NextResponse("Error: Unable to initiate Google OAuth", {
    status: 500,
  });
}
