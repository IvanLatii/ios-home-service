import { Mic, Smile } from "lucide-react";

import { cn } from "@/lib/utils";

const ROW_1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const ROW_2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const ROW_3 = ["z", "x", "c", "v", "b", "n", "m"];

interface KeyboardMockProps {
  /** Autocomplete suggestions shown above the keys, e.g. based on the active query. */
  suggestions?: [string, string, string];
  className?: string;
  /** FIXES-5.md #4 — when provided, the return key is interactive and dismisses the keyboard. */
  onReturn?: () => void;
}

/**
 * Decorative approximation of the native iOS keyboard (Figma "Keyboard/iOS").
 * Otherwise non-interactive — the real search input already accepts typed text; this
 * exists purely to match the visual structure of the Figma frame.
 * Solid block edge-to-edge — no rounded corners, so no background can show through.
 */
export function KeyboardMock({ suggestions, className, onReturn }: KeyboardMockProps) {
  return (
    <div
      aria-hidden={!onReturn}
      className={cn(
        "flex w-full shrink-0 flex-col items-center gap-2 rounded-t-[14px] bg-[#e6e9ed] pt-3 pb-[10px]",
        className,
      )}
    >
      {suggestions ? (
        <div className="flex h-[25px] w-full items-center gap-5 px-[22px] text-[17px] leading-[22px] text-[#333]">
          <span className="flex-1 truncate text-center">
            &ldquo;{suggestions[0]}&rdquo;
          </span>
          <span className="h-full w-px bg-[#ccc]/40" />
          <span className="flex-1 truncate text-center font-medium">
            {suggestions[1]}
          </span>
          <span className="h-full w-px bg-[#ccc]/40" />
          <span className="flex-1 truncate text-center">
            {suggestions[2]}
          </span>
        </div>
      ) : null}

      <div className="flex w-full flex-col items-center gap-[11px] px-[8.5px] pt-3">
        <div className="flex w-full items-center justify-center gap-1.5">
          {ROW_1.map((letter) => (
            <Key key={letter} letter={letter} />
          ))}
        </div>
        <div className="flex w-full items-center justify-center gap-1.5 px-5">
          {ROW_2.map((letter) => (
            <Key key={letter} letter={letter} />
          ))}
        </div>
        <div className="flex w-full items-center gap-1.5">
          <Key letter="⇧" flexBasis="w-[11%]" />
          {ROW_3.map((letter) => (
            <Key key={letter} letter={letter} />
          ))}
          <Key letter="⌫" flexBasis="w-[11%]" />
        </div>
        <div className="flex w-full items-center gap-1.5">
          <Key letter="123" flexBasis="w-[22%]" />
          <div className="h-[45px] flex-1 rounded-[8.5px] bg-white/30" />
          {onReturn ? (
            <button
              type="button"
              onClick={onReturn}
              className="flex h-[45px] w-[22%] items-center justify-center rounded-[8.5px] bg-hs-blue-500 text-sm font-medium text-white"
            >
              return
            </button>
          ) : (
            <div className="flex h-[45px] w-[22%] items-center justify-center rounded-[8.5px] bg-hs-blue-500 text-sm font-medium text-white">
              return
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-9 pt-3 pb-1">
        <Smile className="size-6 text-[#8e8e93]" strokeWidth={1.75} />
        <Mic className="size-6 text-[#8e8e93]" strokeWidth={1.75} />
      </div>
    </div>
  );
}

function Key({
  letter,
  flexBasis,
}: {
  letter: string;
  flexBasis?: string;
}) {
  return (
    <div
      className={`flex h-[45px] items-center justify-center rounded-[8.5px] bg-white/50 text-[19px] text-[#333] ${flexBasis ?? "flex-1"}`}
    >
      {letter}
    </div>
  );
}
