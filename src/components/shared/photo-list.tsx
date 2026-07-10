import Image from "next/image";
import { X } from "lucide-react";

export interface PhotoItem {
  id: number;
  url: string;
  filename: string;
  sizeKb: number;
}

interface PhotoListProps {
  photos: PhotoItem[];
  onRemove: (id: number) => void;
  onRemoveAll: () => void;
  onAddMore: () => void;
}

function fmtSize(kb: number): string {
  return kb >= 1000 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

function fmtTotal(photos: PhotoItem[]): string {
  const total = photos.reduce((s, p) => s + p.sizeKb, 0);
  return fmtSize(total);
}

export function PhotoList({
  photos,
  onRemove,
  onRemoveAll,
  onAddMore,
}: PhotoListProps) {
  const count = photos.length;

  return (
    <div className="overflow-hidden rounded-[8px] border-[0.5px] border-hs-neutral-100 bg-hs-neutral-0">
      {/* Header — "3 Photos · 4.1 MB" */}
      <div className="flex items-center justify-between border-b border-hs-neutral-100 px-4 py-3">
        <p className="font-sans text-sm font-semibold leading-5 tracking-[-0.14px] text-hs-neutral-800">
          {count} {count === 1 ? "Photo" : "Photos"} · {fmtTotal(photos)}
        </p>
        <button
          type="button"
          onClick={onRemoveAll}
          className="font-sans text-sm font-medium leading-5 tracking-[-0.14px] text-hs-neutral-500 active:opacity-60"
        >
          Remove all
        </button>
      </div>

      {/* Photo rows */}
      {photos.map((photo, idx) => (
        <div
          key={photo.id}
          className={`flex items-center gap-3 px-4 py-3 ${
            idx < photos.length - 1 ? "border-b border-hs-neutral-100" : ""
          }`}
        >
          {/* Thumbnail */}
          <div className="relative size-14 shrink-0 overflow-hidden rounded-[6px]">
            <Image
              src={photo.url}
              alt={photo.filename}
              fill
              sizes="56px"
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col gap-0.5 min-w-0">
            <p className="truncate font-sans text-sm font-medium leading-5 tracking-[-0.14px] text-hs-neutral-800">
              {photo.filename}
            </p>
            <p className="font-sans text-xs leading-4 text-hs-neutral-500">
              {fmtSize(photo.sizeKb)}
            </p>
          </div>

          {/* Remove */}
          <button
            type="button"
            aria-label={`Remove ${photo.filename}`}
            onClick={() => onRemove(photo.id)}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-hs-neutral-100 active:bg-hs-neutral-200"
          >
            <X className="size-4 text-hs-neutral-600" strokeWidth={2} />
          </button>
        </div>
      ))}

      {/* Add more row */}
      <button
        type="button"
        onClick={onAddMore}
        className="flex w-full items-center gap-3 border-t border-hs-neutral-100 px-4 py-3 text-left active:bg-hs-neutral-50"
      >
        <div className="flex size-14 shrink-0 items-center justify-center rounded-[6px] border-[1.5px] border-dashed border-hs-neutral-300 bg-hs-neutral-100">
          <span className="font-sans text-xl font-light text-hs-neutral-400">+</span>
        </div>
        <span className="font-sans text-sm font-medium leading-5 tracking-[-0.14px] text-hs-neutral-500">
          Add more photos
        </span>
      </button>
    </div>
  );
}
