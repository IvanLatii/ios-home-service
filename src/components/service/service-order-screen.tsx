"use client";

import Link from "next/link";
import { ChevronLeft, Info, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  StatusBarCellularIcon,
  StatusBarWifiIcon,
  StatusBarBatteryIcon,
} from "@/components/icons/figma-icons";
import { DropdownField } from "@/components/shared/dropdown-field";
import { OptionSheet } from "@/components/shared/option-sheet";
import { PhotoPickerSheet, MOCK_PHOTOS } from "@/components/shared/photo-picker-sheet";
import { PhotoList } from "@/components/shared/photo-list";
import { KeyboardMock } from "@/components/search/keyboard-mock";
import { cn } from "@/lib/utils";

interface ServiceOrderScreenProps {
  optionLabel: string;
  serviceId: string;
  optionId: string;
  rawId: string;
}

const SHEETS = [
  {
    key: "problem",
    label: "Problem type",
    title: "Problem type",
    options: ["Repair", "Replacement", "Installation"],
  },
  {
    key: "faucetType",
    label: "Faucet type",
    title: "Faucet type",
    options: ["I don't know", "Water", "Gas", "Indigenous", "Maievsky"],
  },
  {
    key: "diameter",
    label: "Faucet diameter",
    title: "Faucet diameter",
    options: [
      "I don't know",
      '15 mm (1/2")',
      '25 mm (1")',
      '32 mm (1 1/4")',
      '40 mm (1 1/2")',
      '50 mm (2")',
    ],
  },
] as const;

type SheetKey = (typeof SHEETS)[number]["key"];

export function ServiceOrderScreen({
  optionLabel,
  optionId,
  rawId,
}: ServiceOrderScreenProps) {
  const [hasMaterials, setHasMaterials] = useState(false);
  const [comment, setComment] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [selections, setSelections] = useState<Record<SheetKey, string | null>>(
    { problem: null, faucetType: null, diameter: null },
  );
  const [openSheet, setOpenSheet] = useState<SheetKey | null>(null);

  const [addedPhotos, setAddedPhotos] = useState<number[]>([]);
  const [showPhotoSheet, setShowPhotoSheet] = useState(false);

  const textareaAnchorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* Scroll textarea into view when keyboard appears */
  useEffect(() => {
    if (keyboardVisible) {
      setTimeout(() => {
        textareaAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, [keyboardVisible]);

  function handleSelect(key: SheetKey, value: string) {
    setSelections((prev) => ({ ...prev, [key]: value }));
    setOpenSheet(null);
  }

  const dateHref = `/date/${rawId}?option=${optionId}`;

  return (
    <>
      <div className="flex min-h-dvh w-full justify-center bg-hs-neutral-800/10">
        <div className="relative flex h-dvh w-full max-w-[402px] flex-col bg-hs-neutral-50 animate-slide-in overflow-hidden">

          {/* ── Sticky header ──────────────────────────────────────── */}
          <div className="sticky top-0 z-30 flex shrink-0 flex-col bg-hs-neutral-50">
            <div className="flex h-[62px] w-full shrink-0 items-center justify-between px-6 pt-[21px] pb-[19px] text-hs-neutral-1000">
              <p
                className="text-[17px] leading-[22px] font-[590]"
                style={{
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
                  fontVariationSettings: '"wdth" 100',
                }}
              >
                17:05
              </p>
              <div className="flex items-center gap-[7px]">
                <StatusBarCellularIcon className="h-[12.226px] w-[19.2px]" />
                <StatusBarWifiIcon className="h-[12.328px] w-[17.142px]" />
                <StatusBarBatteryIcon className="h-[13px] w-[27.328px]" />
              </div>
            </div>
            <div className="flex items-center gap-2 px-6 pb-4">
              <Link
                href="/search"
                aria-label="Go back"
                className="flex size-10 shrink-0 items-center justify-center rounded-[6px] bg-hs-neutral-0"
              >
                <ChevronLeft className="size-4 text-hs-neutral-800" strokeWidth={2.5} />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-1 text-center">
                <p className="truncate font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-800">
                  {optionLabel} details
                </p>
                <p className="font-sans text-xs font-medium leading-3 tracking-[-0.12px] text-hs-neutral-400">
                  Step 1 of 4
                </p>
              </div>
              <Link
                href="/search"
                aria-label="Close"
                className="flex size-10 shrink-0 items-center justify-center rounded-[6px] bg-hs-neutral-0"
              >
                <X className="size-4 text-hs-neutral-800" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* ── Scrollable content ─────────────────────────────────── */}
          <div className="relative z-20 flex flex-1 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {/* Dropdowns */}
            <div className="flex flex-col gap-2 border-b border-hs-neutral-100 px-2 pb-0">
              {SHEETS.map((sheet) => (
                <DropdownField
                  key={sheet.key}
                  label={sheet.label}
                  value={selections[sheet.key]}
                  onClick={() => setOpenSheet(sheet.key)}
                />
              ))}
              <div className="px-4 pt-2 pb-4">
                <button type="button" className="flex items-center gap-1.5">
                  <Info className="size-5 shrink-0 text-hs-blue-500" strokeWidth={1.75} />
                  <span className="font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-blue-500">
                    Learn more about service
                  </span>
                </button>
              </div>
            </div>

            {/* I have materials */}
            <div className="flex items-center gap-2 border-b border-hs-neutral-100 p-6">
              <p className="flex-1 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
                I have materials
              </p>
              <TogglePill checked={hasMaterials} onChange={setHasMaterials} />
            </div>

            {/* Add photos */}
            <p className="px-6 pt-6 pb-4 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
              Add photos
            </p>
            <div className="px-2">
              {addedPhotos.length === 0 ? (
                <button
                  type="button"
                  onClick={() => setShowPhotoSheet(true)}
                  className="flex w-full items-center gap-3 rounded-[8px] border-[1.5px] border-dashed border-hs-neutral-300 bg-hs-neutral-100 p-4 text-left"
                >
                  <div className="flex shrink-0 items-center justify-center rounded-[6px] bg-hs-neutral-200 px-7 py-3">
                    <Upload className="size-4 text-hs-neutral-700" strokeWidth={1.75} />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-sans text-sm font-semibold leading-5 tracking-[-0.14px] text-hs-neutral-800">
                      Click to browse
                    </p>
                    <p className="truncate font-sans text-xs font-medium leading-3 tracking-[-0.12px] text-hs-neutral-500">
                      Up to 10 images, max 10 MB each.
                    </p>
                  </div>
                </button>
              ) : (
                <PhotoList
                  photos={addedPhotos.map((id) => {
                    const p = MOCK_PHOTOS.find((x) => x.id === id)!;
                    return { id: p.id, url: p.url, filename: p.filename, sizeKb: p.sizeKb };
                  })}
                  onRemove={(id) => setAddedPhotos((prev) => prev.filter((x) => x !== id))}
                  onRemoveAll={() => setAddedPhotos([])}
                  onAddMore={() => setShowPhotoSheet(true)}
                />
              )}
            </div>

            {/* Additional comments */}
            <p className="px-6 pt-6 pb-4 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
              Additional comments
            </p>
            <div className="border-b border-hs-neutral-100 px-2 pb-2">
              <div
                className={cn(
                  "relative h-[138px] overflow-hidden rounded-[8px] border-[0.5px] transition-colors duration-150",
                  keyboardVisible ? "border-hs-blue-500" : "border-hs-neutral-200",
                )}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[8px] bg-hs-neutral-100" />
                <textarea
                  ref={textareaRef}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onFocus={() => setKeyboardVisible(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.currentTarget.blur();
                      setKeyboardVisible(false);
                    }
                  }}
                  placeholder="Describe the issue in more detail"
                  className="relative h-full w-full resize-none bg-transparent p-4 font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-800 placeholder:text-hs-neutral-600 focus:outline-none"
                  style={{
                    boxShadow:
                      "inset 0px 2px 4px 0px rgba(26,21,16,0.08), inset 0px 1px 2px 0px rgba(26,21,16,0.05)",
                  }}
                />
              </div>
              {/* Scroll anchor */}
              <div ref={textareaAnchorRef} />
            </div>

            {/* Estimated cost — 1,500.00 ₴ */}
            <div className="flex items-center gap-2 p-6">
              <p className="flex-1 font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
                Estimated cost
              </p>
              <div className="flex items-start gap-1">
                <span className="font-alumni text-[36px] font-semibold leading-8 tracking-[-0.36px] text-hs-neutral-800">
                  1,500.00
                </span>
                <span className="font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-neutral-500">
                  ₴
                </span>
              </div>
            </div>

            {/* Add service / Continue — normal block after content (FIXES-3.md #1) */}
            <div className="flex items-center gap-2 px-6 pt-6 pb-4">
              <button
                type="button"
                className="flex h-14 flex-1 items-center justify-center rounded-[8px] border border-hs-blue-500 bg-hs-neutral-50 px-[18px] font-sans text-base font-medium leading-6 tracking-[-0.16px]"
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(165deg, var(--color-hs-blue-500) 0%, var(--color-hs-blue-800) 47.617%)",
                  }}
                >
                  Add service
                </span>
              </button>
              <Link
                href={dateHref}
                className="flex h-14 flex-1 items-center justify-center rounded-[8px] px-[18px] font-sans text-base font-medium leading-6 tracking-[-0.16px] text-hs-blue-50"
                style={{
                  backgroundImage:
                    "linear-gradient(170deg, var(--color-hs-blue-500) 0%, var(--color-hs-blue-800) 47.617%)",
                }}
              >
                Continue
              </Link>
            </div>
          </div>

          {/* ── Bottom: keyboard when focused, home indicator otherwise ─────── */}
          {keyboardVisible ? (
            <div className="relative z-10 shrink-0 animate-slide-up">
              <KeyboardMock
                onReturn={() => {
                  textareaRef.current?.blur();
                  setKeyboardVisible(false);
                }}
              />
            </div>
          ) : (
            <div className="relative z-10 flex h-[34px] w-full shrink-0 items-end justify-center pb-2">
              <div className="h-[5px] w-[134px] rounded-full bg-black/30" />
            </div>
          )}
        </div>
      </div>

      {/* Dropdown sheets — SHEET-OPTIONS.md */}
      {SHEETS.map((sheet) => (
        <OptionSheet
          key={sheet.key}
          title={sheet.title}
          options={sheet.options as unknown as string[]}
          selected={selections[sheet.key]}
          open={openSheet === sheet.key}
          onSelect={(value) => handleSelect(sheet.key, value)}
          onClose={() => setOpenSheet(null)}
        />
      ))}

      {/* Photo picker */}
      <PhotoPickerSheet
        open={showPhotoSheet}
        confirmedIds={addedPhotos}
        onConfirm={(ids) => { setAddedPhotos(ids); setShowPhotoSheet(false); }}
        onClose={() => setShowPhotoSheet(false)}
      />
    </>
  );
}

function TogglePill({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative flex h-6 w-14 shrink-0 cursor-pointer items-center rounded-[6px] transition-colors duration-200",
        checked ? "bg-hs-blue-500" : "bg-[rgba(85,60,84,0.2)]",
      )}
    >
      <span
        className={cn(
          "block h-5 w-8 rounded-[4px] bg-hs-neutral-0 transition-transform duration-200",
          checked ? "translate-x-[22px]" : "translate-x-[2px]",
        )}
      />
    </button>
  );
}
