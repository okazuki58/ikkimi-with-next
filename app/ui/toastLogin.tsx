"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const loginStatus = searchParams.get("login");
    if (loginStatus === "success") {
      toast.success("ログインに成功しました！");

      // クエリパラメータをクリア
      const newUrl = window.location.pathname;
      router.replace(newUrl);
    }
  }, [searchParams, router]);

  return null;
}
