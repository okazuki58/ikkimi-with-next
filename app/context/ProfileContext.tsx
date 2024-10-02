"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "./UserContext"; // 既存のUserContextを利用
import { toast } from "sonner";
import { Profile } from "../lib/definitions";

interface ProfileContextType {
  profile: Profile | null;
  isProfileLoading: boolean;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

// コンテキストの作成
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const { user } = useUser(); // UserContextからuser情報を取得
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    // プロフィールデータの取得
    const fetchProfile = async () => {
      if (!user?.id) return;

      setIsProfileLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        toast.error("プロフィールの取得に失敗しました");
      } else {
        setProfile(data);
      }

      setIsProfileLoading(false);
    };

    fetchProfile();
  }, [user]);

  return (
    <ProfileContext.Provider value={{ profile, isProfileLoading, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// カスタムフックで簡単にContextを利用
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
