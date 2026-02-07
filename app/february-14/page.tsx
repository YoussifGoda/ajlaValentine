"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FebruaryFourteen() {
  const router = useRouter();
  const [showTease, setShowTease] = useState(false);

  const handleNo = () => {
    if (showTease) {
      return;
    }
    setShowTease(true);
  };

  const handleGetBack = () => {
    setShowTease(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-12">
      <div className="absolute left-10 top-16 h-32 w-32 rounded-full bg-rose-200/70 blur-2xl" />
      <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-pink-200/70 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-3xl flex-col items-center justify-center gap-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-rose-900 sm:text-5xl">
          {showTease
            ? "You!! 😋"
            : "Do you know what happens on February 14th?"}
        </h1>

        {!showTease ? (
          <div className="flex w-full max-w-sm flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              className="w-full rounded-full bg-rose-500 px-8 py-4 text-xl font-semibold text-white shadow-lg shadow-rose-200 transition-transform duration-200 hover:-translate-y-1"
              onClick={() => router.push("/valentine")}
            >
              Yes
            </button>
            <button
              className="w-full rounded-full border-2 border-rose-300 bg-white/80 px-8 py-4 text-xl font-semibold text-rose-700 shadow-sm transition-colors duration-200 hover:bg-rose-50"
              onClick={handleNo}
            >
              No
            </button>
          </div>
        ) : (
          <button
            className="rounded-full border-2 border-rose-200 bg-white/80 px-8 py-3 text-lg font-semibold text-rose-700 shadow-sm transition-colors duration-200 hover:bg-rose-50"
            onClick={handleGetBack}
          >
            Get back
          </button>
        )}
      </div>
    </div>
  );
}
