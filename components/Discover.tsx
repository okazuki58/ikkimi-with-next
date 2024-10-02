import {
  CalendarDaysIcon,
  FireIcon,
  SparklesIcon,
  TrophyIcon,
  TvIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const tabs = [
  { name: "急上昇", icon: FireIcon },
  { name: "ランキング", icon: TrophyIcon },
  { name: "おすすめのユーザー", icon: UserCircleIcon },
  { name: "あなたにおすすめ", icon: SparklesIcon },
  { name: "新着", icon: CalendarDaysIcon },
  { name: "2024年秋アニメ化作品", icon: TvIcon },
  { name: "受賞作品" },
];

export default function Discover() {
  return (
    <div className="pb-10 pt-5">
      {/* <h1 className="text-2xl font-bold mb-4">Discover</h1> */}
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab, i) => (
          <span className="flex items-center gap-2 rounded-md px-3 py-2 text-center bg-[#f2f2fa] text-gray-700 font-medium text-sm md:hover:bg-[#e6e6fc] md:hover:text-indigo-600 cursor-pointer transition">
            {tab.icon && <tab.icon className="w-4 h-4" />}
            {tab.name}
          </span>
        ))}
      </div>
    </div>
  );
}
