
import { Suspense } from "react";
import IndividualCelebrationPage from "./content";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#F8F3ED]">
          <p className="font-serif text-xl text-[#3B071B]">
            Preparing your celebration...
          </p>
        </main>
      }
    >
      <IndividualCelebrationPage />
    </Suspense>
  );
}
