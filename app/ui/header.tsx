export default function Header() {
  return (
    <nav className="border-b border-solid border-b-[#f2f2f2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center md:items-stretch md:justify-start">
            <a href="#" className="flex flex-shrink-0 items-center">
              <span className="text-gray-900 text-2xl font-bold ml-2">
                Ikkimi
              </span>
            </a>
          </div>

          <div className="md:ml-6">
            {/* Search Box */}
            <div className="flex items-center gap-4">
              <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden">
                  <div
                    className="text-gray-500 flex border-none bg-gray-100 items-center justify-center pl-4 border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    placeholder="Search"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#181411] focus:outline-0 focus:ring-0 border-none bg-gray-100 focus:border-none h-full placeholder:text-gray-500 px-4 border-l-0 pl-2 text-base font-normal leading-normal"
                  />
                </div>
              </label>

              <button className="flex items-center text-white bg-gray-900 hover:bg-gray-700 hover:text-white rounded-lg px-3 py-2">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
