import { GlobeAltIcon } from "@heroicons/react/24/outline";
// import { lusitana } from "@/app/ui/fonts";

export default function IkkimiLogo() {
  return (
    <div className={`flex flex-row items-center leading-none text-white`}>
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[32px] text-gray-900">Ikkimi</p>
    </div>
  );
}
