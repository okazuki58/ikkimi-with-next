import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { BookmarkProvider } from "./context/BookmarkContext";
import { SearchProvider } from "./context/SearchContext";
import { Toaster } from "sonner";
import { UserProvider, useUser } from "./context/UserContext";
import Header from "./ui/header";
import { Footer } from "./ui/footer";
import LoginToast from "./ui/toastLogin";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sf antialiased flex size-full min-h-screen flex-col dark:bg-[#10141E]`}
      >
        <UserProvider>
          <BookmarkProvider>
            <SearchProvider>
              <Header />
              <main
                className="container mx-auto flex flex-col justify-center items-center px-4 sm:px-8 py-5 max-w-5xl"
                style={{ marginTop: "100px" }}
              >
                {children}
              </main>
              <Footer />
            </SearchProvider>
          </BookmarkProvider>
        </UserProvider>
        <Toaster position="top-center" />
        <LoginToast />
      </body>
    </html>
  );
}
