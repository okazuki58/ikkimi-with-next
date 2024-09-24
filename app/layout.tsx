import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { BookmarkProvider } from "./context/BookmarkContext";
import { SearchProvider } from "./context/SearchContext";
import { Toaster } from "sonner";
import { UserProvider } from "./context/UserContext";

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
    <html lang="ja" className="bg-gray-50">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sf antialiased flex size-full min-h-screen flex-col bg-white dark:bg-[#10141E]`}
      >
        <UserProvider>
          <BookmarkProvider>
            <SearchProvider>{children}</SearchProvider>
          </BookmarkProvider>
        </UserProvider>
        {/* <ToastContainer /> */}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
