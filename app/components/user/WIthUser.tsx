import Image from "next/image";

export default function WithUser() {
  return (
    <div className="py-16">
      <h1 className="text-2xl font-bold mb-4">With User</h1>
      <div className="grid grid-cols-7 gap-4">
        <div className="flex flex-col gap-2">
          <div className="aspect-[549/780] relative rounded-md overflow-hidden">
            <Image
              src="/new-covers/cover-1.webp"
              alt="cover-1"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-gray-800 truncate">
            親愛なる僕へ殺意をこめて
          </p>
          <div className="flex gap-2 items-center">
            <div className="relative overflow-hidden rounded-full w-8 h-8 border">
              <Image
                src="/metamon.jpg"
                alt="metamon"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-gray-600">ダミー名前</p>
              {/* <p className="text-xs text-gray-400">13 Saved</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
