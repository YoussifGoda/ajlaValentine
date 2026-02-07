"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Photo = {
  id: string;
  src: string;
  shape: string;
};

export default function ThinkingPage() {
  const router = useRouter();
  const photos = useMemo<Photo[]>(
    () => [
      {
        id: "img-0319",
        src: "/assets/IMG_0319.jpg",
        shape: "rounded-[36%_64%_58%_42%/48%_46%_54%_52%]",
      },
      {
        id: "img-1778",
        src: "/assets/IMG_1778.jpg",
        shape: "rounded-[60%_40%_46%_54%/54%_42%_58%_46%]",
      },
      {
        id: "img-3673",
        src: "/assets/IMG_3673.jpg",
        shape: "rounded-[44%_56%_52%_48%/40%_60%_40%_60%]",
      },
      {
        id: "img-3803",
        src: "/assets/IMG_3803.jpg",
        shape: "rounded-[52%_48%_64%_36%/58%_42%_58%_42%]",
      },
      {
        id: "img-4043",
        src: "/assets/IMG_4043.jpg",
        shape: "rounded-[40%_60%_44%_56%/52%_48%_52%_48%]",
      },
      {
        id: "img-5020",
        src: "/assets/IMG_5020.jpg",
        shape: "rounded-[50%_50%_40%_60%/46%_54%_46%_54%]",
      },
    ],
    [],
  );
  const [visibleCount, setVisibleCount] = useState(0);
  const isComplete = visibleCount >= photos.length;

  useEffect(() => {
    const timeouts: number[] = [];

    photos.forEach((_, index) => {
      const timeout = window.setTimeout(
        () => {
          setVisibleCount((current) => Math.max(current, index + 1));
        },
        700 + index * 450,
      );
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [photos]);

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10">
      <div className="absolute left-8 top-14 h-28 w-28 rounded-full bg-rose-200/70 blur-2xl" />
      <div className="absolute right-10 top-24 h-36 w-36 rounded-full bg-pink-200/70 blur-3xl" />
      <div className="absolute bottom-12 left-10 h-44 w-44 rounded-full bg-rose-100/80 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl flex-col items-center justify-center gap-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-rose-900 sm:text-5xl">
          Thinking about us...
        </h1>

        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`relative aspect-[4/5] w-full overflow-hidden bg-white/70 shadow-lg shadow-rose-100 transition-all duration-500 ${
                photo.shape
              } ${index < visibleCount ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
            >
              <img
                src={photo.src}
                alt="Memory"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {isComplete && (
          <button
            className="rounded-full bg-rose-500 px-10 py-4 text-xl font-semibold text-white shadow-lg shadow-rose-200 transition-transform duration-200 hover:-translate-y-1"
            onClick={() => router.push("/february-14")}
          >
            Cute!!
          </button>
        )}
      </div>
    </div>
  );
}
