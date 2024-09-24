import Header from "@/app/ui/header";
import { Footer } from "../ui/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main
        className="container mx-auto flex flex-col justify-center items-center px-4 sm:px-8 py-5 max-w-5xl"
        style={{ marginTop: "100px" }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
