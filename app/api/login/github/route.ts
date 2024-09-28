import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("OAuth sign-in error:", error);
    return new NextResponse(`Error: ${error.message}`, {
      status: 500,
    });
  }

  if (data.url) {
    return NextResponse.redirect(data.url);
  }

  return new NextResponse("Error: Unable to initiate Github OAuth", {
    status: 500,
  });
}
