export function Footer() {
  return (
    <footer
      className="mx-auto mt-32 w-full max-w-6xl px-4 sm:px-8"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="items-centers grid grid-cols-1 justify-between gap-4 border-t border-gray-100 py-6 md:grid-cols-2">
        <p className="text-sm/6 text-slate-600 max-md:text-center">
          © 2024 ikkimi Labs Inc. All rights reserved.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm/6 font-semibold text-slate-900 md:justify-end">
          <a href="/privacy-policy">Privacy policy</a>
          <div className="h-4 w-px bg-slate-200"></div>
          <a href="/changelog">Changelog</a>
        </div>
      </div>
    </footer>
  );
}
