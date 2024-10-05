import {
  CalendarDaysIcon,
  FireIcon,
  SparklesIcon,
  TrophyIcon,
  TvIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const tabs = [
  { name: "急上昇", icon: FireIcon, link: "/manga/rising" },
  { name: "ランキング", icon: TrophyIcon, link: "/manga/ranking" },
  {
    name: "おすすめのユーザー",
    icon: UserCircleIcon,
    link: "/manga/users",
  },
  { name: "あなたにおすすめ", icon: SparklesIcon, link: "/manga/recommend" },
  { name: "新着リリース", icon: CalendarDaysIcon, link: "/manga/new_release" },
  { name: "2024年秋アニメ化作品", icon: TvIcon, link: "/manga/media" },
  { name: "受賞作品", icon: SparklesIcon, link: "/manga/awards" },
];

export default function Discover() {
  return (
    <div className="pb-10 pt-5">
      {/* <h1 className="text-2xl font-bold mb-4">Discover</h1> */}
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab, i) => (
          <Link href={tab.link} key={i}>
            <span
              key={i}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-center bg-[#f2f2fa] text-gray-700 font-medium text-sm md:hover:bg-[#e6e6fc] md:hover:text-indigo-600 cursor-pointer transition"
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
