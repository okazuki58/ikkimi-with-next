import { createClient } from "@/utils/supabase/server";
import ClientHeader from "./client/HeaderClient";

export default async function Header() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return <ClientHeader user={data.user} />;
}
