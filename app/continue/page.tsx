"use client";

import { useRouter } from "next/navigation";

export default function ContinuePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-12">
      <div className="absolute left-8 top-14 h-28 w-28 rounded-full bg-rose-200/70 blur-2xl" />
      <div className="absolute bottom-16 right-10 h-40 w-40 rounded-full bg-pink-200/70 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-3xl flex-col items-center justify-center gap-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-rose-900 sm:text-5xl">
          Okay... good 😮‍💨 Can I show you something?
        </h1>

        <button
          className="rounded-full bg-rose-500 px-8 py-4 text-xl font-semibold text-white shadow-lg shadow-rose-200 transition-transform duration-200 hover:-translate-y-1"
          onClick={() => router.push("/appreciation")}
        >
          What is it?
        </button>
      </div>
    </div>
  );
}
