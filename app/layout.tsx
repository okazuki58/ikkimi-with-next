import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BookmarkProvider } from "./context/BookmarkContext";
import { SearchProvider } from "./context/SearchContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "ikkimi",
  keyword: "manga, comic, share",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sf antialiased flex size-full min-h-screen flex-col bg-white dark:bg-[#10141E]`}
      >
        <BookmarkProvider>
          <SearchProvider>{children}</SearchProvider>
        </BookmarkProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
