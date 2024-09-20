export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-between py-6 bg-white">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center flex-grow text-center">
        <div className="w-full max-w-2xl mb-8">
          <div className="relative">
            <input
              type="search"
              placeholder="Search for manga..."
              className="w-full h-14 pl-4 pr-12 text-lg rounded-full border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white h-10 px-4"
            >
              Search
            </button>
          </div>
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
          style={{ lineHeight: "1.4" }}
        >
          次に読む漫画が、ここで見つかる。
        </h1>
        <p
          className="text-xl text-gray-700 max-w-2xl"
          style={{ lineHeight: "1.6" }}
        >
          一気見した漫画を簡単に登録、共有。面白い作品を仲間と発見しよう！
        </p>
      </div>
      {/* <footer className="w-full text-center py-4">
        <p className="text-sm text-gray-500">
          © 2024 ikkimi - All Rights Reserved
        </p>
      </footer> */}
    </div>
  );
}
