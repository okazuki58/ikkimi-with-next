import { Suspense } from "react";
import ClientSearchResults from "./ClientSearchResults";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full max-w-5xl mx-auto p-4">
        <ClientSearchResults />
      </div>
    </Suspense>
  );
}
