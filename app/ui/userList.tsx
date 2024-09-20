import Avatar from "boring-avatars";
import Image from "next/image";

const people = [
  {
    name: "さくら@春待ち子",
    email: "harumachiko2023@example.com",
    id: "@sakura_haru",
    saved: 23,
    image: [
      "/new-covers/cover-1.webp",
      "/new-covers/cover-2.webp",
      "/new-covers/cover-3.webp",
      "/new-covers/cover-4.webp",
    ],
  },
  {
    name: "ラーメン巡礼者",
    email: "ramen.pilgrim@example.com",
    id: "@noodle_traveler22222222fafena;oeifa;oifnaifeaferf",
    saved: 56,
    image: [
      "/new-covers/cover-1.webp",
      "/new-covers/cover-2.webp",
      "/new-covers/cover-3.webp",
      "/new-covers/cover-4.webp",
    ],
  },
  {
    name: "月見うさぎ🐰",
    email: "tsukimi.usagi@example.com",
    id: "@moon_rabbit",
    saved: 17,
    image: [
      "/new-covers/cover-1.webp",
      "/new-covers/cover-2.webp",
      "/new-covers/cover-3.webp",
      "/new-covers/cover-4.webp",
    ],
  },
  {
    name: "鯖の味噌煮",
    email: "saba.misoni@example.com",
    id: "@misoni_lover",
    saved: 42,
    image: [
      "/new-covers/cover-1.webp",
      "/new-covers/cover-2.webp",
      "/new-covers/cover-3.webp",
      "/new-covers/cover-4.webp",
    ],
  },
  // {
  //   name: "へんしんパンダ",
  //   email: "panda.transform@example.com",
  //   id: "@shape_shifter",
  //   saved: 31,
  // },
  // {
  //   name: "ゲーム廃人予備軍",
  //   email: "game.addict2b@example.com",
  //   id: "@game_junkie",
  //   saved: 89,
  // },
  // {
  //   name: "こたつむり💤",
  //   email: "kotatsu.life@example.com",
  //   id: "@warm_n_cozy",
  //   saved: 12,
  // },
  // {
  //   name: "麦茶ごくごく",
  //   email: "mugicha.gulp@example.com",
  //   id: "@tea_gulper",
  //   saved: 37,
  // },
  // {
  //   name: "虹色パレット🎨",
  //   email: "niji.palette@example.com",
  //   id: "@rainbow_art",
  //   saved: 64,
  // },
  // {
  //   name: "おにぎり王子",
  //   email: "onigiri.prince@example.com",
  //   id: "@rice_ball_royal",
  //   saved: 28,
  // },
];

export default function UserList() {
  return (
    <div className="py-10">
      <div className="flex items-end justify-between pb-4">
        <div className="flex flex-col">
          <span className="text-indigo-600 pl-1 text-sm font-semibold font-inter mb-2 leading-6 dark:text-[#FC4747]">
            Monthly Ranking
          </span>
          <h1 className="inline-block tracking-light text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200">
            おすすめのユーザー
          </h1>
        </div>
        <a href="#" className="text-sm leading-10 dark:text-white">
          すべて見る
        </a>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        {people.map((person) => (
          <div className="flex flex-col" key={person.email}>
            <a
              href="#"
              className="relative flex items-center justify-between space-x-3 rounded-lg bg-transparent pb-5 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="flex-shrink-0 hover:brightness-90 transition">
                  <Avatar
                    name={person.id}
                    colors={[
                      "#0a0310",
                      "#49007e",
                      "#ff005b",
                      "#ff7d10",
                      "#ffb238",
                    ]}
                    variant="beam"
                    size={40}
                  />
                </div>
                <div className="min-w-0">
                  <div className="focus:outline-none">
                    {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                    <span className="text-sm font-semibold text-gray-900 dark:text-white md:hover:underline">
                      {person.name}
                    </span>
                    <div className="flex items-center">
                      <p className="truncate text-sm text-gray-500">
                        {person.id}
                      </p>
                      <div className="px-2 flex-shrink-0">
                        {/* マッチ度を表示 */}
                        <p className="text-xs text-green-600">マッチ度: 98%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* フォローボタンを追加 */}
              <div className="flex flex-shrink-0">
                <button className="px-4 py-2 text-sm bg-slate-900 sm:hover:bg-slate-800 transition font-bold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  フォロー
                </button>
              </div>
            </a>

            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="rounded-md overflow-hidden relative group"
                  key={index}
                >
                  <Image
                    src={person.image[index]}
                    alt={person.id}
                    width={549}
                    height={780}
                    style={{ objectFit: "cover" }}
                    className="transition-transform transform md:group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
