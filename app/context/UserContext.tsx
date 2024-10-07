"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  // サインアウト関数
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("サインアウトエラー:", error.message);
    } else {
      setUser(null); // サインアウト後にuserをnullにセット
      toast.success("ログアウトしました");
      window.location.reload();
    }
  };

  useEffect(() => {
    // 初期ユーザー取得
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      const { data } = await supabase.auth.getSession();
      console.log(data);

      const { data: profiles, error } = await supabase.from("profiles").select("*");

      if (error) {
        console.error("データ取得エラー:", error);
      } else {
        console.log("ユーザープロフィール:", profiles);
      }
    };
    fetchUser();

    // 認証状態の変更をリッスン
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
          setUser(session?.user ?? null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

// カスタムフックでContextを簡単に利用
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
