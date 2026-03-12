"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alt?: string;
};

export function ImageLightbox({
  images,
  currentIndex,
  onIndexChange,
  open,
  onOpenChange,
  alt = "Фото проекта",
}: Props) {
  const goPrev = useCallback(() => {
    onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  }, [currentIndex, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, goPrev, goNext, onOpenChange]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center focus:outline-none"
          onPointerDownOutside={() => onOpenChange(false)}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Закрыть"
          >
            <X className="size-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-4 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft className="size-8" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-4 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Следующее фото"
              >
                <ChevronRight className="size-8" />
              </button>
            </>
          )}

          <div className="relative mx-auto max-h-[90vh] max-w-[95vw] overflow-hidden">
            <Image
              src={images[currentIndex]}
              alt={`${alt} ${currentIndex + 1}`}
              width={1920}
              height={1080}
              className="max-h-[90vh] w-auto object-contain"
              sizes="95vw"
              priority
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onIndexChange(i)}
                  className={cn(
                    "size-2 rounded-full transition",
                    i === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Фото ${i + 1}`}
                />
              ))}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
