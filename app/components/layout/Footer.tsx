import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="mx-auto mt-[320px] w-full max-w-6xl px-4 sm:px-8"
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
          <nav className="flex flex-col gap-4">
            <h4 className="font-semibold text-gray-900">About</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-700 md:hover:underline cursor-pointer"
                >
                  Ikkimiについて
                </Link>
              </li>
              {/* <li>
                <a className="text-sm text-gray-700 md:hover:underline cursor-pointer">
                  運営者情報
                </a>
              </li> */}
              <li>
                <Link
                  href="/about/info"
                  className="text-sm text-gray-700 md:hover:underline cursor-pointer"
                >
                  お知らせ
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="flex flex-col gap-4">
            <h4 className="font-semibold text-gray-900">Guides</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/guides/howtouse"
                  className="text-sm text-gray-700 md:hover:underline cursor-pointer"
                >
                  使い方
                </Link>
              </li>
              {/* <li>
                <a className="text-sm text-gray-700 md:hover:underline cursor-pointer">
                  よくある質問
                </a>
              </li> */}
            </ul>
          </nav>

          <nav className="flex flex-col gap-4">
            <h4 className=" font-semibold text-gray-900">Links</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a className="text-sm text-gray-700 md:hover:underline cursor-pointer">
                  X(旧Twitter)
                </a>
              </li>
            </ul>
          </nav>

          <nav className="flex flex-col gap-4">
            <h4 className=" font-semibold text-gray-900">Legal</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/legal/terms"
                  className="text-sm text-gray-700 md:hover:underline cursor-pointer"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-sm text-gray-700 md:hover:underline cursor-pointer"
                >
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </nav>
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
