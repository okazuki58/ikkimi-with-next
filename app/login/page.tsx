import { GoogleButton } from "@/components/googleButton";
import LoginForm from "../ui/client/LoginForm";
import { GithubButton } from "@/components/githubButton";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4 sm:w-[448px] w-full bg-gray-100 rounded-md border p-6">
      <h2 className="text-2xl font-bold mb-4">ログイン</h2>
      <div className="w-full flex flex-col gap-4">
        <GoogleButton />
        <GithubButton />
      </div>
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm font-medium leading-6">
          <span className="bg-gray-100 px-6 text-gray-900">or</span>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
