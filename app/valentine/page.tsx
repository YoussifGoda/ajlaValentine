"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Position = {
  x: number;
  y: number;
};

type Heart = {
  id: number;
  left: number;
  delay: number;
  size: number;
};

type FloatingText = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
};

type HaloHeart = {
  id: number;
  x: string;
  y: string;
  size: number;
};

export default function ValentinePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [noPos, setNoPos] = useState<Position>({ x: 0, y: 0 });
  const [celebrating, setCelebrating] = useState(false);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const lastMoveRef = useRef(0);

  const hearts = useMemo<Heart[]>(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        left: Math.random() * 90 + 5,
        delay: Math.random() * 0.8,
        size: Math.random() * 16 + 18,
      })),
    [],
  );

  const loveNotes = useMemo<FloatingText[]>(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: Math.random() * 90 + 5,
        delay: 0.4 + Math.random() * 2.2,
        duration: 6 + Math.random() * 3,
        size: Math.random() * 10 + 16,
      })),
    [],
  );

  const haloHearts = useMemo<HaloHeart[]>(
    () => [
      { id: 1, x: "-18%", y: "-10%", size: 28 },
      { id: 2, x: "8%", y: "-20%", size: 22 },
      { id: 3, x: "62%", y: "-14%", size: 26 },
      { id: 4, x: "92%", y: "10%", size: 20 },
      { id: 5, x: "-14%", y: "35%", size: 24 },
      { id: 6, x: "100%", y: "42%", size: 24 },
      { id: 7, x: "8%", y: "88%", size: 22 },
      { id: 8, x: "70%", y: "92%", size: 28 },
    ],
    [],
  );

  useEffect(() => {
    const updateBounds = () => {
      setBounds({ width: window.innerWidth, height: window.innerHeight });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  useEffect(() => {
    if (!bounds.width || !bounds.height) {
      return;
    }
    const rect = noButtonRef.current?.getBoundingClientRect();
    const buttonWidth = rect?.width ?? 80;
    const buttonHeight = rect?.height ?? 36;

    setNoPos({
      x: bounds.width / 2 - buttonWidth / 2,
      y: Math.min(bounds.height * 0.62, bounds.height - buttonHeight - 24),
    });
  }, [bounds]);

  const moveNoButton = () => {
    if (celebrating || !noButtonRef.current) {
      return;
    }

    const padding = 20;
    const rect = noButtonRef.current.getBoundingClientRect();
    const maxX = Math.max(bounds.width - rect.width - padding, padding);
    const maxY = Math.max(bounds.height - rect.height - padding, padding);

    const nextX = Math.random() * (maxX - padding) + padding;
    const nextY = Math.random() * (maxY - padding) + padding;

    setNoPos({ x: nextX, y: nextY });
  };

  const handleProximity = (clientX: number, clientY: number) => {
    if (!noButtonRef.current || celebrating) {
      return;
    }

    const now = Date.now();
    if (now - lastMoveRef.current < 180) {
      return;
    }

    const rect = noButtonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(clientX - centerX, clientY - centerY);

    if (distance < 120) {
      lastMoveRef.current = now;
      moveNoButton();
    }
  };

  const handleYes = () => {
    setCelebrating(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#ffe1ec,_#fff3f7_55%,_#fffafc_100%)] px-6 py-10"
      onMouseMove={(event) => handleProximity(event.clientX, event.clientY)}
      onTouchMove={(event) => {
        const touch = event.touches[0];
        if (touch) {
          handleProximity(touch.clientX, touch.clientY);
        }
      }}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        if (touch) {
          handleProximity(touch.clientX, touch.clientY);
        }
      }}
    >
      <div className="absolute left-6 top-12 h-32 w-32 rounded-full bg-rose-200/70 blur-2xl" />
      <div className="absolute right-6 top-24 h-40 w-40 rounded-full bg-pink-200/70 blur-3xl" />
      <div className="absolute bottom-14 left-8 h-44 w-44 rounded-full bg-rose-100/80 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col items-center justify-center gap-10 text-center">
        {!celebrating && (
          <h1 className="text-3xl font-semibold tracking-tight text-rose-900 sm:text-5xl">
            Do you want to be my Valentine?
          </h1>
        )}

        {celebrating ? (
          <div className="relative flex items-center justify-center">
            <div className="animate-[pop_0.5s_ease-out] rounded-[36px] bg-white/90 px-10 py-8 text-4xl font-semibold text-rose-600 shadow-xl shadow-rose-200 sm:text-5xl">
              Volim te
            </div>
            {haloHearts.map((heart) => (
              <span
                key={heart.id}
                className="absolute"
                style={{
                  left: heart.x,
                  top: heart.y,
                  fontSize: `${heart.size}px`,
                }}
              >
                💗
              </span>
            ))}
          </div>
        ) : (
          <div className="flex w-full max-w-lg flex-col items-center gap-6">
            <button
              className="rounded-full bg-rose-500 px-12 py-6 text-2xl font-semibold text-white shadow-xl shadow-rose-200 transition-transform duration-200 hover:-translate-y-1 sm:px-16 sm:text-3xl animate-[pulse-soft_2.5s_ease-in-out_infinite]"
              onClick={handleYes}
            >
              YES
            </button>

            <button
              ref={noButtonRef}
              className="fixed rounded-full bg-zinc-200 px-5 py-2 text-base font-semibold text-zinc-700 shadow-md transition-transform duration-150"
              style={{ left: noPos.x, top: noPos.y }}
              onMouseEnter={moveNoButton}
              onFocus={moveNoButton}
              onClick={moveNoButton}
            >
              No
            </button>
          </div>
        )}
      </div>

      {celebrating && (
        <div className="pointer-events-none absolute inset-0">
          {loveNotes.map((note) => (
            <span
              key={note.id}
              className="absolute text-rose-500/90 font-semibold tracking-wide"
              style={{
                left: `${note.left}%`,
                top: "-10%",
                fontSize: `${note.size}px`,
                animation: `float-down ${note.duration}s linear ${note.delay}s infinite, sway 3.5s ease-in-out ${note.delay}s infinite`,
              }}
            >
              I LOVE YOU
            </span>
          ))}
          {hearts.map((heart) => (
            <span
              key={heart.id}
              className="absolute opacity-80"
              style={{
                left: `${heart.left}%`,
                top: "-8%",
                animation: `float-down 6.5s linear ${heart.delay}s infinite`,
                fontSize: `${heart.size}px`,
              }}
            >
              💗
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
