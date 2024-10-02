export function Footer() {
  return (
    <footer
      className="mx-auto mt-24 w-full max-w-6xl px-4 sm:px-8"
      aria-labelledby="footer-heading"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-0">
        {/* Logo */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src="/frame-1.svg" alt="" className="size-6" />
            <div className="font-unbounded text-2xl font-semibold text-gray-900 tracking-wide">
              Ikkimi
            </div>
          </div>
          <p className="text-sm text-gray-500 md:w-2/3">
            次に読むべき作品を見つけるための推薦ネットワーク
          </p>
        </div>

        {/* bottom */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0 flex-1">
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-gray-900">About</p>
            <p className="text-sm text-gray-700 md:hover:text-gray-900 cursor-pointer">
              Ikkimiについて
            </p>
            <p className="text-sm text-gray-700 md:hover:text-gray-900 cursor-pointer">
              運営会社
            </p>
            <p className="text-sm text-gray-700 md:hover:text-gray-900 cursor-pointer">
              お知らせ
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className=" font-semibold text-gray-900">Guides</p>
            <p className="text-sm text-gray-700 md:hover:text-gray-900 cursor-pointer">
              使い方
            </p>
            <p className="text-sm text-gray-700 md:hover:text-gray-900 cursor-pointer">
              よくある質問
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className=" font-semibold text-gray-900">Links</p>
            <p className="text-sm text-gray-700 md:hover:text-gray-900 cursor-pointer">
              X(旧Twitter)
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className=" font-semibold text-gray-900">Legal</p>
            <p className="text-sm text-gray-700 md:hover:text-gray-900 cursor-pointer">
              利用規約
            </p>
            <p className="text-sm text-gray-700 md:hover:text-gray-900 cursor-pointer">
              プライバシーポリシー
            </p>
          </div>
        </div>
      </div>

      <div className="items-centers border-t border-gray-200 py-8 mt-20">
        <p className="text-sm text-slate-600">
          © 2024 ikkimi Labs Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
