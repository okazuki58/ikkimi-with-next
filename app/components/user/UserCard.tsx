import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const users = [
  {
    name: "みやはま",
    time: "16時間",
    manga: "進撃の巨人",
    image: "/metamon.jpg",
  },
  {
    name: "たくぞう",
    time: "10月1日",
    manga: "スキップとローファー",
    image: "/cat.png",
  },
  {
    name: "shiba",
    time: "30分",
    manga: "ナルト疾風伝",
    image: "/default.png",
  },
];

export default function UserCard() {
  return (
    <div className="py-10">
      {/* <h1 className="text-text-2xl sm:text-3xl font-bold mb-4">タイムライン</h1> */}
      <div className="flex flex-wrap gap-4">
        {/* item */}
        {[...Array(3)].map((_, i) => (
          <div className="flex items-center justify-between rounded-md bg-[#f2f2fa] p-3 gap-3 md:hover:bg-[#e6e6fc] cursor-pointer w-full md:w-auto md:max-w-[260px] transition">
            <div className="flex items-center gap-3">
              <div className="relative overflow-hidden rounded-full w-10 h-10 border">
                <Image
                  src={users[i].image}
                  alt={users[i].name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {users[i].name}
                  </p>
                  <p className="text-sm text-gray-600">{users[i].time}</p>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {users[i].manga}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center ml-2">
              <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
