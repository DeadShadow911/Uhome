"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

type Props = {
  beforeImage: string;
  afterImage: string;
  alt?: string;
  className?: string;
};

export function BeforeAfterSlider({ beforeImage, afterImage, alt = "До и после", className = "" }: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(percent);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleMouseDown = useCallback(() => {
    const onMove = (e: MouseEvent) => handleMove(e.clientX);
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [handleMove]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-primary ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition(50)}
      onTouchMove={handleTouchMove}
    >
      <div className="absolute inset-0">
        <Image
          src={beforeImage}
          alt={`${alt} — до`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
      </div>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={afterImage}
          alt={`${alt} — после`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize select-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border-2 border-white bg-primary shadow-lg">
          <svg
            className="size-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M8 9l4-4 4 4M16 15l-4 4-4-4" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 rounded-lg bg-primary/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
        До
      </div>
      <div className="absolute bottom-4 right-4 rounded-lg bg-primary/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
        После
      </div>
    </div>
  );
}
