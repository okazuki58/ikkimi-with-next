// components/SignInWithGoogle.tsx
import React from "react";
import { supabase } from "../lib/supabaseClient";

const SignInWithGoogle: React.FC = () => {
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) console.error("Login failed:", error.message);
    else console.log("Login successful", data);
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleSignIn}
    >
      Sign in with Google
    </button>
  );
};

export default SignInWithGoogle;
