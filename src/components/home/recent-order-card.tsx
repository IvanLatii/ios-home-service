interface RecentOrderCardProps {
  /** Day of month within the fixed July 2026 demo range, e.g. "17". */
  date: string;
  time: string;
  /** FIXES-2.md #5 — tapping the card resets the demo back to state 1. */
  onClick?: () => void;
}

// SCREEN-HOME2.md — картка стану 2 головної. Тільки дата й час залежать від
// вибору користувача, решта (номер, статус, послуга, сума) — константи макета.
export function RecentOrderCard({ date, time, onClick }: RecentOrderCardProps) {
  const day = Number(date);
  const formattedDate = day ? `${String(day).padStart(2, "0")}.07.2026` : "";

  return (
    <div className="w-full px-2 pb-6">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full flex-col gap-2.5 rounded-[10px] bg-hs-neutral-0 p-4 text-left"
      >
        {/* Top part */}
        <div className="flex flex-col gap-1.5 border-b border-hs-neutral-100 pb-3.5">
          <div className="flex items-center">
            <span className="min-w-0 flex-1 truncate font-sans text-base font-semibold leading-6 tracking-[-0.16px] text-hs-neutral-800">
              Order #830517
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate rounded-[4px] bg-hs-teal-300 px-2 py-1.5 text-center font-sans text-xs font-medium leading-3 text-hs-teal-1000">
                Accepted
              </span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-xs font-normal leading-3 text-hs-neutral-500">
              {formattedDate}
            </span>
            <span className="size-1 shrink-0 rounded-full bg-hs-neutral-100" />
            <span className="font-sans text-xs font-normal leading-3 text-hs-neutral-500">
              {time}
            </span>
          </div>
        </div>

        {/* Bottom part */}
        <div className="flex items-end gap-3">
          <span className="flex-1 font-sans text-base font-normal leading-6 tracking-[-0.16px] text-hs-neutral-500">
            Faucet repair
          </span>
          <span className="text-right font-sans text-base font-semibold leading-6 tracking-[-0.16px] text-hs-neutral-800">
            1,013.00 ₴
          </span>
        </div>
      </button>
    </div>
  );
}
