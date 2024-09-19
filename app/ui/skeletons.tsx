export function MangaListSkeleton() {
  return (
    <div className="animate-pulse py-10">
      <div className="h-12 bg-gray-200 rounded w-3/4 md:w-3/5 my-2"></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 py-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col pb-5">
            <div className="flex flex-col gap-2 pb-2">
              <div
                className="rounded-md overflow-hidden bg-gray-200 relative"
                style={{ paddingTop: `${(780 / 549) * 100}%` }}
              >
                <div className="absolute inset-0"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            {/* <div className="flex items-center mt-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-12 ml-2"></div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MangaDialogSkeleton() {
  return (
    <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
      <div className="absolute right-4 top-4 w-6 h-6 bg-gray-200 rounded-full"></div>

      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <div className="aspect-[549/780] w-full bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full animate-pulse"></div>
          </div>
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <div className="h-9 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
          <div className="flex gap-2 my-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-16 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
          <div className="flex items-center mt-2 mb-4">
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-12 ml-2 animate-pulse"></div>
          </div>
          <div className="space-y-2 mb-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 rounded w-full animate-pulse"
              ></div>
            ))}
          </div>
          <div className="h-12 bg-gray-200 rounded w-full mt-6 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export function ImageSkeleton() {
  return (
    <div className="aspect-[549/780] w-full bg-gray-200 rounded-lg overflow-hidden">
      <div className="w-full h-full animate-pulse"></div>
    </div>
  );
}
