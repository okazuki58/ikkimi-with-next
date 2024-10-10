import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      return NextResponse.json({ error: 'アカウント削除に失敗しました。' }, { status: 500 });
    }

    return NextResponse.json({ message: 'アカウントが削除されました。' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'アカウント削除中にエラーが発生しました。' }, { status: 500 });
  }
}
