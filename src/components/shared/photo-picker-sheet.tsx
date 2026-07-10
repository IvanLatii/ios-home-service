"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

import { BottomSheet } from "./bottom-sheet";
import { cn } from "@/lib/utils";

export interface MockPhoto {
  id: number;
  url: string;
  filename: string;
  /** Size in KB */
  sizeKb: number;
}

/** 12 consistent mock photos (picsum by seed, home-interior feel). */
export const MOCK_PHOTOS: MockPhoto[] = [
  { id: 0,  url: "https://picsum.photos/seed/hs-photo-0/300/300",  filename: "IMG_0041.jpg", sizeKb: 1430 },
  { id: 1,  url: "https://picsum.photos/seed/hs-photo-1/300/300",  filename: "IMG_0042.jpg", sizeKb: 1280 },
  { id: 2,  url: "https://picsum.photos/seed/hs-photo-2/300/300",  filename: "IMG_0043.jpg", sizeKb: 1420 },
  { id: 3,  url: "https://picsum.photos/seed/hs-photo-3/300/300",  filename: "IMG_0044.jpg", sizeKb: 1190 },
  { id: 4,  url: "https://picsum.photos/seed/hs-photo-4/300/300",  filename: "IMG_0045.jpg", sizeKb: 1380 },
  { id: 5,  url: "https://picsum.photos/seed/hs-photo-5/300/300",  filename: "IMG_0046.jpg", sizeKb: 1240 },
  { id: 6,  url: "https://picsum.photos/seed/hs-photo-6/300/300",  filename: "IMG_0047.jpg", sizeKb: 1310 },
  { id: 7,  url: "https://picsum.photos/seed/hs-photo-7/300/300",  filename: "IMG_0048.jpg", sizeKb: 1470 },
  { id: 8,  url: "https://picsum.photos/seed/hs-photo-8/300/300",  filename: "IMG_0049.jpg", sizeKb: 1200 },
  { id: 9,  url: "https://picsum.photos/seed/hs-photo-9/300/300",  filename: "IMG_0050.jpg", sizeKb: 1350 },
  { id: 10, url: "https://picsum.photos/seed/hs-photo-10/300/300", filename: "IMG_0051.jpg", sizeKb: 1160 },
  { id: 11, url: "https://picsum.photos/seed/hs-photo-11/300/300", filename: "IMG_0052.jpg", sizeKb: 1290 },
];

interface PhotoPickerSheetProps {
  open: boolean;
  confirmedIds: number[];
  onConfirm: (ids: number[]) => void;
  onClose: () => void;
}

export function PhotoPickerSheet({
  open,
  confirmedIds,
  onConfirm,
  onClose,
}: PhotoPickerSheetProps) {
  const [staged, setStaged] = useState<number[]>(confirmedIds);

  useEffect(() => {
    if (open) setStaged(confirmedIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function toggle(id: number) {
    setStaged((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const count = staged.length;
  const label =
    count === 0
      ? "Select photos"
      : count === 1
        ? "Add 1 photo"
        : `Add ${count} photos`;

  return (
    <BottomSheet title="Add photos" open={open} onClose={onClose}>
      {/* 3-column photo grid — exactly 3 rows (12 photos) */}
      <div className="grid grid-cols-3 gap-[2px] px-2">
        {MOCK_PHOTOS.map((photo) => {
          const isSelected = staged.includes(photo.id);
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => toggle(photo.id)}
              className="relative aspect-square overflow-hidden rounded-[6px] focus:outline-none"
            >
              <Image
                src={photo.url}
                alt={photo.filename}
                fill
                sizes="120px"
                className="object-cover"
                unoptimized
              />
              {/* Selection overlay */}
              <div
                className={cn(
                  "absolute inset-0 rounded-[6px] transition-opacity duration-150",
                  isSelected ? "bg-hs-blue-500/30" : "bg-transparent",
                )}
              />
              {/* Checkmark badge */}
              <span
                className={cn(
                  "absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full border-[1.5px] transition-all duration-150",
                  isSelected
                    ? "border-hs-blue-500 bg-hs-blue-500"
                    : "border-hs-neutral-0 bg-hs-neutral-0/40",
                )}
              >
                {isSelected && (
                  <Check className="size-3 text-hs-neutral-0" strokeWidth={2.5} />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Action button */}
      <div className="px-2 pt-4">
        <button
          type="button"
          disabled={count === 0}
          onClick={() => onConfirm(staged)}
          className={cn(
            "flex h-14 w-full items-center justify-center rounded-[8px]",
            "font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-blue-50",
            "transition-opacity duration-200",
            count === 0 ? "opacity-40" : "opacity-100",
          )}
          style={{
            backgroundImage:
              "linear-gradient(170deg, var(--color-hs-blue-500) 0%, var(--color-hs-blue-800) 47.617%)",
          }}
        >
          {label}
        </button>
      </div>
    </BottomSheet>
  );
}
