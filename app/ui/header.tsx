import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Search from "./search";
import { Button } from "./button";
import IkkimiLogo from "./ikkimi-logo";

export default function Header() {
  return (
    <nav className="border-b border-solid border-b-[#f2f2f2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <IkkimiLogo />
          <Search placeholder="作品名、作家名、キーワードで探す" />
          <Button>Sign Up</Button>
        </div>
      </div>
    </nav>
  );
}
