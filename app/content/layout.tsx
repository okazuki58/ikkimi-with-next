import Header from "@/app/ui/header";
import { ReactNode } from "react";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col flex-1 justify-center items-center py-5">
        {children}
      </main>
    </>
  );
}
