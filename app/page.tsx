"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [angry, setAngry] = useState(false);

  return (
    <div
      className={`relative min-h-screen overflow-hidden px-6 py-12 transition-colors duration-500 ${
        angry
          ? "bg-red-600"
          : "bg-[radial-gradient(circle_at_top,_#ffe4ef,_#fff7fb_60%)]"
      }`}
    >
      <div
        className={`mx-auto flex min-h-[calc(100vh-6rem)] max-w-3xl flex-col items-center justify-center gap-10 text-center ${
          angry ? "animate-[shake_0.35s_ease-in-out_3]" : ""
        }`}
      >
        <div className="absolute left-6 top-10 h-28 w-28 rounded-full bg-pink-200/60 blur-2xl" />
        <div className="absolute bottom-16 right-8 h-36 w-36 rounded-full bg-rose-200/70 blur-3xl" />

        <h1
          className={`text-4xl font-semibold tracking-tight sm:text-5xl ${
            angry ? "text-white" : "text-rose-900"
          }`}
        >
          {angry ? "GET OUT!! 😡" : "Are you Ajla?"}
        </h1>

        {!angry && (
          <div className="flex w-full max-w-sm flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              className="w-full rounded-full bg-rose-500 px-8 py-4 text-xl font-semibold text-white shadow-lg shadow-rose-200 transition-transform duration-200 hover:-translate-y-1"
              onClick={() => router.push("/continue")}
            >
              Yes
            </button>
            <button
              className="w-full rounded-full border-2 border-rose-300 bg-white/80 px-8 py-4 text-xl font-semibold text-rose-700 shadow-sm transition-colors duration-200 hover:bg-rose-50"
              onClick={() => setAngry(true)}
            >
              No
            </button>
          </div>
        )}

        {angry && (
          <button
            className="rounded-full border-2 border-white/60 bg-white/10 px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-white/20"
            onClick={() => setAngry(false)}
          >
            Get back
          </button>
        )}
      </div>
    </div>
  );
}
