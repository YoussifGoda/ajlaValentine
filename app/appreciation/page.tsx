"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function AppreciationPage() {
  const router = useRouter();
  const lines = useMemo(
    () => [
      "You mean a lot to me.",
      "You make my days better.",
      "You make me laugh without trying.",
      "You make things feel easy.",
    ],
    [],
  );
  const [visibleCount, setVisibleCount] = useState(0);
  const isComplete = visibleCount >= lines.length;

  useEffect(() => {
    const timeouts: number[] = [];

    lines.forEach((_, index) => {
      const timeout = window.setTimeout(
        () => {
          setVisibleCount((current) => Math.max(current, index + 1));
        },
        900 + index * 1200,
      );
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [lines]);

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-12">
      <div className="absolute left-8 top-16 h-28 w-28 rounded-full bg-rose-200/70 blur-2xl" />
      <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-pink-200/70 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-3xl flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-rose-900 sm:text-5xl">
          I just want you to know something first.
        </h1>

        <div
          className="flex flex-col items-center gap-3 text-2xl font-semibold text-rose-700 sm:text-3xl"
          aria-live="polite"
        >
          {lines.map((line, index) => (
            <p
              key={line}
              className={`transition-opacity duration-700 ${
                index < visibleCount ? "opacity-100" : "opacity-0"
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {isComplete && (
          <button
            className="mt-4 rounded-full bg-rose-500 px-8 py-4 text-xl font-semibold text-white shadow-lg shadow-rose-200 transition-transform duration-200 hover:-translate-y-1"
            onClick={() => router.push("/thinking")}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
