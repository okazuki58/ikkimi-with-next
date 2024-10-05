export function MangaListSkeleton() {
  return (
    <div className="animate-pulse">
      {/* <div className="h-10 w-1/5 mb-6 bg-gray-200 rounded-md"></div> */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-4">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="flex flex-col pb-1">
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

export function ProfileSkeleton() {
  return (
    <div className="mb-8">
      <div className="py-6 animate-pulse">
        <div className="flex flex-col sm:flex-row gap-8">
          <div>
            <div className="w-28 h-28 rounded-full bg-gray-300"></div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="md:text-left mb-4">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div>
              <div className="flex flex-wrap justify-start gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-10 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="animate-pulse flex flex-col items-center justify-between py-32 gap-8 w-full max-w-5xl">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center flex-grow text-center">
        <div className="w-full max-w-xl mb-8">
          <div className="relative">
            <div className="skeleton h-10 w-full mb-4 bg-gray-200"></div>
          </div>
        </div>
        <div className="skeleton h-10 w-3/4 mb-4 bg-gray-200"></div>
        <div className="skeleton h-6 w-1/2 bg-gray-200"></div>
      </div>
      <div className="max-w-xs">
        <div className="skeleton h-14 w-full bg-gray-200"></div>
      </div>
    </div>
  );
}

export default function UserListSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4 ">
      <div className="py-10">
        <div className="h-10 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        {[...Array(6)].map((_, index) => (
          <div className="flex flex-col" key={index}>
            <div className="relative flex items-center justify-between space-x-3 rounded-lg bg-transparent pb-5">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-shrink-0">
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1 md:gap-2">
              {[...Array(4)].map((_, idx) => (
                <div
                  className="rounded-md overflow-hidden aspect-[549/780] bg-gray-200 animate-pulse"
                  key={idx}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
