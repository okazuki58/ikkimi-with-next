import Header from "@/app/ui/header";
import { ReactNode } from "react";
import Header2 from "../ui/header2";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header2 />
      <main className="container mx-auto flex flex-col flex-1 justify-center items-center py-5">
        {children}
      </main>
    </>
  );
}
